// AI assisted development
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import BackendStatus from "./components/BackendStatus";
import ConverterTool from "./components/ConverterTool";
import { findConverterBySlug } from "./config/converters";
import { trackPageView } from "./utils/analytics";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="app">
      <Navbar />
      <div id="hero"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tool/:slug"
          element={
            <ToolRouteWrapper />
          }
        />
      </Routes>
      <Footer />
      <BackendStatus />
    </div>
  );
}

function ToolRouteWrapper() {
  const location = useLocation();
  const slug = location.pathname.split("/").pop();
  const converter = findConverterBySlug(slug);

  if (!converter) {
    return (
      <div className="converter-page">
        <h1>Tool not found</h1>
        <p>The requested conversion tool does not exist.</p>
      </div>
    );
  }

  return (
    <ConverterTool
      type={converter.type}
      icon={converter.icon}
      title={converter.title}
      description={converter.description}
      accept={converter.accept}
      endpoint={converter.endpoint}
      isMerge={converter.isMerge || false}
      isCompress={converter.isCompress || false}
      isSplit={converter.isSplit || false}
      isRotate={converter.isRotate || false}
      isProtect={converter.isProtect || false}
      isWatermark={converter.isWatermark || false}
      isPdfToImage={converter.isPdfToImage || false}
    />
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
