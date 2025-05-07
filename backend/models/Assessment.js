const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  AssessmentID: String,
  AssessmentName: String,
  Category: String,
  TargetRole: String,
  Industry: String,
  UseCase: String,
  Duration: String,
  Competencies: String,
  Seniority: String // ✅ add this
}, {
  collection: 'SHL_Recommendation_Engine'
});

module.exports = mongoose.model('Assessment', assessmentSchema);
