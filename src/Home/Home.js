import React, { useEffect, useState } from "react";

// import ScanToSpin from "./components/ScanToSpin/ScanToSpin";
// import Carousel from "./components/Carousel/Carousel";

// import { SPIN_ELEMENTS } from "../constants";

import "./Home.scss";
// import LoggerContext from "../LoggerContext";
import FortuneWheel from "./components/FortuneWheel/FortuneWheel";
import Popup from "./components/Popup/Popup";

const Home = (props) => {
  const [isSpinStarted, setIsSpinStarted] = useState(false);
  const [isSpinStopped, setIsSpinStopped] = useState(false);
  const [winPrize, setWinPrize] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(isSpinStopped);
  }, [isSpinStopped])

  // const { updateLogs } = React.useContext(LoggerContext)

  return (
    <section className="pane intro">
      {/* <section className="top-section" style={{ transform: isSpinStarted ? 'translateY(-150%)' : '' }}>
        <ScanToSpin />
      </section>
      <section className="spin-section" style={{ transform: isSpinStarted ? 'translateY(-50%)' : '' }}>
        <Carousel
          elements={SPIN_ELEMENTS}
          isSpinStarted={isSpinStarted}
          onSpinStart={(started) => setIsSpinStarted(started)}
          updateLogs={updateLogs}
        />
      </section> */}

      <FortuneWheel
        isSpinStarted={isSpinStarted}
        onSpinStart={(started) => setIsSpinStarted(started)}
        setWinPrize={setWinPrize}
        setIsSpinStopped={setIsSpinStopped}
      />
      <Popup show={showPopup} setShow={setShowPopup} winPrize={winPrize} />
    </section>
  );
};

export default Home;
