// import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import VotingPage from './pages/Voting'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Route */}
          <Route
            path="/voting"
            element={
              <PrivateRoute>
                <VotingPage />
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
