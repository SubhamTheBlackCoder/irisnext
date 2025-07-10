"use client";
import { useState, useEffect } from "react";
import SplashScreen from "./splashscreen";

export default function SplashLayout({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) setShowSplash(false);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("splashShown", "true");
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        children
      )}
    </>
  );
}
