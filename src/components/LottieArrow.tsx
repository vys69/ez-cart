import React, { useState, useRef, useCallback } from 'react';
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import arrowAnimation from "@/animations/arrow.json";

interface LottieArrowProps {
  onClick: () => void;
  style: React.CSSProperties;
  size: number | undefined;
  speed: number | undefined;
}

const LottieArrow: React.FC<LottieArrowProps> = ({ onClick, style, size, speed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleAnimation = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed || 1);
      if (isHovered) {
        lottieRef.current.playSegments([0, 30], true);
      } else {
        lottieRef.current.playSegments([30, 0], true);
      }
    }
  }, [isHovered, speed]);  // Add speed to the dependency array

  React.useEffect(() => {
    handleAnimation();
  }, [handleAnimation]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="h-10 w-10 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <Lottie 
        lottieRef={lottieRef}
        animationData={arrowAnimation} 
        loop={false}
        autoplay={false}
        style={{ ...style, filter: 'invert(1)', width: size, height: size }}
      />
    </div>
  );
};

export default LottieArrow;