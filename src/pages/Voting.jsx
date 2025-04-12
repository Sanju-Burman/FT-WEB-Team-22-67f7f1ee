import React, { useEffect, useState } from 'react';
import { ref, get } from "firebase/database"; // Import Realtime Database methods
import { database } from '../firebase'; // Import the Realtime Database instance
import VoteForm from '../components/VoteForm';
import VoteResults from '../components/VoteResults';

const VotingPage = () => {
    const [legislationId, setLegislationId] = useState(""); // Initialize with an empty string
    const [legislations, setLegislations] = useState([]); // Store all available legislations

    // Fetch all legislations from Firebase Realtime Database
    useEffect(() => {
        const fetchLegislations = async () => {
            try {
                const legislationRef = ref(database, 'democracy_data/legislations'); // Reference to the 'legislations' folder
                const snapshot = await get(legislationRef);
                if (snapshot.exists()) {
                    const legislationData = snapshot.val(); // Get the data as an object
                    const legislationList = Object.keys(legislationData).map((id) => ({
                        id,
                        ...legislationData[id],
                    }));

                    setLegislations(legislationList);

                    // Set the first legislation ID as default (if available)
                    if (legislationList.length > 0) {
                        setLegislationId(legislationList[0].id);
                    }
                } else {
                    console.log('No legislations available');
                }
            } catch (error) {
                console.error('Error fetching legislations:', error);
            }
        };

        fetchLegislations();
    }, []);

    // Handle legislation selection change
    const handleLegislationChange = (e) => {
        setLegislationId(e.target.value);
    };

    return (
        <div>
            <h2>Community Voting</h2>

            {/* Dropdown to select legislation */}
            <div>
                <label htmlFor="legislation-select">Select Legislation:</label>
                <select
                    id="legislation-select"
                    value={legislationId}
                    onChange={handleLegislationChange}
                    disabled={!legislations.length} // Disable if no legislations are available
                >
                    {legislations.map((legislation) => (
                        <option key={legislation.id} value={legislation.id}>
                            {legislation.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Render voting components if a legislation is selected */}
            {legislationId && (
                <>
                    <VoteForm legislationId={legislationId} />
                    <VoteResults legislationId={legislationId} />
                </>
            )}

            {/* Fallback message if no legislations are available */}
            {!legislations.length && (
                <p>No legislations available for voting at the moment.</p>
            )}
        </div>
    );
};

export default VotingPage;