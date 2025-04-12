// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import VoterDashboard from './components/Voter/VoterDashboard';
import VotingPage from './components/Voter/VotingPage';
import ResultPage from './components/Results/ResultPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import './styles/global.css';
import './styles/admin.css';
import './styles/voter.css';
import './styles/results.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<VoterDashboard />} />
          <Route path="/elections" element={<VoterDashboard />} />
          <Route path="/election/:electionId" element={<VotingPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
