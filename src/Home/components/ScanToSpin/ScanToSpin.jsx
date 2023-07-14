import React from "react";

import { ReactComponent as ScanToSpinImage } from "../../../assets/scan-to-spin.svg";

import "./ScanToSpin.scss";

function ScanToSpin() {
  return (
    <div className="wrapper">
      <ScanToSpinImage className="image" />

      <h1>Scan to spin</h1>
      <h3 className="text-body grey centered">
        Hold your payment card near this device to scan.
      </h3>
    </div>
  );
}

export default ScanToSpin;
