import React, { useState, useEffect } from 'react';
import { ref, push, get, update, remove, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import Button from '../Common/Button';
import Card from '../Common/Card';
import Alert from '../Common/Alert';

const ManageCandidates = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    bio: ''
  });
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch elections on component mount
  useEffect(() => {
    const electionsRef = ref(database, 'elections');
    
    const unsubscribe = onValue(electionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const electionsData = snapshot.val();
        const electionsArray = Object.keys(electionsData).map(key => ({
          id: key,
          ...electionsData[key]
        }));
        
        setElections(electionsArray);
        
        // Select the first election by default if none is selected
        if (electionsArray.length > 0 && !selectedElection) {
          setSelectedElection(electionsArray[0].id);
        }
      } else {
        setElections([]);
      }
    });
    
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Fetch candidates when selected election changes
  useEffect(() => {
    if (!selectedElection) return;
    
    setIsLoading(true);
    const candidatesRef = ref(database, 'candidates');
    
    const unsubscribe = onValue(candidatesRef, (snapshot) => {
      if (snapshot.exists()) {
        const candidatesData = snapshot.val();
        const candidatesArray = Object.keys(candidatesData)
          .map(key => ({
            id: key,
            ...candidatesData[key]
          }))
          .filter(candidate => candidate.electionId === selectedElection);
        
        setCandidates(candidatesArray);
      } else {
        setCandidates([]);
      }
      setIsLoading(false);
    });
    
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [selectedElection]);

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    
    if (!newCandidate.name) {
      setAlert({ type: 'danger', message: 'Please enter a candidate name' });
      return;
    }
    
    try {
      const candidateData = {
        ...newCandidate,
        electionId: selectedElection,
        votes: 0
      };
      
      const candidatesRef = ref(database, 'candidates');
      await push(candidatesRef, candidateData);
      
      setNewCandidate({ name: '', bio: '' });
      setAlert({ type: 'success', message: 'Candidate added successfully!' });
    } catch (error) {
      console.error('Error adding candidate:', error);
      setAlert({ type: 'danger', message: 'Failed to add candidate. Please try again.' });
    }
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);
    setNewCandidate({
      name: candidate.name,
      bio: candidate.bio || ''
    });
  };

  const handleUpdateCandidate = async () => {
    if (!newCandidate.name) {
      setAlert({ type: 'danger', message: 'Please enter a candidate name' });
      return;
    }
    
    try {
      const candidateRef = ref(database, `candidates/${editingCandidate.id}`);
      await update(candidateRef, {
        name: newCandidate.name,
        bio: newCandidate.bio
      });
      
      setNewCandidate({ name: '', bio: '' });
      setEditingCandidate(null);
      setAlert({ type: 'success', message: 'Candidate updated successfully!' });
    } catch (error) {
      console.error('Error updating candidate:', error);
      setAlert({ type: 'danger', message: 'Failed to update candidate. Please try again.' });
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) {
      return;
    }
    
    try {
      const candidateRef = ref(database, `candidates/${candidateId}`);
      await remove(candidateRef);
      
      setAlert({ type: 'success', message: 'Candidate deleted successfully!' });
    } catch (error) {
      console.error('Error deleting candidate:', error);
      setAlert({ type: 'danger', message: 'Failed to delete candidate. Please try again.' });
    }
  };

  return (
    <div className="manage-candidates slide-in">
      <h2>Manage Candidates</h2>
      
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      
      <div className="form-group">
        <label htmlFor="election">Select Election</label>
        <select
          id="election"
          value={selectedElection}
          onChange={(e) => setSelectedElection(e.target.value)}
          disabled={elections.length === 0}
        >
          {elections.length === 0 ? (
            <option value="">No elections available</option>
          ) : (
            elections.map(election => (
              <option key={election.id} value={election.id}>
                {election.title}
              </option>
            ))
          )}
        </select>
      </div>
      
      {selectedElection && (
        <>
          <h3 className="mt-3 mb-2">
            {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
          </h3>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (editingCandidate) {
              handleUpdateCandidate();
            } else {
              handleAddCandidate(e);
            }
          }}>
            <div className="form-group">
              <label htmlFor="name">Candidate Name</label>
              <input
                type="text"
                id="name"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter candidate name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">Bio/Description (Optional)</label>
              <textarea
                id="bio"
                value={newCandidate.bio}
                onChange={(e) => setNewCandidate(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Enter candidate bio or description"
                rows="3"
              ></textarea>
            </div>
            
            <div className="flex">
              <Button 
                type="submit" 
                variant={editingCandidate ? 'primary' : 'success'}
              >
                {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
              </Button>
              
              {editingCandidate && (
                <Button 
                  type="button" 
                  variant="danger"
                  className="ml-2"
                  onClick={() => {
                    setEditingCandidate(null);
                    setNewCandidate({ name: '', bio: '' });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
          
          <h3 className="mt-3 mb-2">Candidates List</h3>
          
          {isLoading ? (
            <p>Loading candidates...</p>
          ) : candidates.length === 0 ? (
            <p>No candidates found for this election.</p>
          ) : (
            <div className="candidates-list grid grid-cols-2">
              {candidates.map(candidate => (
                <Card key={candidate.id} className="candidate-card">
                  <h4>{candidate.name}</h4>
                  {candidate.bio && <p className="mb-2">{candidate.bio}</p>}
                  <div className="flex mt-2">
                    <Button 
                      variant="primary"
                      onClick={() => handleEditCandidate(candidate)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageCandidates;