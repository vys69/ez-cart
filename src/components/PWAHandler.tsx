'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PWAHandler() {
  const router = useRouter();

  useEffect(() => {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isPWA) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          console.log("APP resumed");
          const setupSkipped = localStorage.getItem("setupSkipped");
          const currency = localStorage.getItem("currency");
          const state = localStorage.getItem("state");

          if (setupSkipped === "true" || (currency && state)) {
            router.push('/cart');
          } else {
            router.push('/onboarding');
          }
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }
  }, [router]);

  return null;
}