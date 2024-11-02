import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './bannersolo_ca7_component.module.css';

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

const labels = [
  'connection', 'mentor', 'curious', 'thoughtful', 'bold', 'insightful',
  'inspiring', 'empowering', 'transformative', 'nurturing', 'enlightening',
  'motivating', 'engaging', 'immersive', 'authentic', 'responsive', 'dynamic',
  'personalized', 'supportive', 'uplifting', 'comforting', 'encouraging',
  'understanding', 'accepting', 'educational', 'analytical', 'strategic',
  'innovative', 'creative', 'expert', 'playful', 'witty', 'adventurous',
  'mysterious', 'passionate', 'energetic', 'guidance', 'discovery', 'growth',
  'learning', 'insight', 'wisdom', 'adaptive', 'limitless', 'accessible',
  'reliable', 'focused', 'purposeful', 'genuine', 'devoted', 'patient'
];

const LABEL_COUNT = 4; // Reduced from 10 to 7 labels
type Label = {
  id: number;
  left: number;
  top: number;
  delay: number;
  text: string;
};

export default function CustomComponent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleLabels, setVisibleLabels] = useState<Label[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getRandomPosition = () => {
      // Determine if label should be on left or right side
      const side = Math.random() < 0.5;
      
      // Far left (0-15%) or far right (85-100%)
      const left = side ? Math.random() * 15 : 85 + Math.random() * 15;
      
      // Avoid middle area completely
      const topArea = Math.random() < 0.5;
      const top = topArea ? 
        20 + Math.random() * 60 : // 20-80px from top
        200 + Math.random() * 30; // 200-230px from top
      
      return {
        left,
        top,
        delay: Math.random() * 15,
      };
    };

    const createNewLabel = () => ({
      text: labels[Math.floor(Math.random() * labels.length)],
      ...getRandomPosition(),
      id: Date.now() + Math.random(),
    });

    // Initialize labels
    setVisibleLabels(Array.from({ length: LABEL_COUNT }, createNewLabel));

    // Update one random label every 3 seconds
    const interval = setInterval(() => {
      setVisibleLabels(currentLabels => {
        const newLabels = [...currentLabels];
        const replaceIndex = Math.floor(Math.random() * LABEL_COUNT);
        newLabels[replaceIndex] = createNewLabel();
        return newLabels;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[250px] relative">
      <div className="relative w-full md:w-[650px] h-[250px]">
        {/* Central Image */}
        <div className={`${styles.centralImageContainer} md:mt-[-30px] mt-[-65px]`}>

          <Image
            alt="main-image"
            src={images[currentImageIndex]}
            priority
            width={100}
            height={100}
            className={styles.centralImage}
          />
        </div>

        {/* Centered text content */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center w-full top-[110px] md:top-[150px]">

        <p className="font-bold text-md text-white-700 mb-0 leading-none">
  <span className="block hidden md:inline">
    Interactive Conversation & Meaningful Connection
  </span>
  <span className="block md:hidden">
    Interactive Conversation & Meaningful <br /> Connection with 100+ curated Personas
  </span>
  <span className="hidden md:block">
    with 100+ curated Personas
  </span>
</p>
          <p className="font-bold uppercase text-2xl pt-3 leading-none">
          unlimited access<br /> Starts at .  
          </p>
          <p className=" titlecase text-xs mt-0 pt-0">
         cancel at any time
          </p>
        </div>

        {/* Floating Bubbles */}
        {[...Array(60)].map((_, index) => {
          const randomBubbleImage = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
          return (
            <div
              key={index}
              className={styles.bubble}
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

        {/* Labels */}
        {visibleLabels.map((label) => (
          <div
            key={label.id}
            className={styles.label}
            style={{
              left: `${label.left}%`,
              top: `${label.top}px`,
              animationDelay: `${label.delay}s`
            }}
          >
            {label.text}
          </div>
        ))}
      </div>
    </div>
  );
}