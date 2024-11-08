import React, { useState, useEffect } from 'react';

// Animation controls
const ANIMATE_OPACITY = true;  // Controls wave opacity animation
const ANIMATE_HEIGHT = true;   // Controls height animation

const AnimatedLogo = ({ className = "h-8 w-8" }) => {
  const [time, setTime] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    if (!ANIMATE_OPACITY && !ANIMATE_HEIGHT) return;
    
    // Initialize random heights for each bar
    if (heights.length === 0) {
      const initialHeights = Array(16).fill(0).map(() => Math.random() * 0.4 + 0.8);
      setHeights(initialHeights);
    }

    const animate = () => {
      setTime(t => (t + 1) % 100);
      
      if (ANIMATE_HEIGHT && Math.random() < 0.1) { // 10% chance to update heights
        setHeights(prevHeights => 
          prevHeights.map(() => {
            if (Math.random() < 0.3) { // 30% chance to change each bar
              return Math.random() * 0.4 + 0.8; // Range: 0.8 to 1.2
            }
            return prevHeights[0]; // Keep current height
          })
        );
      }
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [heights.length]);

  // Create wave effect with multiple bars having different phases
  const getWaveOpacity = (index: number) => {
    if (!ANIMATE_OPACITY) return 1;
    const phase = (index * 15 + time * 3.6) % 100;
    return 0.3 + Math.abs(Math.sin(phase * (Math.PI / 50))) * 0.7;
  };

  // Audio wave paths
  const wavePaths = [
    "M777.2 300c0 31.3 0 62.1.1 92.9 0 4-.7 6.9-5.2 7.6-4.9.8-7.3-.9-7.3-5.9-.1-41.9 0-83.9-.1-125.9 0-4 1.1-6.2 5.6-6 4.5.1 7 1.5 6.9 6.3-.1 10.2 0 20.3 0 31z",
    "M914.7 343c0-21.5 0-42.4 0-64.4 0-6.5 1.6-7.9 8-7.6 3.6.1 5 2.1 5.4 5.3.2 1.3 0 2.7 0 4v104.3c0 6.2-1.8 7.9-7.5 7.7-4.6-.1-5.9-2.6-5.9-6.8.1-13.6 0-27.3 0-42.5z",
    "M750.3 389c-3.2.8-6.3 1.9-9 1.2-1.3-.3-2.5-4.1-2.5-6.3.2-35.2.6-70.3.9-105.5 0-4.1 1.4-6.5 6.1-6.6 4.3 0 6.3 1.9 6.3 5.9-.3 36.3-.6 72.7-1 109.1 0 .6-.4 1.2-.8 2.2z",
    "M852.8 285.3c0 31.3 0 62.1 0 93.3 0 5.9-2.8 8.3-8.5 7.4-4.1-.6-5.4-3-5.3-7 .1-15.6 0-31.3 0-46.9 0-15.5 0-31 0-46.5 0-5.9 1.2-7.3 6.2-7.5 5.8-.2 7.2 1.1 7.6 7.2z",
    "M676.4 335c0 16.8 0 33.1-.1 49.5 0 5.2-2.4 7.2-7.5 6.7-4.4-.5-5.1-3.4-5.1-7.1.1-18 .1-36 .1-54V280.2c0-6.8 1.2-8.3 6.4-8.2 4.8.1 6.2 1.8 6.2 8-.1 18.2 0 36.3 0 55z",
    "M713.8 345c0-16.8 0-33.1 0-49.5 0-4.7 2.5-7.4 6.7-7.4 4.2 0 6.7 2.7 6.7 7.4 0 24.2 0 48.3 0 72.5 0 4.6-2.2 6.9-6.5 7-4.5.1-6.9-2.4-6.9-7.1-.1-7.5 0-15 0-22.9z",
    "M622.3 375.6c-6.7.6-8.5-1.1-8.6-7.3 0-24.5 0-49 0-73.5 0-4.1 1-7.4 5.8-7.7 4.3-.3 6.8 2.7 6.8 7.8 0 24.5.1 49-.1 73.5 0 2.3-2.3 4.7-3.9 7.2z",
    "M800.5 368.3c-7.1 3.5-11.5 1-11.5-6.4 0-20.5 0-41-.1-61.4 0-6.2 5.3-9.3 10.5-6.2 1.2.7 2.3 2.5 2.4 3.8.1 22.5.1 45 0 67.5 0 .9-.7 1.7-1.3 2.7z",
    "M864.6 359.8c0-19.1 0-37.7 0-56.3 0-4.8 2.8-7.9 7-7.5 3.9.3 5.7 2.4 5.6 6.6-.2 19.1-.1 38.2 0 57.4 0 4.2-.7 7.3-5.7 7.5-4.3.1-6.5-2.2-6.9-7.7z",
    "M651.9 329c0-7.8 0-15.5 0-23.1 0-4.6 2.3-7.3 6.6-7.3 4.3 0 6.8 2.7 6.8 7.2.1 13.1.1 26.2 0 39.4 0 4.2-2.9 7.4-6.8 7.3-3.9-.1-6.9-3.2-6.9-7.4-.1-5.3 0-10.7 0-16.1z",
    "M950.1 359.4c-7.9 1.6-10.2-.2-10.2-7.8 0-13.6 0-27.3 0-41 0-5.6 1.9-7.6 6.9-7.6 4 0 6 2.3 6 7.4.1 14.1.1 28.3-.1 42.4 0 2.1-1.5 4.2-2.6 6.6z",
    "M820.2 353c-4.3-.3-5.9-2.7-5.9-6.4 0-10 0-19.9.1-29.9 0-4.1 1.9-6.6 6.3-6.8 4.2-.2 6.8 2.1 6.9 6.7.2 10 .1 20 0 30-.1 4.4-2.3 6.8-7.4 6.4z",
    "M893.8 349.4c-1.5-2.4-3.5-4.5-3.6-6.7-.4-7.5 0-15 0-22.5-.1-4.4 2.5-6.8 6.2-6.9 3.8-.1 6.6 2.5 6.7 6.6.2 7.8.2 15.7 0 23.5-.1 4.8-3.2 6.8-9.3 6z",
    "M695 318c4.7 0 6.9 2.3 7 6.4.2 4.8.2 9.6 0 14.4-.2 4.5-2.7 6.3-7.2 6.3-4.5.1-5.7-2.5-5.7-6.2 0-5 0-10-.1-15 .1-3.5 1.1-6.3 6-5.9z",
    "M600.2 324.2c.4 4.3.9 8.2.6 12.2-.2 3.7-2.7 5.6-6.3 5.5-3.6-.1-5.9-1.9-5.9-5.9v-7.5c-.2-3.1.4-5.7 3.4-7 3.2-1.4 5.8-.2 8.2 2.7z",
    "M977.9 333.7c.6 5.3-3 6.7-6.5 6.7-3.4 0-6.1-2.1-6.3-6.3-.4-7.9 1.3-11.1 6.4-11.2 5.2-.1 6.4 1.9 6.4 10.8z"
  ];

  return (
    <svg 
      className={className}
      viewBox="0 0 994 664" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Audio wave parts - with wave animation */}
      {wavePaths.map((path, index) => (
        <g key={index} style={{ transition: 'transform 0.3s ease-in-out' }}>
          <path
            d={path}
            fill="white"
            style={{ 
              transition: 'opacity 0.2s',
              opacity: getWaveOpacity(index),
              transform: ANIMATE_HEIGHT ? `scale(1, ${heights[index] || 1})` : 'none',
              transformOrigin: '50% 330px'
            }}
          />
        </g>
      ))}

      {/* Static parts - logo shell */}
      <path 
        fill="currentColor" 
        d="M97 23c12.5-.1 24.5.1 36.5-.2 9.1-.2 15.5 3.7 20 11.5 25.3 44 50.8 88 76.2 132 33.5 58 67 116 100.4 174 9.2 16 27.4 16.1 36.5.2 57.5-101 115-202 172.3-303 5.4-9.5 12.5-13.8 23.3-13.7 33.5.2 67 .1 100.5.1 19.5 0 28.8 15.8 19 32.7-86.3 149.5-172.6 299-258.9 448.6-18.6 32.2-37.2 64.5-55.9 96.7-9.3 16.1-27.8 16.1-37 0C224.8 420.1 119.8 238 14.5 56.1 7 43.1 12.6 27.2 27.1 24.4c4.7-.9 9.6-.5 14.5-.5 18.3-.3 36.6-.5 55.4-.7z"
      />

      {/* Static header */}
      <path 
        fill="currentColor" 
        d="M942 503h39.8c.3.5.6.8.6 1.1-.1 23.3.8 46.7-.5 70-1.9 34-30.7 59.9-64.9 59.9-42 .1-84 0-126 0H419.7l-6 .1c3.1-5.4 5.8-10.3 8.6-15.1 21.5-37.3 43.1-74.5 64.5-111.8 1.8-3.2 3.8-4.2 7.4-4.2 149.1.1 298.2.1 447.8.1z"
      />

      {/* Static footer */}
      <path 
        fill="currentColor" 
        d="M761.3 24.2h220.4c.3.5.7 1 .7 1.4-.1 23.3.9 46.7-.5 69.9-1.9 33.2-29.8 59.4-63 59.6-75.5.4-151-.1-226.4-.1h-2c.6-1.5 1-2.8 1.7-4.1 20.6-41 41.2-81.9 61.6-122.9 1.7-3.5 3.8-4.1 7.5-3.8z"
      />
    </svg>
  );
};

export default AnimatedLogo;