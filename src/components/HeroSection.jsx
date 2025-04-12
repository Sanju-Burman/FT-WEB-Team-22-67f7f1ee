import React from "react";
import "../styles/hero.css"; // Add this CSS file for styling

const Hero = () => {
  return (
    <div
      id="hero-container"
      className="hero-container"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent", // Ensures no background color
      }}
    >
      <div
        id="hero-content"
        className="hero-content"
        style={{
          textAlign: "center",
          backgroundColor: "transparent", // Ensures no background color here as well
        }}
      >
        <h1
          style={{
            color: "#ffffff", // Set a fixed text color (white) for all themes
            background: "transparent", // No background color for the <b> element
            fontSize: "3rem",
          }}
        >
          <b>Revolutionizing Local Governance</b>
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginTop: "1rem",
            background: "transparent",
            color: "#ffffff", // Set a fixed text color (white) for all themes
          }}
        >
          Bringing People & Policies Together
        </p>
      </div>
    </div>
  );
};

export default Hero;
