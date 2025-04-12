import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Initiative from "./pages/initiative";
import News from "./pages/news";
import VotingPage from "./pages/Voting";
import Profile from "./pages/profile";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import ThemeToggleButton from "./components/themetogglebutton";
import { ThemeProvider } from "./context/ThemeContext";
import LogisticsPage from "./components/Logistics";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Default Route */}
          <Route path="/" element={<Home />} />

          {/* Protected/Private Routes */}
          <Route
            path="/voting"
            element={
              <PrivateRoute>
                <VotingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/logistics"
            element={
              <PrivateRoute>
                <LogisticsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Other Public Routes */}
          <Route path="/initiative" element={<Initiative />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <Footer />
        <ThemeToggleButton />
      </Router>
    </ThemeProvider>
  );
}

export default App;
