import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, update, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import Card from '../Common/Card';
import Button from '../Common/Button';
import Alert from '../Common/Alert';
import useLocalStorage from '../../hooks/useLocalStorage';

const VotingPage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [votedElections, setVotedElections] = useLocalStorage('votedElections', []);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const hasVoted = votedElections.includes(electionId);

  // Fetch election details
  useEffect(() => {
    const fetchElection = async () => {
      try {
        const electionRef = ref(database, `elections/${electionId}`);
        const snapshot = await get(electionRef);
        
        if (snapshot.exists()) {
          setElection({
            id: electionId,
            ...snapshot.val()
          });
        } else {
          setAlert({ type: 'danger', message: 'Election not found.' });
          setTimeout(() => navigate('/elections'), 3000);
        }
      } catch (error) {
        console.error('Error fetching election:', error);
        setAlert({ type: 'danger', message: 'Failed to load election data.' });
      }
    };
    
    fetchElection();
  }, [electionId, navigate]);

  // Fetch candidates for this election
  useEffect(() => {
    if (!electionId) return;
    
    const candidatesRef = ref(database, 'candidates');
    
    const unsubscribe = onValue(candidatesRef, (snapshot) => {
      if (snapshot.exists()) {
        const candidatesData = snapshot.val();
        const candidatesArray = Object.keys(candidatesData)
          .map(key => ({
            id: key,
            ...candidatesData[key]
          }))
          .filter(candidate => candidate.electionId === electionId);
        
        setCandidates(candidatesArray);
      } else {
        setCandidates([]);
      }
      setIsLoading(false);
    });
    
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [electionId]);

  const handleVote = async () => {
    if (!selectedCandidate) {
      setAlert({ type: 'warning', message: 'Please select a candidate.' });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Update the candidate's votes
      const candidateRef = ref(database, `candidates/${selectedCandidate}`);
      const snapshot = await get(candidateRef);
      
      if (snapshot.exists()) {
        const candidate = snapshot.val();
        const currentVotes = candidate.votes || 0;
        
        await update(candidateRef, {
          votes: currentVotes + 1
        });
        
        // Mark as voted in localStorage
        setVotedElections([...votedElections, electionId]);
        
        setAlert({ type: 'success', message: 'Your vote has been successfully recorded!' });
        
        // Reset selected candidate
        setSelectedCandidate(null);
      } else {
        setAlert({ type: 'danger', message: 'Selected candidate not found.' });
      }
    } catch (error) {
      console.error('Error casting vote:', error);
      setAlert({ type: 'danger', message: 'Failed to cast your vote. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <p>Loading election details...</p>
      </div>
    );
  }

  if (!election) {
    return (
      <div className="container">
        <Alert type="danger" message="Election not found." />
        <Button onClick={() => navigate('/elections')}>Go Back to Elections</Button>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <Button 
        variant="secondary" 
        onClick={() => navigate('/elections')}
        className="mb-3"
      >
        ← Back to Elections
      </Button>
      
      <h1 className="mb-2">{election.title}</h1>
      <p className="mb-3">{election.description}</p>
      
      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}
      
      {election.status === 'upcoming' ? (
        <Card>
          <p>This election is upcoming and not yet open for voting.</p>
        </Card>
      ) : election.status === 'completed' || hasVoted ? (
        // Show results if election is completed or user has already voted
        <div className="results-section slide-in">
          <h2 className="mb-2">Election Results</h2>
          
          {candidates.length === 0 ? (
            <p>No candidates found for this election.</p>
          ) : (
            <ResultsDisplay candidates={candidates} />
          )}
        </div>
      ) : (
        // Show voting interface if election is active and user hasn't voted
        <div className="voting-section slide-in">
          <h2 className="mb-2">Cast Your Vote</h2>
          
          {candidates.length === 0 ? (
            <p>No candidates found for this election.</p>
          ) : (
            <>
              <p className="mb-2">Select a candidate and click "Submit Vote". You can only vote once per election.</p>
              
              <div className="candidates-list grid grid-cols-2">
                {candidates.map(candidate => (
                  <Card 
                    key={candidate.id} 
                    className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
                    onClick={() => setSelectedCandidate(candidate.id)}
                  >
                    <div className="radio-wrapper">
                      <input 
                        type="radio" 
                        name="candidate" 
                        id={candidate.id}
                        checked={selectedCandidate === candidate.id}
                        onChange={() => setSelectedCandidate(candidate.id)}
                      />
                      <label htmlFor={candidate.id}>
                        <h3>{candidate.name}</h3>
                        {candidate.bio && <p className="mb-2">{candidate.bio}</p>}
                      </label>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="vote-action mt-3">
                <Button 
                  variant="success"
                  onClick={handleVote}
                  disabled={!selectedCandidate || isSubmitting}
                  className="vote-button"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Helper component for displaying results
const ResultsDisplay = ({ candidates }) => {
  const sortedCandidates = [...candidates].sort((a, b) => (b.votes || 0) - (a.votes || 0));
  const totalVotes = sortedCandidates.reduce((sum, candidate) => sum + (candidate.votes || 0), 0);
  
  return (
    <div className="results-container">
      <p className="mb-2">Total Votes: {totalVotes}</p>
      
      {sortedCandidates.map((candidate, index) => {
        const votePercentage = totalVotes ? Math.round((candidate.votes || 0) / totalVotes * 100) : 0;
        
        return (
          <Card 
            key={candidate.id} 
            className={`candidate-result ${index === 0 && candidate.votes > 0 ? 'winner' : ''}`}
          >
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
  );
};

export default VotingPage;