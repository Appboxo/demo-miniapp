import React, { useEffect, useRef, useState } from "react";
import appboxoSDK from "@appboxo/js-sdk";

import { ReactComponent as ArrowIcon } from "../../../assets/arrow.svg";

import "./Carousel.scss";
import Card from "../Card/Card";

function Carousel({ elements, onSpinStart, isSpinStarted, updateLogs }) {
  const elementsCopy = [...elements, ...elements];

  const [currentIndex, setCurrentIndex] = useState(null);

  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const animationRef = useRef(null);
  const winCardRef = useRef(null);

  const cardMargin = 8;
  const cardWidth = 172;
  const carouselOffset = ((cardWidth + cardMargin) * elementsCopy.length) / 2;
  const centerX = window.innerWidth / 2;

  let speed = 0;
  let spinAmount = 0;
  let randomSlowdownAmount = 0;

  const maxSpeed = 180;
  const minSpeed = 100;

  const maxSlowdownAmount = 0.01;
  const minSlowdownAmount = 0.007;

  useEffect(() => {
    appboxoSDK.subscribe((event) => {
      if (!event.detail) {
        return;
      }

      const { type, data } = event.detail;

      if (type === "AppBoxoWebGetNfcRecords") {
        handleStartSpin();
        updateLogs({
          action: "GET_NFC_RECORDS",
          message: JSON.stringify(event),
        });
      }
    });
  }, []);

  const centerWinCard = () => {
    if (winCardRef.current) {
      winCardRef.current.scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });
    }
  };

  const getWinCard = () => {
    if (!carouselRef.current) return;

    const cards = Array.from(carouselRef.current.children);

    cards.map((card, index) => {
      const { left, right } = card.getBoundingClientRect();

      if (right + cardMargin > centerX && left < centerX) {
        setCurrentIndex(index);
        winCardRef.current = card;
      }
    });

    centerWinCard();
  };

  const lerp = (start, end, t) => {
    return start + (end - start) * t;
  };

  const slowDownSpeed = () => {
    if (speed < 0.1) {
      speed = 0;
      handleStopSpin();
      return;
    }

    speed = lerp(speed, 0, randomSlowdownAmount);
  };

  const spin = (randomSlowdownAmount) => {
    slowDownSpeed(randomSlowdownAmount);

    if (spinAmount > carouselOffset) {
      spinAmount = speed;
    }

    spinAmount += speed;

    if (carouselRef.current) {
      carouselRef.current.style.left = `-${spinAmount}px`;
    }

    requestAnimationFrame(() => spin(randomSlowdownAmount));
  };

  const getRandomSlowdownAmount = () =>
    Math.random() * (maxSlowdownAmount - minSlowdownAmount) + minSlowdownAmount;

  const getRandomSpeed = () => Math.random() * (maxSpeed - minSpeed) + minSpeed;

  const handleStartSpin = () => {
    if (isSpinStarted) return;

    onSpinStart(true);
    setCurrentIndex(null);

    speed = getRandomSpeed();

    randomSlowdownAmount = getRandomSlowdownAmount();

    animationRef.current = requestAnimationFrame(() =>
      spin(randomSlowdownAmount)
    );
  };

  const handleStopSpin = () => {
    onSpinStart(false);
    getWinCard();
    centerWinCard();

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = null;
    winCardRef.current = null;
  };

  return (
    <div
      className="carousel-wrapper"
      onClick={handleStartSpin}
      ref={wrapperRef}
    >
      {isSpinStarted && <ArrowIcon className="arrow" />}
      <div className="carousel" ref={carouselRef}>
        {elementsCopy.map((element, index) => (
          <Card
            key={index}
            isActive={index === currentIndex}
            title={element.title}
            icon={element.icon}
            secondaryText={element.subtitle}
          />
        ))}
      </div>
      {isSpinStarted && <ArrowIcon className="arrow-bottom" />}
    </div>
  );
}

export default Carousel;
