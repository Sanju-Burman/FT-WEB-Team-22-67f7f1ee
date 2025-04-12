import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const VoteForm = ({ legislationId }) => {
    const [vote, setVote] = useState('yes');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db,'votes'),{ legislationId, vote });
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