import React, { useEffect, useRef, useState } from "react";

import "./Carousel.scss";
import Card from "../Card/Card";

function Carousel({ elements }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  const carouselRef = useRef(null);
  const animationRefId = useRef(null);

  let speed = 0;
  let spinAmount = 0;

  const cardWidth = 172 + 8;
  const carouselWidthOffest = (elements.length * cardWidth) / 2;

  const lerp = (start, end, t) => {
    return start + (end - start) * t;
  };

  const slowDownSpeed = () => {
    if (speed < 1 / 6) {
      speed = 0;
      handleStopSpin();
      return;
    }

    speed = lerp(speed, 0, 0.011);
    console.log(speed);
  };

  const resetCarouselOffest = () => {
    if (spinAmount > carouselWidthOffest) {
      spinAmount = 0;
    }
  };

  const spin = () => {
    slowDownSpeed();
    resetCarouselOffest();

    spinAmount += speed;

    carouselRef.current.style.left = `-${spinAmount}px`;
    animationRefId.current = requestAnimationFrame(spin);
  };

  const handleStartSpin = () => {
    speed = 200;
    spin();
  };

  const handleStopSpin = () => {
    cancelAnimationFrame(animationRefId.current);
  };

  return (
    <div className="carousel-wrapper" onClick={handleStartSpin}>
      <div className="carousel" ref={carouselRef}>
        {elements.map((element, index) => (
          <Card key={index} isActive={index === currentIndex} />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
