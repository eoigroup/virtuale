import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './bannersolo_ca5_component.module.css';

const images = [
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-olivia.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-therapist.jpeg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-zyx-427.jpg",

];

const bubbleImages = [
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-the-global-explorer.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-thebrainstormer.jpeg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-therapist.jpeg",
  "https://www.virtuale.ai/og-image.png",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-nurse2.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-olivia.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-theriddler.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-parentingexpert.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-zyx-427.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-publicspeakingcoach.jpg",
  "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-lunatheastrologer.jpg",
  // Add more images as needed
];

const labels = ['connection', 'mentor', 'curious', 'thoughtful', 'bold', 'insightful'];

export default function CustomComponent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Update the main image every 60 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-[250px] relative">
      <div className="relative w-full md:w-[650px] h-[250px]">
        
        {/* Central Image with smooth transition effect */}
        <div className={`${styles.centralImageContainer}`}>
          <Image
            alt="main-image"
            src={images[currentImageIndex]}
            priority
            width={100}
            height={100}
            className={`rounded-full ${styles.centralImage}`}
          />
        </div>

        {/* Floating Bubbles */}
        {[...Array(60)].map((_, index) => {
          const randomBubbleImage = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
          return (
            <div
              key={index}
              className={`${styles.bubble}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 8}s`,
              }}
            >
              <Image
                alt="bubble-image"
                width={15}
                height={15}
                className="rounded-full"
                src={randomBubbleImage}
              />
            </div>
          );
        })}

        {/* Labels with random positions and staggered fade in/out */}
        {labels.map((label, index) => (
          <div
            key={index}
            className={`${styles.label} ${styles.fadeLabel}`}
            style={{
              top: `${Math.random() * 300}px`,
              left: `${Math.random() * 700}px`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
