import React from 'react';
import ElectionList from './ElectionList';

const VoterDashboard = () => {
  return (
    <div className="container fade-in">
      <h1 className="mb-3">Elections</h1>
      <p className="mb-3">
        Welcome to the Gram Panchayat Voting System. Below are all the active elections. 
        Click on an election to view details and cast your vote.
      </p>
      <ElectionList />
    </div>
  );
};

export default VoterDashboard;
