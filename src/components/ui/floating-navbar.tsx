"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
  handleSmoothScroll,
}: {
  navItems: Array<{
    name: string;
    link: string;
    icon?: JSX.Element;
  }>;
  className?: string;
  handleSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [scrollTimer, setScrollTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [scrollTimer]);

  const router = useRouter();

  const handleGoShopping = () => {
    if (localStorage.getItem("setupSkipped")) {
      router.push('/cart')
    } else {
      router.push('/step/1')
    }
  }

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY - lastScrollY;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
          setScrollingDown(false);
          if (scrollTimer) clearTimeout(scrollTimer);
        } else if (direction > 0) {
          setScrollingDown(true);
          if (scrollTimer) clearTimeout(scrollTimer);
          const newTimer = setTimeout(() => {
            if (scrollingDown) setVisible(true);
          }, 1000); // Adjust this value to change how long to wait before showing nav
          setScrollTimer(newTimer);
        }
      }

      setLastScrollY(currentScrollY);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "floating-nav flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white rounded-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <Button
            key={`button-${idx}`}
            variant="ghost"
            className="transition-all duration-300 rounded-full p-0 hover:bg-white/10"
          >
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              onClick={(e) => handleSmoothScroll(e, navItem.link.slice(1))}
              className="relative text-white hover:text-white items-center flex space-x-1 px-4 py-2 w-full h-full"
            >
              <span className="block mr-1">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          </Button>
        ))}
        <Button onClick={handleGoShopping} className="transition-all duration-300 bg-white text-black border text-sm font-medium relative border-white px-4 py-2 rounded-full hover:bg-neutral-300 hover:text-black">
          <span>Go Shopping</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
