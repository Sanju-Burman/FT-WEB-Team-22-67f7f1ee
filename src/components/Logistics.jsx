import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "../firebase";
import "../styles/initiative.css";
import Testimonials from "./testimonials";

const LogisticsPage = () => {
  const [logistics, setLogistics] = useState([]); // Store all logistics data

  // Fetch logistics data from Firebase Realtime Database
  useEffect(() => {
    const fetchLogistics = async () => {
      try {
        const logisticsRef = ref(database, "logistics"); // Reference to the 'logistics' folder
        const snapshot = await get(logisticsRef);

        if (snapshot.exists()) {
          const logisticsData = snapshot.val(); // Get the data as an object
          const logisticsList = Object.keys(logisticsData).map((id) => ({
            id,
            ...logisticsData[id],
          }));

          setLogistics(logisticsList);
        } else {
          console.log("No logistics available");
        }
      } catch (error) {
        console.error("Error fetching logistics:", error);
      }
    };

    fetchLogistics();
  }, []);

  return (
    <div className="news-page">
      <h1 className="news-heading">Logistics Overview</h1>
      <p className="news-subheading">Explore all logistics details here.</p>

      {/* Logistics Grid */}
      <div className="news-grid">
        {logistics.length > 0 ? (
          logistics.map((item) => (
            <div key={item.id} className="news-card">
              {/* Logistic Image */}
              <img
                src={item.image || "https://via.placeholder.com/310x200"} // Default placeholder image
                alt={item.title}
                className="news-img"
              />

              {/* Logistic Info */}
              <div className="news-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                {/* Logistic Media or Source */}
                <div className="news-media">
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Details
                  </a>
                </div>

                {/* Read More Button */}
                <a
                  href={item.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No logistics available at the moment.</p>
        )}
      </div>
      <Testimonials />
    </div>
  );
};
export default LogisticsPage;
