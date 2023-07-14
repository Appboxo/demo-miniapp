import React from "react";

import './Card.scss';

function Card({ isActive }) {
    return (
        <div className={`card ${isActive ? 'active' : ''}`}>
            <div className="image-container"></div>

            <h1 className="text-body secondary-text grey">Starbucks</h1>
            <h3 className="text-body primary-text">Free Grande Caffé Latte</h3>
        </div>
    )
}

export default Card;