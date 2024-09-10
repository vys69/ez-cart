import React, { useState, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import trashAnimation from "@/animations/trash.json";

interface LottieTrashProps {
  onClick: () => void;
  style: React.CSSProperties;
  size: number | undefined;
}

const LottieTrash: React.FC<LottieTrashProps> = ({ onClick, style, size }) => {
  const [isHovered, setIsHovered] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  React.useEffect(() => {
    if (lottieRef.current) {
      if (isHovered) {
        lottieRef.current.playSegments([0, 30], true);
      } else {
        lottieRef.current.playSegments([30, 0], true);
      }
    }
  }, [isHovered]);

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