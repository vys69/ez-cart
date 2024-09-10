import React, { useState, useRef, useCallback } from 'react';
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import trashAnimation from "@/animations/trash.json";

interface LottieTrashProps {
  onClick: () => void;
  style: React.CSSProperties;
  size: number | undefined;
  speed: number | undefined;
}

const LottieTrash: React.FC<LottieTrashProps> = ({ onClick, style, size, speed }) => {
  const [isHovered, setIsHovered] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleAnimation = useCallback(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed || 1); // Set animation speed to 2x
      if (isHovered) {
        lottieRef.current.playSegments([0, 30], true); // Play only half the frames forward
      } else {
        lottieRef.current.playSegments([30, 0], true); // Play half the frames backward
      }
    }
  }, [isHovered, speed]);
  
  React.useEffect(() => {
    handleAnimation();
  }, [handleAnimation]);

  return (
    <div 
      className="h-10 w-10 flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Lottie 
        lottieRef={lottieRef}
        animationData={trashAnimation} 
        loop={false}
        autoplay={false}
        style={{ ...style, filter: 'invert(1)', width: size, height: size }} // This will make it white
      />
    </div>
  );
};

export default LottieTrash;