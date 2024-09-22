import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from "lucide-react";

interface SwipeableCardProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ children, onDelete }) => {
  const [offset, setOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number) => {
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    const diff = startX - clientX;
    setOffset(Math.min(0, Math.max(-60, -diff)));
  };

  const handleEnd = () => {
    if (offset < -30) {
      setOffset(-60);
    } else {
      setOffset(0);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setOffset(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      className="relative overflow-hidden cursor-grab active:cursor-grabbing" 
      ref={cardRef}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div
        className={`transition-transform duration-300 ease-out ${isDeleting ? 'transform -translate-x-full' : ''}`}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {children}
      </div>
      <div
        className="absolute top-0 right-0 bottom-0 flex items-center justify-center bg-red-500 transition-transform duration-300 ease-out cursor-pointer"
        style={{ width: '60px', transform: `translateX(${offset + 60}px)` }}
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4 text-white" />
      </div>
    </div>
  );
};

export default SwipeableCard;