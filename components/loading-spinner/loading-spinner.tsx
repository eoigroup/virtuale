import React from "react";
import "./loading-spinner.css";

const LoadingSpinner = ({
  size = 2,
  color = "hsl(var(--primary))",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <div
      style={{
        // @ts-ignore
        "--uib-size": `${size}rem`,
        "--uib-color": `${color}`,
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
