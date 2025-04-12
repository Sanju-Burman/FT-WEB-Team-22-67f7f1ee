import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VoteForm from '../components/VoteForm';
import VoteResults from '../components/VoteResults';

const VotingPage = () => {
    const [legislationId, setLegislationId] = useState(''); // Example ID

    useEffect(() => {
        const fetchLegislation = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/legislation', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setLegislationId(response.data.id);
            } catch (error) {
                console.error('Error fetching legislation:', error);
            }
        };
        fetchLegislation();
    }, []);

    return (
        <div>
            <h2>Community Voting</h2>
            <VoteForm legislationId={legislationId} />
            <VoteResults legislationId={legislationId} />
        </div>
    );
};

export default VotingPage;