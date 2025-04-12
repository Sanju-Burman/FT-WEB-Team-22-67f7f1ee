import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../services/firebase';
import Card from '../Common/Card';
import Button from '../Common/Button';
import useLocalStorage from '../../hooks/useLocalStorage';

const ElectionList = ({ filter }) => {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votedElections] = useLocalStorage('votedElections', []);
  const [activeFilter, setActiveFilter] = useState(filter || 'all');

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
      } else {
        setElections([]);
      }
      setIsLoading(false);
    });
    
    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const filteredElections = elections.filter(election => {
    if (activeFilter === 'all') return true;
    return election.status === activeFilter;
  });

  if (isLoading) {
    return <p>Loading elections...</p>;
  }

  if (filteredElections.length === 0) {
    return (
      <Card>
        <p>No elections found. {activeFilter !== 'all' && 'Try changing the filter.'}</p>
      </Card>
    );
  }

  return (
    <div className="election-list slide-in">
      <div className="filter-buttons mb-3">
        <Button 
          variant={activeFilter === 'all' ? 'primary' : 'secondary'} 
          onClick={() => setActiveFilter('all')}
          className="mr-2"
        >
          All
        </Button>
        <Button 
          variant={activeFilter === 'active' ? 'primary' : 'secondary'} 
          onClick={() => setActiveFilter('active')}
          className="mr-2"
        >
          Active
        </Button>
        <Button 
          variant={activeFilter === 'upcoming' ? 'primary' : 'secondary'} 
          onClick={() => setActiveFilter('upcoming')}
          className="mr-2"
        >
          Upcoming
        </Button>
        <Button 
          variant={activeFilter === 'completed' ? 'primary' : 'secondary'} 
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </Button>
      </div>
      
      <div className="grid grid-cols-2">
        {filteredElections.map(election => {
          const hasVoted = votedElections.includes(election.id);
          
          return (
            <Card key={election.id} className="election-card">
              <h3>{election.title}</h3>
              <p className="mb-2">{election.description}</p>
              
              <div className="election-status mb-2">
                <span className={`status-badge status-${election.status}`}>
                  {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
                </span>
                {hasVoted && <span className="status-badge status-voted">Voted</span>}
              </div>
              
              <Link to={`/election/${election.id}`}>
                <Button variant="primary" disabled={election.status === 'upcoming'}>
                  {election.status === 'upcoming' 
                    ? 'Coming Soon' 
                    : hasVoted 
                      ? 'View Results' 
                      : 'Vote Now'}
                </Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ElectionList;
