import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const VoteResults = ({ legislationId }) => {
    const [votes, setVotes] = useState({ yes: 0, no: 0 });

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const q = query(collection(db, 'votes'), where('legislationId', '==', legislationId));
                const querySnapshot = await getDocs(q);
                let yesCount = 0, noCount = 0;

                querySnapshot.forEach((doc) => {
                    if (doc.data().vote === 'yes') yesCount++;
                    else noCount++;
                });

                setVotes({ yes: yesCount, no: noCount });
            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };
        fetchVotes();
    }, [legislationId]);

    useEffect(() => {
        const ctx = document.getElementById(`voteChart-${legislationId}`);
        if (ctx) {
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Yes', 'No'],
                    datasets: [
                        {
                            data: [votes.yes, votes.no],
                            backgroundColor: ['#4CAF50', '#F44336'],
                        },
                    ],
                },
            });
        }
    }, [votes, legislationId]);

    return (
        <div>
            <h3>Vote Results</h3>
            <canvas id={`voteChart-${legislationId}`} width="200" height="200"></canvas>
        </div>
    );
};

export default VoteResults;