import React from "react";
import "./loading-spinner.css";

const LoadingSpinner = ({ size = 2 }: { size?: number }) => {
  return (
    <div
      style={{
        // @ts-ignore
        "--uib-size": `${size}rem`,
      }}
      className="dot-spinner"
    >
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
};

export default LoadingSpinner;
