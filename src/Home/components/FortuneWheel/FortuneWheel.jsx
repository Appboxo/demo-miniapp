import React, { useRef, useEffect } from "react";

import appboxoSDK from "@appboxo/js-sdk";

import "./FortuneWheel.scss";

const rand = (m, M) => Math.random() * (M - m) + m;

export default function FortuneWheel({
  onSpinStart,
  isSpinStarted,
  setIsSpinStopped,
  setHasWon,
}) {
  const animationRef = useRef(null);
  const wheelRef = useRef(null);

  const friction = 0.991;
  let angle = 0;
  let angleVelocity = 0;

  useEffect(() => {
    appboxoSDK.subscribe((event) => {
      if (!event.detail) {
        return;
      }

      const { type } = event.detail;

      if (type === "AppBoxoWebGetNfcRecords") {
        handleStartSpin();
        // updateLogs({
        //   action: "GET_NFC_RECORDS",
        //   message: JSON.stringify(event),
        // });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartSpin = () => {
    if (isSpinStarted) return;

    onSpinStart(true);
    setIsSpinStopped(false);

    if (!angleVelocity) angleVelocity = rand(0.3, 0.5);

    animationRef.current = requestAnimationFrame(spin);
  };

  const handleStopSpin = () => {
    onSpinStart(false);
    setIsSpinStopped(true);

    const win = Math.random() < 0.5;

    setHasWon(win);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    animationRef.current = null;
  };

  const spin = () => {
    if (!angleVelocity) return;

    angleVelocity *= friction;

    if (angleVelocity < 0.0012) {
      angleVelocity = 0;
      handleStopSpin();
    }

    angle += angleVelocity;
    angle %= Math.PI * 2;

    wheelRef.current.style.transform = `rotate(${angle - Math.PI / 2}rad)`;

    requestAnimationFrame(spin);
  };

  return (
    <section className="container">
      <div className="wheel" ref={wheelRef}></div>

      <div className="text-container">
        <div class="instruction">
          <b>SCAN TO SPIN</b> or press the button
        </div>

        <button className="spin-button" type="button" onClick={handleStartSpin}>
          SPIN
        </button>
      </div>
    </section>
  );
}
