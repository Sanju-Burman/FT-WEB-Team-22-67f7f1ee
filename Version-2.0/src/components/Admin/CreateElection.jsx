import React, { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '../../services/firebase';
import Button from '../Common/Button';
import Alert from '../Common/Alert';

const CreateElection = () => {
  const [electionData, setElectionData] = useState({
    title: '',
    description: '',
    status: 'active' // default status
  });
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElectionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!electionData.title || !electionData.description) {
      setAlert({ type: 'danger', message: 'Please fill in all fields' });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Add timestamp
      const newElection = {
        ...electionData,
        createdAt: serverTimestamp()
      };
      
      // Push to Firebase
      const electionsRef = ref(database, 'elections');
      await push(electionsRef, newElection);
      
      // Reset form
      setElectionData({
        title: '',
        description: '',
        status: 'active'
      });
      
      setAlert({ type: 'success', message: 'Election created successfully!' });
    } catch (error) {
      console.error('Error creating election:', error);
      setAlert({ type: 'danger', message: 'Failed to create election. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-election slide-in">
      <h2>Create New Election</h2>
      
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Election Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={electionData.title}
            onChange={handleChange}
            placeholder="e.g., Gram Panchayat Head Election 2025"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={electionData.description}
            onChange={handleChange}
            placeholder="Provide details about this election..."
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={electionData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <Button 
          type="submit" 
          variant="success" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Election'}
        </Button>
      </form>
    </div>
  );
};

export default CreateElection;
