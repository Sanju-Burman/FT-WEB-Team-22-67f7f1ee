import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import "../styles/initiative.css";

const Initiative = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
  });
  const [issues, setIssues] = useState([]);

  const issuesRef = ref(database, "ISSUES_NEIGHBOURGOV");
  useEffect(() => {
    const issuesRef = ref(database, "ISSUES_NEIGHBOURGOV");
    onValue(issuesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const issuesArray = Object.values(data).flatMap((issueGroup) =>
          Object.entries(issueGroup)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            // ✅ Filter only issues with a title and description
            .filter((issue) => issue.title && issue.description)
        );
        setIssues(issuesArray);
      } else {
        setIssues([]);
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    push(issuesRef, {
      ...formData,
      timestamp: Date.now(),
    });
    setFormData({ title: "", description: "", location: "", category: "" });
    setFormOpen(false);
  };

  return (
    <section className="initiatives-page">
      <h2>Community Initiatives</h2>
      <p>See what others are raising in your neighborhood!</p>

      <div className="issues-grid">
        {issues.length === 0 ? (
          <p>No issues posted yet.</p>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <h3>{issue.title}</h3>
              <p>
                <strong>Location:</strong> {issue.location}
              </p>
              <p>
                <strong>Category:</strong> {issue.category}
              </p>
              <p>{issue.description}</p>
              <p className="timestamp">
                {issue.timestamp
                  ? new Date(issue.timestamp).toLocaleString()
                  : "Date not available"}
              </p>
            </div>
          ))
        )}
      </div>

      <button className="add-issue-btn" onClick={() => setFormOpen(true)}>
        Add Your Issue
      </button>

      {formOpen && (
        <div className="issue-form-overlay">
          <form className="issue-form" onSubmit={handleSubmit}>
            <h3>Report a New Issue</h3>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Issue Title"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue"
              rows="4"
              required
            ></textarea>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category (e.g. Roads, Water)"
            />
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setFormOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Initiative;
