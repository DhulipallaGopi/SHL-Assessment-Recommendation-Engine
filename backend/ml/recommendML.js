const Assessment = require('../models/Assessment');
const natural = require('natural');
const cosineSimilarity = require('compute-cosine-similarity');
const { TfIdf } = natural;

function clean(text) {
  return text?.toLowerCase().replace(/\|/g, ' ') || '';
}

function getSimilarRole(jobRole, allRoles, threshold = 0.85) {
  let bestMatch = null;
  let bestScore = 0;

  for (let role of allRoles) {
    const score = natural.JaroWinklerDistance(jobRole.toLowerCase(), role.toLowerCase());
    if (score > bestScore) {
      bestScore = score;
      bestMatch = role;
    }
  }

  return bestScore >= threshold ? bestMatch : null;
}

async function getRecommendations({ jobRole, industry, seniority }) {
  const all = await Assessment.find({});

  // Extract all unique roles
  const roleSet = new Set();
  all.forEach(a => {
    const roles = a.TargetRole.split('|').map(r => r.trim());
    roles.forEach(r => roleSet.add(r));
  });

  const allRoles = Array.from(roleSet);

  // Try to match or find similar role
  const exactMatch = allRoles.find(r => r.toLowerCase() === jobRole.toLowerCase());
  const finalRole = exactMatch || getSimilarRole(jobRole, allRoles);

  if (!finalRole) {
    return { error: 'Your role is not found' };
  }

  const tfidf = new TfIdf();
  const docs = all.map((a, index) => {
    const cleanedText = clean(`${a.TargetRole} ${a.Industry} ${a.Competencies} ${a.UseCase} ${a.Seniority}`);
    return cleanedText;
  });

  docs.forEach(doc => tfidf.addDocument(doc));

  const input = clean(`${finalRole} ${industry} ${seniority}`);

  const inputVector = [];
  tfidf.tfidfs(input, (_, measure) => inputVector.push(measure));

  const results = docs.map((_, i) => {
    const docVector = tfidf.listTerms(i).map(term => term.tfidf);
    const len = Math.max(docVector.length, inputVector.length);
    const paddedDoc = [...docVector, ...Array(len - docVector.length).fill(0)];
    const paddedInput = [...inputVector, ...Array(len - inputVector.length).fill(0)];
    const score = cosineSimilarity(paddedDoc, paddedInput) || 0;

    return {
      assessment: all[i],
      score: score
    };
  });

  // Sort by highest score, then take the top 2 or 3
  const topResults = results
    .sort((a, b) => b.score - a.score)  // Highest score first
    .filter(r => r.score > 0)          // Only include non-zero scores
    .slice(0, 3)                       // Limit to top 3
    .map(r => r.assessment);

  if (topResults.length === 0) {
    return { message: 'No relevant recommendations found', assessments: all };
  }

  // Best match (highest score) should be the first one
  const bestMatch = topResults[0];

  return {
    bestMatch: bestMatch, // Top recommendation with the highest score
    recommendations: topResults.slice(1), // Remaining top recommendations (top 2 or 3)
  };
}

module.exports = getRecommendations;
