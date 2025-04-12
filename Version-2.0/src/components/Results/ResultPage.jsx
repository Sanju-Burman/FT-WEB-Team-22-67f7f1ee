import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import Card from '../Common/Card';
import Button from '../Common/Button';

const ResultPage = () => {
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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
          .filter(candidate => candidate.electionId === selectedElection)
          .sort((a, b) => (b.votes || 0) - (a.votes || 0)); // Sort by votes in descending order
        
        setCandidates(candidatesArray);
      } else {
        setCandidates([]);
      }
      setIsLoading(false);
    });
    
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [selectedElection]);

  const totalVotes = candidates.reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
  const winner = candidates.length > 0 && candidates[0].votes > 0 ? candidates[0] : null;

  return (
    <div className="container fade-in">
      <h1 className="mb-3">Election Results</h1>
      
      <div className="form-group">
        <label htmlFor="election">Select Election</label>
        <select
          id="election"
          value={selectedElection}
          onChange={(e) => setSelectedElection(e.target.value)}
          disabled={elections.length === 0 || isLoading}
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
      
      {isLoading ? (
        <p>Loading results...</p>
      ) : !selectedElection ? (
        <p>Please select an election to view results.</p>
      ) : (
        <div className="results-wrapper slide-in">
          {elections.find(e => e.id === selectedElection) && (
            <div className="election-info mb-3">
              <h2>{elections.find(e => e.id === selectedElection).title}</h2>
              <p>{elections.find(e => e.id === selectedElection).description}</p>
              <div className="status-badge status-wrapper mt-1">
                <span className={`status-badge status-${elections.find(e => e.id === selectedElection).status}`}>
                  {elections.find(e => e.id === selectedElection).status.charAt(0).toUpperCase() + 
                   elections.find(e => e.id === selectedElection).status.slice(1)}
                </span>
              </div>
            </div>
          )}
          
          {candidates.length === 0 ? (
            <Card>
              <p>No candidates found for this election.</p>
            </Card>
          ) : (
            <>
              {winner && (
                <Card className="winner-card mb-3">
                  <h3 className="text-center mb-1">🏆 Current Winner 🏆</h3>
                  <h2 className="text-center">{winner.name}</h2>
                  <p className="text-center mb-2">with {winner.votes} votes ({Math.round(winner.votes / totalVotes * 100)}%)</p>
                </Card>
              )}
              
              <div className="results-stats mb-3">
                <Card>
                  <h3>Stats</h3>
                  <p>Total Votes Cast: {totalVotes}</p>
                  <p>Total Candidates: {candidates.length}</p>
                </Card>
              </div>
              
              <h3 className="mb-2">Vote Distribution</h3>
              
              <div className="results-container">
                {candidates.map((candidate, index) => {
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
        </div>
      )}
    </div>
  );
};

export default ResultPage;