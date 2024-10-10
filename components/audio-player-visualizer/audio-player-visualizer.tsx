import React, { useEffect, useState } from "react";

const AudioPlayerVisualizer = () => {
  const [bars, setBars] = useState([5, 6, 12, 7, 5]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(
        bars.map(() => Math.floor(Math.random() * 14) + 2) // Random height between 2 and 16
      );
    }, 300); // Adjust the speed of the animation here

    return () => clearInterval(interval); // Cleanup on unmount
  }, [bars]);

  return (
    <div className="flex flex-row gap-px items-center h-3">
      {bars.map((barHeight, index) => (
        <div
          key={index}
          className="bg-blue rounded-md w-[2px] transition-[height] ease-in-out duration-300"
          style={{ height: `${barHeight}px` }}
        />
      ))}
    </div>
  );
};

export default AudioPlayerVisualizer;
