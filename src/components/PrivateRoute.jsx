import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;