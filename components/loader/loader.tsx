import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      {/* @ts-ignore */}
      <div className="orbe" style={{ "--index": 0 }} />
      {/* @ts-ignore */}
      <div className="orbe" style={{ "--index": 1 }} />
      {/* @ts-ignore */}
      <div className="orbe" style={{ "--index": 2 }} />
      {/* @ts-ignore */}
      <div className="orbe" style={{ "--index": 3 }} />
      {/* @ts-ignore */}
      <div className="orbe" style={{ "--index": 4 }} />
    </div>
  );
};

export default Loader;
