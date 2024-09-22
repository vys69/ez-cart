'use client'

import { useEffect } from 'react';

export default function PWAHandler() {
  useEffect(() => {
    const isPWA = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isPWA) {
      window.addEventListener("visibilitychange", function () {
        console.log("Visibility changed");
        if (document.visibilityState === "visible") {
          console.log("APP resumed");
          window.location.reload();
        }
      });
    }
  }, []);

  return null;
}