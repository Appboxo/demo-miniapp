import React from "react";

import ScanToSpin from "./components/ScanToSpin/ScanToSpin";
import Carousel from "./components/Carousel/Carousel";

import "./Home.scss";

const Home = (props) => {
  return (
    <section className="pane intro">
      <section className="top-section">
        <ScanToSpin />
      </section>
      <section className="spin-section">
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
        />
      </section>
    </section>
  );
};

export default Home;
