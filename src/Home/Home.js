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
            { title: "Hello", subtitle: 'Darkness' },
            { title: "Whatever", subtitle: 'Ever' },
            { title: "Here we go", subtitle: 'Please work' },
            { title: "Here we go dfs", subtitle: 'Please work' },
            { title: "Here we go 2", subtitle: 'Please work' },
            { title: "Here we go 3", subtitle: 'Please work' },
            { title: "Here we go 4", subtitle: 'Please work' },
            { title: "Here we go 5", subtitle: 'Please work' },
            { title: "Here we go 6", subtitle: 'Please work' },
            { title: "Here we go 7", subtitle: 'Please work' },
            { title: "Here we go 8", subtitle: 'Please work' },
            { title: "Here we go 9", subtitle: 'Please work' },
            { title: "Here we go 10", subtitle: 'Please work' },
          ]}
          isSpinStarted={isSpinStarted}
          onSpinStart={() => setIsSpinStarted(true)}
        />
      </section>
    </section>
  );
};

export default Home;
