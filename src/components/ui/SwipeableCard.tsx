import React, { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SwipeableCardProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ children, onDelete }) => {
  const [offset, setOffset] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left') {
        setOffset(Math.min(0, Math.max(-100, eventData.deltaX)));
      }
    },
    onSwipedLeft: (eventData) => {
      if (eventData.deltaX < -30) {
        setOffset(-60);
      } else {
        setOffset(0);
      }
    },
    onSwipedRight: () => {
      setOffset(0);
    },
    trackMouse: true,
  });

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  return (
    <div className="relative overflow-hidden" {...handlers} ref={cardRef}>
      <div
        className={`transition-transform duration-300 ease-out ${isDeleting ? 'transform -translate-x-full' : ''
          }`}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {children}
      </div>
      <div
        className="absolute top-0 right-0 bottom-0 flex items-center justify-center bg-red-500 transition-transform duration-300 ease-out"
        style={{ width: '60px', transform: `translateX(${offset + 60}px)` }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="h-8 w-8 text-white hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SwipeableCard;