import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface VoiceChatOverlayProps {
  isActive: boolean;
  profileImage: string;
  onClose: () => void;
  interimText: string;
}

const VoiceChatOverlay: React.FC<VoiceChatOverlayProps> = ({ 
  isActive, 
  profileImage,
  onClose,
  interimText 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (isActive && canvasRef.current) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const source = audioContextRef.current!.createMediaStreamSource(stream);
          source.connect(analyserRef.current!);
          startVisualization();
        })
        .catch(err => console.error('Microphone error:', err));
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isActive]);

  const startVisualization = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const analyser = analyserRef.current!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
        gradient.addColorStop(0, '#4F46E5');
        gradient.addColorStop(1, '#818CF8');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
              onClick={onClose}
            >
              Close
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-4"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-indigo-500 shadow-lg">
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-lg mx-auto">
                <p className="text-white/90 text-lg">
                  {interimText || "Listening..."}
                </p>
              </div>
            </motion.div>

            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="w-full max-w-2xl rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceChatOverlay; 