// AI assisted development
import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import BackendStatus from "./components/BackendStatus";
import { trackPageView } from "./utils/analytics";

function App() {
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div id="hero"></div>
      <HomePage />
      <Footer />
      <BackendStatus />
    </div>
  );
}

export default App;
