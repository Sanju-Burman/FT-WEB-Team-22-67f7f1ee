import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Initiative from "./pages/initiative";
import Impact from "./pages/initiative";
import News from "./pages/news";
import ThemeToggleButton from "./components/themetogglebutton";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/initiative" element={<Initiative />} />
        <Route path="/news" element={<News />} />
        <Route path="/impact" element={<Impact />} />
      </Routes>
      <Footer />
      <ThemeToggleButton />
    </ThemeProvider>
  );
}

export default App;
