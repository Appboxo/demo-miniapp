import React, { useEffect, useRef, useState } from "react";

import "./Carousel.scss";
import Card from "../Card/Card";

function Carousel({ elements }) {
  const elementsCopy = [...elements, ...elements];
  const [currentIndex, setCurrentIndex] = useState(null);

  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const animationRefId = useRef(null);

  const cardWidth = 172 + 8;
  const carouselOffset = (cardWidth * elementsCopy.length) / 2;

  let speed = 0;
  let spinAmount = 0;

  const maxSpeed = 160;
  const minSpeed = 100;

  useEffect(() => {}, [speed]);

  const lerp = (start, end, t) => {
    return start + (end - start) * t;
  };

  const slowDownSpeed = () => {
    if (speed < 1 / 6) {
      speed = 0;
      handleStopSpin();
      return;
    }

    speed = lerp(speed, 0, 0.009);
  };

  const spin = () => {
    slowDownSpeed();

    spinAmount += speed;

    if (spinAmount > carouselOffset) {
      spinAmount = speed;
    }

    carouselRef.current.style.left = `-${spinAmount}px`;
    animationRefId.current = requestAnimationFrame(spin);
  };

  const getRandomSpeed = () => Math.random() * (maxSpeed - minSpeed) + minSpeed;

  const handleStartSpin = () => {
    speed = getRandomSpeed();
    spin();
  };

  const handleStopSpin = () => {
    cancelAnimationFrame(animationRefId.current);
  };

  return (
    <div
      className="carousel-wrapper"
      onClick={handleStartSpin}
      ref={wrapperRef}
    >
      <div className="carousel" ref={carouselRef}>
        {elementsCopy.map((element, index) => (
          <Card
            key={index}
            isActive={index === currentIndex}
            title={element.title}
            secondaryText={element.subtitle}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
