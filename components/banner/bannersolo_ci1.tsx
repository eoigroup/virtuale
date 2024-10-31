import { useEffect, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  size: number;
  key: string;
  index: number;
}

const ConcentricCircles = () => {
  const [activeDots, setActiveDots] = useState<Set<number>>(new Set());
  const [dots, setDots] = useState<Dot[]>([]);
  const [dotImages, setDotImages] = useState<Record<number, string>>({});

  const images = [
    'eoi_brad.jpg',
    'topgai-idea5b.jpg',
    'IMG_8015.JPG',
    'emora_ai_v2_logo.jpg',
  ].map(img => `https://sm-voice-gen.s3.amazonaws.com/images/${img}`);

  useEffect(() => {
    setDots(generateDots());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActiveDots = new Set<number>();
      const numActive = Math.floor(Math.random() * 4) + 5;
      
      const newDotImages = { ...dotImages };
      while (newActiveDots.size < numActive) {
        const randomIndex = Math.floor(Math.random() * dots.length);
        if (!newActiveDots.has(randomIndex)) {
          newActiveDots.add(randomIndex);
          newDotImages[randomIndex] = images[Math.floor(Math.random() * images.length)];
        }
      }
      
      setDotImages(newDotImages);
      setActiveDots(newActiveDots);
    }, 4000);

    return () => clearInterval(interval);
  }, [dots, dotImages, images]);

  const generateDots = (): Dot[] => {
    const dots: Dot[] = [];
    const numCircles = 4;
    const dotsPerCircle = 25;
    const centerX = 150;
    const centerY = 150;
    
    for (let circle = 0; circle < numCircles; circle++) {
      const ringRadii = [130, 115, 100, 85];
      const radius = ringRadii[circle];
      const offsetAngle = circle === 1 ? Math.PI / dotsPerCircle : 0;
      
      for (let i = 0; i < dotsPerCircle; i++) {
        const angle = (i * 2 * Math.PI) / dotsPerCircle + offsetAngle;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const size = 8 - (circle * 2);
         
        dots.push({
          x,
          y,
          size,
          key: `${circle}-${i}`,
          index: dots.length
        });
      }
    }
    return dots;
  };

  return (
    <div className="flex items-center justify-center w-full h-[280px]">
      <svg 
        viewBox="0 0 300 300" 
        className="w-full h-full"
      >
        <defs>
          <pattern 
            id="gradientPattern" 
            patternUnits="userSpaceOnUse" 
            width="300" 
            height="300"
          >
            <image 
              href="/gradient.png"
              width="300" 
              height="300" 
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>

          <pattern 
            id="centerImagePattern" 
            patternUnits="userSpaceOnUse" 
            width="40" 
            height="40"
          >
            <image 
              href="https://sm-voice-gen.s3.amazonaws.com/images/eoi_brad.jpg"
              width="40" 
              height="40" 
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>

          {Array.from(activeDots).map(dotIndex => (
  <pattern 
    key={`pattern-${dotIndex}`}
    id={`imagePattern-${dotIndex}`} 
    patternUnits="userSpaceOnUse"
    width="32"
    height="32"
  >
    <image 
      href={dotImages[dotIndex]}
      width="32"
      height="32"
      preserveAspectRatio="xMidYMid slice"
    />
  </pattern>
))}
        </defs>

        {dots.map((dot) => {
          const hasImage = activeDots.has(dot.index);
          const currentImage = dotImages[dot.index];
          const shouldEnlarge = hasImage && currentImage;

          return (
            <circle
              key={dot.key}
              cx={dot.x}
              cy={dot.y}
              r={shouldEnlarge ? dot.size * 4 : dot.size}
              fill={hasImage ? `url(#imagePattern-${dot.index})` : "url(#gradientPattern)"}
              className="transition-all duration-3000 ease-in-out"
              style={{
                opacity: hasImage ? 1 : 0.8,
                transition: 'opacity 3s ease-in-out, r 3s ease-in-out, fill 0.1s ease-in-out 3s'
              }}
            />
          );
        })}

        <circle
          cx="150"
          cy="150"
          r="20"
          fill="url(#centerImagePattern)"
        />
      </svg>
    </div>
  );
};

export default ConcentricCircles;