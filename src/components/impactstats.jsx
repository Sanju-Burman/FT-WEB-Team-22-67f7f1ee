import React, { useEffect, useState } from "react";
import "../styles/impactstats.css";

const stats = [
  { label: "Active Users", value: 15432 },
  { label: "Votes Cast", value: 34250 },
  { label: "Feedback Entries", value: 8743 },
  { label: "Initiatives Launched", value: 120 },
];

const StatCard = ({ label, value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const incrementTime = 30;
    const step = Math.ceil(end / (duration / incrementTime));

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="stat-card">
      <h3>{count.toLocaleString()}</h3>
      <p>{label}</p>
    </div>
  );
};

const ImpactStats = () => {
  return (
    <section className="impact-section">
      <h2>Our Collective Impact</h2>
      <p>See how your participation shapes your neighborhood</p>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} />
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
