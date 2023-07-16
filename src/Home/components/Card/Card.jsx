import React from "react";

import "./Card.scss";

function Card({ isActive, title, secondaryText, icon }) {
  return (
    <div className={`card ${isActive ? "active" : ""}`}>
      <div className="image-container">
        <img src={icon} alt="icon" />
      </div>

      <div>
        <h1 className="text-body secondary-text grey">{title}</h1>
        <h3 className="text-body primary-text">{secondaryText}</h3>
      </div>
    </div>
  );
}

export default Card;
