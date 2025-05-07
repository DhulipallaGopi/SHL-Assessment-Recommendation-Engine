const express = require('express');
const router = express.Router();
const getRecommendations = require('../ml/recommendML');

router.post('/', async (req, res) => {
  try {
    const { jobRole, industry, seniority } = req.body;

    if (!jobRole || !industry || !seniority) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const recommendations = await getRecommendations({ jobRole, industry, seniority });

    if (Array.isArray(recommendations)) {
      return res.json({ recommendations });
    } else if (recommendations.error) {
      return res.status(404).json({ error: recommendations.error });
    } else {
      return res.status(200).json(recommendations); // handles { message, assessments } structure
    }

  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
