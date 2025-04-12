import React, { useState } from 'react';
import { ref, push } from "firebase/database"; // Import Realtime Database methods
import { database } from '../firebase'; // Import the Realtime Database instance

const VoteForm = ({ legislationId }) => {
    const [vote, setVote] = useState('yes');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const votesRef = ref(database, 'democracy_data/votes'); // Reference to the 'votes' folder
            await push(votesRef, { legislationId, vote }); // Add a new vote record
            setMessage('Vote recorded successfully!');
        } catch (error) {
            setMessage('Error recording vote. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Vote on Legislation</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        value="yes"
                        checked={vote === 'yes'}
                        onChange={(e) => setVote(e.target.value)}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="no"
                        checked={vote === 'no'}
                        onChange={(e) => setVote(e.target.value)}
                    />
                    No
                </label>
                <button type="submit">Submit Vote</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VoteForm;