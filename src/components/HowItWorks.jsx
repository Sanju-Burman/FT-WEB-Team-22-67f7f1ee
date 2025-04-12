import "../styles/howItWorks.css";
import {
  FaMapMarkerAlt,
  FaInbox,
  FaVoteYea,
  FaChartLine,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2 className="section-title">How It Works</h2>
      <p className="section-subtitle">
        Your path to smarter civic participation
      </p>

      <div className="steps-container">
        <div className="step-card">
          <FaMapMarkerAlt className="step-icon" />
          <h3>1. Enter Your Location</h3>
          <p>Get updates specific to your area and local government.</p>
        </div>
        <div className="step-card">
          <FaInbox className="step-icon" />
          <h3>2. Real-Time Updates</h3>
          <p>Receive alerts on policies, initiatives, and community events.</p>
        </div>
        <div className="step-card">
          <FaVoteYea className="step-icon" />
          <h3>3. Vote & Feedback</h3>
          <p>Participate in polls and share suggestions that matter.</p>
        </div>
        <div className="step-card">
          <FaChartLine className="step-icon" />
          <h3>4. Track Your Impact</h3>
          <p>See how your voice influences your community’s growth.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
