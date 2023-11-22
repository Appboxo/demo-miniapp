import React, { useEffect } from "react";

import "./Popup.scss";

export default function Popup({ show, setShow, hasWon }) {
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [setShow, show]);

  return (
    show && (
      <>
        <div className="wrapper">{hasWon ? "You won!" : "You lose!"}</div>
      </>
    )
  );
}
