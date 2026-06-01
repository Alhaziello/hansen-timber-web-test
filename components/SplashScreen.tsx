"use client";

import { useState, useEffect, useRef } from "react";

/**
 * SplashScreen component
 * Renders a full-screen, high-z-index background video overlay.
 * Uses sessionStorage and class injections on <html> to eliminate homepage flashing.
 */
export default function SplashScreen() {
  const [isRendered, setIsRendered] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const hasFinishedRef = useRef(false);

  const handleFinished = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    // Start fade out transition
    setIsVisible(false);
    
    // Remove active class to fade in homepage, and set seen class
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("splash-active");
      document.documentElement.classList.add("splash-seen");
    }

    // Set sessionStorage key
    try {
      sessionStorage.setItem("hasSeenSplash", "true");
    } catch (e) {}

    // Unmount from DOM after transition completes (700ms duration)
    setTimeout(() => {
      setIsRendered(false);
    }, 700);
  };

  useEffect(() => {
    // Check if session storage indicates the splash screen was already seen
    let hasSeenSplash = false;
    try {
      hasSeenSplash = !!sessionStorage.getItem("hasSeenSplash");
    } catch (e) {}

    if (hasSeenSplash) {
      // Immediately unmount to free resources, CSS display:none takes care of blocking initial rendering
      setIsRendered(false);
      setIsVisible(false);
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("splash-active");
        document.documentElement.classList.add("splash-seen");
      }
    } else {
      // Ensure splash-active class is added to html if JS executes before browser render
      if (typeof document !== "undefined") {
        document.documentElement.classList.add("splash-active");
      }

      // Safety backup timeout to clear splash screen if video gets blocked/stuck
      const backupTimer = setTimeout(() => {
        handleFinished();
      }, 6000);

      return () => clearTimeout(backupTimer);
    }
  }, []);

  if (!isRendered) return null;

  return (
    <div
      id="splash-screen"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleFinished}
        className="w-full h-full object-cover"
      >
        <source src="/videos/hansen-logo.webm" type="video/webm" />
        <source src="/videos/hansen-logo-muted.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
