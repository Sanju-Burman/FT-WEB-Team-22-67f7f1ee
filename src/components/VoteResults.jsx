import React, { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";
import { ref as dbRef, get } from "firebase/database"; // Import Realtime Database methods
import { database } from "../firebase"; // Import the Realtime Database instance
import "../styles/VoteResults.css";

const VoteResults = ({ legislationId }) => {
  const [votes, setVotes] = useState({ yes: 0, no: 0 });
  const chartRef = useRef(null); // Use a ref to store the chart instance

  // Fetch votes for the selected legislation
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const votesRef = dbRef(database, "democracy_data/votes"); // Reference to the 'votes' folder
        const snapshot = await get(votesRef);

        if (snapshot.exists()) {
          const votesData = snapshot.val(); // Get the data as an object
          let yesCount = 0,
            noCount = 0;

          Object.keys(votesData).forEach((id) => {
            const vote = votesData[id];
            if (vote.legislationId === legislationId) {
              if (vote.vote === "yes") yesCount++;
              else noCount++;
            }
          });

          setVotes({ yes: yesCount, no: noCount });
        } else {
          console.log("No votes available");
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchVotes();
  }, [legislationId]);

  // Create or update the chart
  useEffect(() => {
    const ctx = document.getElementById(`voteChart-${legislationId}`);
    if (ctx) {
      // Destroy the previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new chart instance
      const newChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Yes", "No"],
          datasets: [
            {
              data: [votes.yes, votes.no],
              backgroundColor: ["#4CAF50", "#F44336"],
            },
          ],
        },
      });

      // Save the new chart instance in the ref
      chartRef.current = newChart;
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [votes, legislationId]); // Do NOT include chartRef in the dependency array

  return (
    <div>
      <h3>Vote Results</h3>
      <canvas
        id={`voteChart-${legislationId}`}
        style={{ width: "200px", height: "200px", maxWidth: "100%" }}
      ></canvas>
    </div>
  );
};

export default VoteResults;
