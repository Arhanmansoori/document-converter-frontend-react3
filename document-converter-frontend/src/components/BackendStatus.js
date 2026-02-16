// AI assisted development
import React, { useEffect, useState } from "react";
import { checkBackendHealth } from "../api";
import "./BackendStatus.css";

const BackendStatus = () => {
  const [status, setStatus] = useState("checking");
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const data = await checkBackendHealth();
        if (data) {
          setStatus("connected");
          setHealthData(data);
        } else {
          setStatus("disconnected");
        }
      } catch (error) {
        setStatus("disconnected");
      }
    };

    checkStatus();
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`backend-status ${status}`}>
      <div className="status-indicator">
        <span className="status-dot"></span>
        <span className="status-text">
          {status === "connected" 
            ? "Backend Connected" 
            : status === "checking" 
            ? "Checking..." 
            : "Backend Disconnected"}
        </span>
      </div>
      {healthData && (
        <div className="health-info">
          <span>{healthData.service} v{healthData.version}</span>
        </div>
      )}
    </div>
  );
};

export default BackendStatus;

