const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Assessment = require('../models/Assessment');

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const assessments = [
  {
    AssessmentID: "SHL001",
    AssessmentName: "Verbal Reasoning",
    Category: "Cognitive",
    TargetRole: "Graduate",
    Industry: "All",
    UseCase: "Hiring",
    Duration: "20 mins",
    Competencies: "Verbal Comprehension|Logical Thinking",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL002",
    AssessmentName: "OPQ32 Personality Questionnaire",
    Category: "Personality",
    TargetRole: "All",
    Industry: "All",
    UseCase: "Hiring|Development",
    Duration: "45 mins",
    Competencies: "Team Fit|Leadership Potential|Work Style",
    Seniority: "Mid"
  },
  {
    AssessmentID: "SHL003",
    AssessmentName: "Numerical Ability",
    Category: "Cognitive",
    TargetRole: "Graduate|Analyst",
    Industry: "Finance",
    UseCase: "Hiring",
    Duration: "25 mins",
    Competencies: "Data Interpretation|Math Accuracy",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL004",
    AssessmentName: "Inductive Logic",
    Category: "Cognitive",
    TargetRole: "Engineer",
    Industry: "Tech",
    UseCase: "Hiring",
    Duration: "30 mins",
    Competencies: "Pattern Recognition|Abstract Reasoning",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL005",
    AssessmentName: "Situational Judgement",
    Category: "Behavioral",
    TargetRole: "Manager",
    Industry: "All",
    UseCase: "Hiring|Promotion",
    Duration: "35 mins",
    Competencies: "Decision Making|Conflict Management",
    Seniority: "Senior"
  },
  {
    AssessmentID: "SHL006",
    AssessmentName: "Motivation Questionnaire",
    Category: "Motivation",
    TargetRole: "All",
    Industry: "All",
    UseCase: "Development",
    Duration: "30 mins",
    Competencies: "Values|Work Drivers",
    Seniority: "Mid"
  },
  {
    AssessmentID: "SHL007",
    AssessmentName: "Technical Skills Assessment",
    Category: "Skills",
    TargetRole: "AI Engineer|Developer",
    Industry: "Tech",
    UseCase: "Hiring",
    Duration: "40 mins",
    Competencies: "Python|TensorFlow|ML Concepts",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL008",
    AssessmentName: "Leadership Potential",
    Category: "Personality",
    TargetRole: "Team Lead|Product Manager",
    Industry: "All",
    UseCase: "Promotion|Development",
    Duration: "50 mins",
    Competencies: "Leadership|Strategic Thinking",
    Seniority: "Senior"
  },
  {
    AssessmentID: "SHL009",
    AssessmentName: "Customer Service Simulation",
    Category: "Behavioral",
    TargetRole: "Support Agent",
    Industry: "Retail|Telecom",
    UseCase: "Hiring",
    Duration: "25 mins",
    Competencies: "Customer Focus|Empathy|Communication",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL010",
    AssessmentName: "Data Analysis Test",
    Category: "Cognitive",
    TargetRole: "Data Analyst|Data Scientist",
    Industry: "Finance|Tech",
    UseCase: "Hiring",
    Duration: "35 mins",
    Competencies: "Data Interpretation|Critical Thinking",
    Seniority: "Mid"
  },
  {
    AssessmentID: "SHL011",
    AssessmentName: "Verbal Reasoning",
    Category: "Cognitive",
    TargetRole: "Software Engineer",
    Industry: "All",
    UseCase: "Hiring",
    Duration: "20 mins",
    Competencies: "Verbal Comprehension|Logical Thinking",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL012",
    AssessmentName: "ML Engineering Test",
    Category: "Skills",
    TargetRole: "ML Engineer",
    Industry: "Tech|Healthcare",
    UseCase: "Hiring",
    Duration: "40 mins",
    Competencies: "Scikit-learn|Model Evaluation|Data Preprocessing",
    Seniority: "Mid"
  },
  {
    AssessmentID: "SHL013",
    AssessmentName: "UX Skills Evaluation",
    Category: "Skills",
    TargetRole: "UX Designer",
    Industry: "Design|E-commerce",
    UseCase: "Hiring",
    Duration: "30 mins",
    Competencies: "User Research|Prototyping|Usability Testing",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL014",
    AssessmentName: "DevOps Knowledge Check",
    Category: "Skills",
    TargetRole: "DevOps Engineer",
    Industry: "Tech|Cloud",
    UseCase: "Hiring",
    Duration: "35 mins",
    Competencies: "CI/CD|Containers|Monitoring Tools",
    Seniority: "Mid"
  },
  {
    AssessmentID: "SHL015",
    AssessmentName: "Project Management Scenario Test",
    Category: "Behavioral",
    TargetRole: "Project Manager",
    Industry: "IT|Construction",
    UseCase: "Hiring|Development",
    Duration: "45 mins",
    Competencies: "Planning|Risk Management|Agile",
    Seniority: "Senior"
  },
  {
    AssessmentID: "SHL016",
    AssessmentName: "Cloud Concepts Assessment",
    Category: "Cognitive",
    TargetRole: "Cloud Engineer",
    Industry: "Tech|Enterprise",
    UseCase: "Hiring",
    Duration: "30 mins",
    Competencies: "AWS|Azure|Networking Basics",
    Seniority: "Mid"
  },
  {
    AssessmentID: "SHL017",
    AssessmentName: "Product Design Skills",
    Category: "Skills",
    TargetRole: "Product Designer",
    Industry: "Design|Tech",
    UseCase: "Hiring",
    Duration: "40 mins",
    Competencies: "Ideation|Wireframing|Design Thinking",
    Seniority: "Entry"
  },
  {
    AssessmentID: "SHL018",
    AssessmentName: "Cybersecurity Fundamentals",
    Category: "Skills",
    TargetRole: "Cybersecurity Analyst",
    Industry: "Finance|Government",
    UseCase: "Hiring",
    Duration: "40 mins",
    Competencies: "Threat Detection|Incident Response|Network Security",
    Seniority: "Mid"
  },
  {
    AssessmentID: "SHL019",
    AssessmentName: "AI & Ethics Evaluation",
    Category: "Behavioral",
    TargetRole: "AI Researcher",
    Industry: "Academia|Tech",
    UseCase: "Development",
    Duration: "30 mins",
    Competencies: "Ethical Reasoning|Fairness|Bias Mitigation",
    Seniority: "Senior"
  },
  {
    AssessmentID: "SHL020",
    AssessmentName: "Full Stack Development",
    Category: "Skills",
    TargetRole: "Full Stack Developer",
    Industry: "Tech|Startup",
    UseCase: "Hiring",
    Duration: "45 mins",
    Competencies: "Frontend|Backend|Database Integration",
    Seniority: "Mid"
  }
];


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  try {
    await Assessment.deleteMany({});
    console.log('🧹 Old data cleared');

    await Assessment.insertMany(assessments);
    console.log('🌱 All data seeded successfully');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => console.error('❌ MongoDB connection error:', err));
