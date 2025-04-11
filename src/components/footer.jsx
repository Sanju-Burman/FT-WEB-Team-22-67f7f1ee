import React from "react";
import "../styles/footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Quick Links</h4>
        <a href="/">Home</a>
        <a href="/vote">Vote</a>
        <a href="/feedback">Feedback</a>
        <a href="/initiatives">Initiatives</a>
      </div>

      <div className="footer-logo">
        <img src="/Logo.png" alt="NeighbourGov Logo" height="60" />
        <p className="tagline">Empowering communities, one voice at a time.</p>
        <div className="footer-socials">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="footer-section right">
        <h4>About Us</h4>
        <p>
          NeighbourGov is a civic-tech platform enabling real-time updates,
          public participation, and community engagement.
        </p>
        <p>
          © 2025 NeighbourGov
          <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
