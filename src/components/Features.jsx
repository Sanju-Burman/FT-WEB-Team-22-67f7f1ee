import "../styles/features.css";
import { FaBell, FaVoteYea, FaBalanceScale, FaComments } from "react-icons/fa";

const FeatureOverview = () => {
  return (
    <section className="features">
      <div className="feature-header">
        <h2>Empowering Citizens with Smart Governance</h2>
        <p>
          Explore the features that make NeighbourGov a people-first civic
          platform.
        </p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <FaBell className="feature-icon" />
          <h3>Real-Time Notifications</h3>
          <p>
            Stay updated with instant alerts about government decisions and
            events in your area.
          </p>
        </div>
        <div className="feature-card">
          <FaVoteYea className="feature-icon" />
          <h3>Transparent Voting</h3>
          <p>
            Vote on local issues and see what your community supports — all in
            one place.
          </p>
        </div>
        <div className="feature-card">
          <FaBalanceScale className="feature-icon" />
          <h3>Local Legislation</h3>
          <p>
            Read, understand, and track the rules that affect your daily life
            directly from your municipality.
          </p>
        </div>
        <div className="feature-card">
          <FaComments className="feature-icon" />
          <h3>Feedback & Community Voice</h3>
          <p>
            Give feedback and suggest new initiatives to help shape a better
            community together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureOverview;
