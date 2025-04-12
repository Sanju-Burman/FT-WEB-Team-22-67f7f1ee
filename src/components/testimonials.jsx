import React, { useEffect, useState } from "react";
import "../styles/testimonials.css"; // Ensure this path is correct

const testimonials = [
  {
    name: "Rohit Verma",
    location: "Delhi",
    feedback:
      "Finally a place where my feedback is actually counted. Love the idea!",
  },
  {
    name: "Neha Gupta",
    location: "Mumbai",
    feedback:
      "Sleek design, powerful features — NeighbourGov just makes sense.",
  },
  {
    name: "Ananya Rao",
    location: "Bangalore",
    feedback:
      "I used to miss updates — now I feel involved in the change. So empowering!",
  },
  {
    name: "Rakesh Sharma",
    location: "Lucknow",
    feedback:
      "This platform gave me a voice in local decisions I never had before.",
  },
  {
    name: "Meera Joshi",
    location: "Jaipur",
    feedback:
      "Easy to use, informative, and actually useful. Hats off to the team!",
  },
  {
    name: "Amit Patel",
    location: "Ahmedabad",
    feedback:
      "NeighbourGov bridges the gap between citizens and authorities beautifully.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const visibleCards = 3;
  const total = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  const getVisibleTestimonials = () => {
    const extended = [...testimonials, ...testimonials, ...testimonials];
    return extended.slice(index, index + visibleCards);
  };

  const scrollLeft = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const scrollRight = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="testimonials">
      <h2>What Citizens Are Saying</h2>
      <p>Real voices from real neighborhoods</p>

      <div className="testimonial-container">
        <button className="slider-button slider-left" onClick={scrollLeft}>
          ❮
        </button>

        <div className="testimonial-slider">
          {getVisibleTestimonials().map((t, i) => (
            <div key={i} className="testimonial-card">
              <p>"{t.feedback}"</p>
              <h4>{t.name}</h4>
              <p className="testimonial-location">{t.location}</p>
            </div>
          ))}
        </div>

        <button className="slider-button slider-right" onClick={scrollRight}>
          ❯
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
