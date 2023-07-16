import React, { useState } from "react";

import ScanToSpin from "./components/ScanToSpin/ScanToSpin";
import Carousel from "./components/Carousel/Carousel";

import { SPIN_ELEMENTS } from "../constants";

import "./Home.scss";

const Home = (props) => {
  const [isSpinStarted, setIsSpinStarted] = useState(false);

  return (
    <section className="pane intro">
      <section className="top-section" style={{ transform: isSpinStarted ? 'translateY(-150%)' : '' }}>
        <ScanToSpin />
      </section>
      <section className="spin-section" style={{ transform: isSpinStarted ? 'translateY(-50%)' : '' }}>
        <Carousel
          elements={SPIN_ELEMENTS}
          isSpinStarted={isSpinStarted}
          onSpinStart={() => setIsSpinStarted(true)}
        />
      </section>
    </section>
  );
};

export default Home;
