import React, { useState } from "react";

import ScanToSpin from "./components/ScanToSpin/ScanToSpin";
import Carousel from "./components/Carousel/Carousel";

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
          elements={[
            { title: "Test 1", subtitle: 'Element 1' },
            { title: "Test 2", subtitle: 'Element 2' },
            { title: "Test 3", subtitle: 'Element 3' },
            { title: "Test 4", subtitle: 'Element 4' },
            { title: "Test 5", subtitle: 'Element 5' },
            { title: "Test 6", subtitle: 'Element 6' },
            { title: "Test 7", subtitle: 'Element 7' },
            { title: "Test 8", subtitle: 'Element 8' },
            { title: "Test 9", subtitle: 'Element 9' },
            { title: "Test 10", subtitle: 'Element 10' },
          ]}
          isSpinStarted={isSpinStarted}
          onSpinStart={() => setIsSpinStarted(true)}
        />
      </section>
    </section>
  );
};

export default Home;
