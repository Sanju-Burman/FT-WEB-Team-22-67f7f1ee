import React, { useState } from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import CreateElection from './CreateElection';
import ManageCandidates from './ManageCandidates';
import ViewResults from './ViewResults';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="container fade-in">
      <h1 className="mb-3">Admin Dashboard</h1>
      
      <div className="admin-tabs mb-3">
        <Button 
          variant={activeTab === 'create' ? 'primary' : 'secondary'} 
          onClick={() => setActiveTab('create')}
          className="mr-2"
        >
          Create Election
        </Button>
        <Button 
          variant={activeTab === 'manage' ? 'primary' : 'secondary'} 
          onClick={() => setActiveTab('manage')}
          className="mr-2"
        >
          Manage Candidates
        </Button>
        <Button 
          variant={activeTab === 'results' ? 'primary' : 'secondary'} 
          onClick={() => setActiveTab('results')}
        >
          View Results
        </Button>
      </div>
      
      <Card>
        {activeTab === 'create' && <CreateElection />}
        {activeTab === 'manage' && <ManageCandidates />}
        {activeTab === 'results' && <ViewResults />}
      </Card>
    </div>
  );
};

export default AdminDashboard;
