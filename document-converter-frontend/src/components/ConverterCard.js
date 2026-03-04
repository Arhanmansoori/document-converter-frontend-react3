// AI assisted development
import React from "react";
import { useNavigate } from "react-router-dom";
import { trackButtonClick } from "../utils/analytics";

const ConverterCard = ({ slug, icon, title, description }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="converter-icon-card"
        onClick={() => {
          trackButtonClick(`${title} Card`, "Homepage");
          navigate(`/tool/${slug}`);
        }}
      >
        <div className="icon-wrapper">
          <span className="converter-icon">{icon}</span>
          <div className="click-indicator">
            <span className="click-hand">👆</span>
            <span className="click-text">Click</span>
          </div>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

export default ConverterCard;

