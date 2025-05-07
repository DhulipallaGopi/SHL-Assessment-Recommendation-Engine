import React, { useState } from 'react';
import './App.css';
import logo from "./assets/Shllogo.png";

function App() {
  const [jobRole, setJobRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [seniority, setSeniority] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobRole, industry, seniority }),
      });

      const data = await res.json();
      console.log('Response from Backend:', data);

      if (!res.ok || !Array.isArray(data.recommendations)) {
        setError(data.error || 'Invalid response from server');
        setRecommendations([]);
      } else {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Fetch Error:', err);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const bubbles = Array.from({ length: 10 });

  return (
    <div>
      <div className="scrolling-text">
        <span>Welcome to the SHL Recommendation Engine</span>
      </div>
      <div className="App">
        <div className="bubbles-container">
          {bubbles.map((_, i) => (
            <div
              key={i}
              className="circle-container"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 10}s`,
                width: `${60 + Math.random() * 40}px`,
                height: `${60 + Math.random() * 40}px`
              }}
            >
              <span className="circle-text">SHL.</span>
            </div>
          ))}
        </div>

        <div>
          <img src={logo} alt="SHL Logo" className="top-left-logo" />
          <h1>SHL Assessment Recommendation</h1>

          <form className="recommendation-form" onSubmit={handleSubmit}>
            <label htmlFor="jobRole">Job Role</label>
            <input
              id="jobRole"
              className="form-input"
              type="text"
              placeholder="Job Role"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              required
            />

            <label htmlFor="industry">Industry</label>
            <input
              id="industry"
              className="form-input"
              type="text"
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
            />

            <label htmlFor="seniority">Seniority</label>
            <select
              id="seniority"
              className="form-select"
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              required
            >
              <option value="">Select Seniority</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>

            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Get Recommendations'}
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}

          {Array.isArray(recommendations) && recommendations.length > 0 && (
            <div className="results">
            <h2>Assessment Recommendations</h2>
            {recommendations.length > 0 ? (
              <ul>
                {recommendations.map((rec, index) => (
                  <li key={index}>
                    <p><strong>Assessment Name:</strong> {rec.AssessmentName}</p>
                    <p><strong>Category:</strong> {rec.Category}</p>
                    <p><strong>Industry:</strong> {rec.Industry}</p>
                    <p><strong>Target Role:</strong> {rec.TargetRole}</p>
                    <p><strong>Duration:</strong> {rec.Duration}</p>
                    <p><strong>Competencies:</strong> {rec.Competencies}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
