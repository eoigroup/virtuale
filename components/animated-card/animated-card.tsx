"use client";
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface AnimatedCard extends MotionProps {
  visibleCircle?: boolean;
  circleSize?: number;
  className?: string;
  children: ReactNode;
}

export default function AnimatedCard(props: AnimatedCard) {
  const {
    children,
    className = "",
    visibleCircle,
    circleSize = 150,
    ...rest
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full bg-surface-elevation-1 hover:cursor-pointer overflow-hidden",
        className
      )}
      {...rest}
    >
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
        style={{
          background: `radial-gradient(circle ${circleSize}px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 80%)`,
          opacity: visibleCircle || isHovered ? 1 : 0,
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
