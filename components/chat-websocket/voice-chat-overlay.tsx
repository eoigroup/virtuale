import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonaImage from "../persona-image/persona-image";
import { Button } from "../ui/button";
import { PhoneOff } from "lucide-react";
import { Typography } from "../ui/typography";

interface VoiceChatOverlayProps {
  isActive: boolean;
  isProcessing?: boolean;
  profileImage: string;
  onClose: () => void;
  interimText: string;
  personaName?: string;
}

const VoiceChatOverlay: React.FC<VoiceChatOverlayProps> = ({
  isActive,
  profileImage,
  isProcessing,
  onClose,
  interimText,
  personaName,
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

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const source =
            audioContextRef.current!.createMediaStreamSource(stream);
          source.connect(analyserRef.current!);
          startVisualization();
        })
        .catch((err) => console.error("Microphone error:", err));
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
    const ctx = canvas.getContext("2d")!;
    const analyser = analyserRef.current!;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      animationFrameRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
        gradient.addColorStop(0, "#4F46E5");
        gradient.addColorStop(1, "#818CF8");

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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
        >
          <Typography
            as="span"
            className="rounded-2xl flex gap-2 items-center mt-4 text-sm bg-secondary px-2 font-light h-fit "
          >
            Live
            <span className="w-2 h-2 bg-green-300 rounded-full" />
          </Typography>

          <div className="relative w-full max-w-2xl mx-auto flex flex-1 justify-center flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-4"
            >
              <PersonaImage
                image={profileImage}
                defaultSize={32}
                className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-indigo-500 shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-lg mx-auto">
                <p className="text-white/90 text-lg">
                  {isProcessing
                    ? `${personaName} speaking`
                    : interimText || "Listening..."}
                </p>
              </div>
            </motion.div>

            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="w-full max-w-2xl rounded-lg"
            />

            <div className="mt-12">
              <Button
                className="rounded-full text-red-500 p-0 w-12 h-12"
                onClick={onClose}
              >
                <PhoneOff />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceChatOverlay;
