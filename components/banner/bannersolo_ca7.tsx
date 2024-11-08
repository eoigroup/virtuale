import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import styles from './bannersolo_ca7_component.module.css';
import { isPremiumUser } from "@/lib/utils";
import { useUser } from "@/contexts/user-context";
import PersonaImage from "../persona-image/persona-image";
import { IPersona } from "@/types/persona";
import { UserProviderBoundary } from '../error-boundary/user-provider-boundary';
import Link from "next/link";
//import Geolocation from '../geolocation/geolocation';
import Pricing from '../pricing/pricing';

// Add Label interface
interface Label {
  id: number;
  text: string;
  left: number;
  top: number;
  delay: number;
}

// Constants
//const LOGO_IMAGE = "https://www.virtualera.ai/og-image.png";
const LOGO_IMAGE = "https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-nurse2.jpg";
const INTERVAL_TIME = 2000;
const LABEL_UPDATE_TIME = 3000;
const INITIAL_LABEL_COUNT = 0;
const BUBBLE_COUNT = 50;
const MAIN_IMAGE_COUNT = 5;
 
const labels = [
  "AI Powered", "Interactive", "Engaging", "Educational",
  "Mentor", "Connection", "Thoughtful", "Insightful", "Inspiring",
  "Fun", "Innovative", "Smart", "Responsive", "Discovery",
  "Curious", "Empowering", "Immersive", "Nurturing", "Motivating",
  "Personalized", "Supportive", "Comforting", "Encouraging",
  "Understanding", "Accepting", "Analytical", "Strategic",
  "Creative", "Expert", "Playful", "Witty", "Adventurous",
  "Mysterious", "Passionate", "Energetic", "Guidance", "Growth",
  "Learning", "Insight", "Wisdom", "Adaptive", "Limitless",
  "Accessible", "Reliable", "Focused", "Purposeful", "Genuine",
  "Devoted", "Patient"
];

interface BannerProps {
  personas?: IPersona[];
}

// Add these interfaces at the top with your other interfaces
interface MainImageLogo {
  type: 'logo';
  src: string;
}

interface MainImagePersona {
  type: 'persona';
  persona: IPersona;
}

type MainImage = MainImageLogo | MainImagePersona;

export default function CustomComponent({ personas = [] }: BannerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleLabels, setVisibleLabels] = useState<Label[]>([]);

  // Generate bubble elements with persona images
  const bubbleElements = useMemo(() => {
    const bubbleImages = personas?.length 
      ? [...personas].sort(() => 0.5 - Math.random()).slice(0, BUBBLE_COUNT) 
      : Array(BUBBLE_COUNT).fill(null);

    return bubbleImages.map((persona, index) => (
      <div
        key={`bubble-${index}-${persona?.id || 'default'}`}
        className={styles.bubble}
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${5 + Math.random() * 8}s`,
        }}
      >
        {persona ? (
          <PersonaImage
            image={persona.profile_image}
            width={15}
            height={10}
            className="rounded-full"
            alt={persona.name}
          />
        ) : (
          <Image
            src={LOGO_IMAGE}
            alt="bubble"
            width={15}
            height={15}
            className="rounded-full"
          />
        )}
      </div>
    ));
  }, [personas]);

  useEffect(() => {
    // If INITIAL_LABEL_COUNT is 0, don't set up any labels or intervals
    if (INITIAL_LABEL_COUNT === 0) {
      setVisibleLabels([]);
      return;
    }

    const createLabel = () => {
      // Define strict safe zones
      const zones = [
        { min: 0, max: 140 },      // Top zone (above text)
        { min: 320, max: 400 }     // Bottom zone (below text)
      ];
      
      // Randomly select a zone
      const selectedZone = zones[Math.floor(Math.random() * zones.length)];
      
      // Generate position within the selected zone
      const top = Math.random() * (selectedZone.max - selectedZone.min) + selectedZone.min;
      
      return {
        id: Date.now() + Math.random(),
        text: labels[Math.floor(Math.random() * labels.length)],
        left: Math.random() * 80 + 10,
        top,
        delay: Math.random() * 2
      };
    };

    setVisibleLabels(Array.from({ length: INITIAL_LABEL_COUNT }, createLabel));

    const interval = setInterval(() => {
      setVisibleLabels(prev => {
        const newLabels = [...prev];
        const replaceIndex = Math.floor(Math.random() * INITIAL_LABEL_COUNT);
        newLabels[replaceIndex] = createLabel();
        return newLabels;
      });
    }, LABEL_UPDATE_TIME);

    return () => clearInterval(interval);
  }, []);

  // Get main rotating images including logo and random personas
  const mainImages = useMemo((): MainImage[] => {
    if (!personas?.length) return [{ type: 'logo', src: LOGO_IMAGE }];
    
    const randomPersonas = [...personas]
      .sort(() => 0.5 - Math.random())
      .slice(0, MAIN_IMAGE_COUNT)
      .map(p => ({ type: 'persona' as const, persona: p }));
    
    return [{ type: 'logo', src: LOGO_IMAGE }, ...randomPersonas];
  }, [personas]);

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % mainImages.length);
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [mainImages.length]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[350px] md:h-[400px] relative">
      <div className="relative w-full md:w-[650px] h-[350px] md:h-[400px]">
        <div className={`${styles.centralImageContainer} md:mt-[-30px] mt-[-45px]`}>
          {mainImages[currentImageIndex]?.type === 'persona' ? (
            <PersonaImage
              image={mainImages[currentImageIndex].persona.profile_image}
              width={100}
              height={100}
              className={styles.centralImage}
              alt={mainImages[currentImageIndex].persona.name}
            />
          ) : (
            <Image
              alt="main-image" 
              src={LOGO_IMAGE}
              priority
              width={100}
              height={100}
              className={styles.centralImage}
            />
          )}
        </div>

        {/* Always visible content */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center w-full top-[175px] md:top-[210px]">
          <p className="font-bold titlecase text-lg pt-3 leading-none">
            Interactive Conversation & Meaningful Connection
            <span className="hidden md:inline"><br /></span>
            {" "}with 100+ curated Personas
          </p>
        </div>

        {/* Conditional content based on user state */}
        <UserProviderBoundary
          fallback={
            <Link href={"/register"}>
              <div className="absolute left-1/2 transform -translate-x-1/2 text-center w-full top-[230px] md:top-[260px]">
                <p className="font-bold uppercase text-2xl pt-3 leading-none">
                 
                  <span className="text-sm">*special launch limited time offer*</span>
                  <br />  for only <Pricing /> 
                
                </p>
                <p className="titlecase text-xs mt-1 pt-0">
                  cancel at any time / billed in $USD
                </p>
              </div>
            </Link>
          }
        >
          {(userState) => (
            (!userState.user || !isPremiumUser(userState.user)) && (
              <div className="absolute left-1/2 transform -translate-x-1/2 text-center w-full top-[230px] md:top-[260px]">
                <p className="font-bold uppercase text-2xl pt-3 leading-none">
                
                  <span className="text-sm">*special launch limited time offer*</span>
                  <br /> for only <Pricing />
               
                </p>
                <p className="titlecase text-xs mt-1 pt-0">
                  cancel at any time / billed in $USD
                </p>
              </div>
            )
          )}
        </UserProviderBoundary>

        {bubbleElements}

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