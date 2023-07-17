import React, { useState } from "react";

import ScanToSpin from "./components/ScanToSpin/ScanToSpin";
import Carousel from "./components/Carousel/Carousel";

import { SPIN_ELEMENTS } from "../constants";

import "./Home.scss";
import LoggerContext from "../LoggerContext";

const Home = (props) => {
  const [isSpinStarted, setIsSpinStarted] = useState(false);

  const { updateLogs } = React.useContext(LoggerContext)

  return (
    <section className="pane intro">
      <section className="top-section" style={{ transform: isSpinStarted ? 'translateY(-150%)' : '' }}>
        <ScanToSpin />
      </section>
      <section className="spin-section" style={{ transform: isSpinStarted ? 'translateY(-50%)' : '' }}>
        <Carousel
          elements={SPIN_ELEMENTS}
          isSpinStarted={isSpinStarted}
          onSpinStart={(started) => setIsSpinStarted(started)}
          updateLogs={updateLogs}
        />
      </section>
    </section>
  );
};

export default Home;
