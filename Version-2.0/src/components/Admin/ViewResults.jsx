import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import Card from '../Common/Card';

const ViewResults = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState('');
  const [results, setResults] = useState([]);
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

  // Fetch candidates and their votes when selected election changes
  // Continuing src/components/Admin/ViewResults.jsx
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
          .filter(candidate => candidate.electionId === selectedElection)
          .sort((a, b) => (b.votes || 0) - (a.votes || 0)); // Sort by votes in descending order
        
        setResults(candidatesArray);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    });
    
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [selectedElection]);
  
  const totalVotes = results.reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
  
  return (
    <div className="view-results slide-in">
      <h2>Election Results</h2>
      
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
          <h3 className="mt-3 mb-2">Results</h3>
          
          {isLoading ? (
            <p>Loading results...</p>
          ) : results.length === 0 ? (
            <p>No candidates found for this election.</p>
          ) : (
            <>
              <p className="mb-2">Total Votes: {totalVotes}</p>
              <div className="results-container">
                {results.map((candidate, index) => {
                  const votePercentage = totalVotes ? Math.round((candidate.votes || 0) / totalVotes * 100) : 0;
                  
                  return (
                    <Card key={candidate.id} className={`candidate-result ${index === 0 && candidate.votes > 0 ? 'winner' : ''}`}>
                      <div className="flex justify-between align-center mb-1">
                        <h4>{candidate.name} {index === 0 && candidate.votes > 0 && '🏆'}</h4>
                        <span className="vote-count">{candidate.votes || 0} votes ({votePercentage}%)</span>
                      </div>
                      
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${votePercentage}%` }}
                        ></div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
  };
  
  export default ViewResults;