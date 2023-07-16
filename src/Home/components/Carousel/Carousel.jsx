import React, { createRef, useEffect, useRef, useState } from "react";
import appboxoSDK from "@appboxo/js-sdk";

import { ReactComponent as ArrowIcon } from "../../../assets/arrow.svg";

import "./Carousel.scss";
import Card from "../Card/Card";

function Carousel({ elements, onSpinStart, isSpinStarted }) {
  const elementsCopy = [...elements, ...elements];
  const [currentIndex, setCurrentIndex] = useState(null);
  const [spinStopped, setSpinStopped] = useState(true);

  const cardsRefs = elementsCopy.map((el) => ({
    ref: createRef(),
    element: el,
  }));

  const carouselRef = useRef(null);
  const wrapperRef = useRef(null);
  const animationRefId = useRef(null);

  const cardWidth = 172 + 8;
  const carouselOffset = (cardWidth * elementsCopy.length) / 2;

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
      }
    });
  }, []);

  // useEffect(() => {
  //   if (spinStopped) {
  //     console.log(cardsRefs);

  //     cardsRefs.map((card) => {
  //       console.log(card.ref.current);
  //     });
  //   }
  // }, [spinStopped]);

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

    carouselRef.current.style.left = `-${spinAmount}px`;
    animationRefId.current = requestAnimationFrame(spin);
  };

  const getRandomSlowdownAmount = () =>
    Math.random() * (maxSlowdownAmount - minSlowdownAmount) + minSlowdownAmount;

  const getRandomSpeed = () => Math.random() * (maxSpeed - minSpeed) + minSpeed;

  const handleStartSpin = () => {
    if (isSpinStarted) return;

    onSpinStart(true);

    speed = getRandomSpeed();

    randomSlowdownAmount = getRandomSlowdownAmount();

    spin(randomSlowdownAmount);
  };

  const handleStopSpin = () => {
    cancelAnimationFrame(animationRefId.current);
    setSpinStopped(true);
    onSpinStart(false);
  };

  return (
    <div
      className="carousel-wrapper"
      // onClick={handleStartSpin}
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
            ref={cardsRefs[index].ref}
          />
        ))}
      </div>
      {isSpinStarted && <ArrowIcon className="arrow-bottom" />}
    </div>
  );
}

export default Carousel;
