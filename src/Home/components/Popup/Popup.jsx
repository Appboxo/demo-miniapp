import React, { useEffect } from "react";

import "./Popup.scss";

export default function Popup({ show, setShow, winPrize }) {
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [setShow, show]);

  return (
    show && (
      <>
        <div className="wrapper">
          <div className="win-text">You win</div>
          <div className="prize">{winPrize?.title ?? "Testing win object"}</div>
        </div>
      </>
    )
  );
}
