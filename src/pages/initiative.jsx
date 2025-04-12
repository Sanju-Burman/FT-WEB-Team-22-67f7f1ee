import React, { useState } from "react";
import "../styles/initiative.css";

const Initiative = () => {
  const [userLocation, setUserLocation] = useState("");
  const [sampleIssues, setSampleIssues] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const sampleIssuesPool = [
    {
      title: "Broken Street Light",
      description: "The street light on main road has been out for days.",
      category: "Electricity",
    },
    {
      title: "Open Manhole",
      description: "An uncovered manhole near the bus stop is dangerous.",
      category: "Sanitation",
    },
    {
      title: "Garbage Overflow",
      description: "Dustbins have not been emptied in a week.",
      category: "Sanitation",
    },
    {
      title: "Water Leakage",
      description: "A pipeline is leaking continuously in our colony.",
      category: "Water Supply",
    },
    {
      title: "Damaged Road",
      description: "Potholes are causing trouble for two-wheelers.",
      category: "Roads",
    },
    {
      title: "Park Maintenance",
      description: "Children's park needs cleaning and maintenance.",
      category: "Civic",
    },
    {
      title: "Illegal Parking",
      description: "Cars are blocking the main entrance of the apartment.",
      category: "Traffic",
    },
    {
      title: "Noise Pollution",
      description: "Construction work past midnight is disturbing residents.",
      category: "Environment",
    },
    {
      title: "Stray Dogs Menace",
      description: "Increasing number of stray dogs posing safety concerns.",
      category: "Animal Welfare",
    },
    {
      title: "Water Tanker Delay",
      description: "Regular water tankers are delayed or skipped.",
      category: "Water Supply",
    },
    {
      title: "Street Flooding",
      description: "Rainwater accumulation on roads causing jams.",
      category: "Drainage",
    },
    {
      title: "Bus Stop Shelter Broken",
      description: "The roof of the local bus stop shelter is damaged.",
      category: "Public Transport",
    },
    {
      title: "Broken Sidewalk",
      description: "Pedestrian sidewalk has cracked tiles and is unsafe.",
      category: "Roads",
    },
    {
      title: "Power Outages",
      description: "Frequent electricity cuts during peak hours.",
      category: "Electricity",
    },
    {
      title: "Lack of Street Bins",
      description: "Public places missing trash bins leading to littering.",
      category: "Sanitation",
    },
    {
      title: "Public Toilet Unclean",
      description: "Local public toilet has not been cleaned recently.",
      category: "Sanitation",
    },
    {
      title: "Overgrown Trees",
      description: "Branches of roadside trees are obstructing street lights.",
      category: "Environment",
    },
    {
      title: "Underpass Flooding",
      description: "Underpass near station gets flooded every rain.",
      category: "Drainage",
    },
  ];

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    const shuffled = [...sampleIssuesPool].sort(() => 0.5 - Math.random());
    const selected = shuffled
      .slice(0, 3 + Math.floor(Math.random() * 2))
      .map((issue, idx) => ({
        id: `sample-${idx}`,
        ...issue,
        location: userLocation,
      }));
    setSampleIssues(selected);
    setHasSearched(true);
  };

  return (
    <section className="initiatives-page">
      <h2>Community Initiatives</h2>

      <p>Enter your location to see local initiatives</p>

      <form className="location-form" onSubmit={handleLocationSubmit}>
        <input
          type="text"
          value={userLocation}
          onChange={(e) => setUserLocation(e.target.value)}
          placeholder="Enter your location"
          required
        />
        <button type="submit">Search</button>
      </form>

      {hasSearched && (
        <div className="issues-grid">
          {sampleIssues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <h3>{issue.title}</h3>
              <p>
                <strong>Location:</strong> {issue.location}
              </p>
              <p>
                <strong>Category:</strong> {issue.category}
              </p>
              <p>{issue.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Initiative;
