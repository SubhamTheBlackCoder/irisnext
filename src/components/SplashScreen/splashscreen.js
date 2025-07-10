import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 500); // Wait for exit animation to complete
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Modified dot variants without vertical movement
  const dotVariants = {
    initial: { y: 0, opacity: 0 },
    animate: (i) => ({
      opacity: 1,
      y: [0, -12, 0],
      transition: {
        delay: 0.8 + i * 0.2,
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  // Modified logo variants without bounce or rotation
  const logoVariants = {
    hidden: { 
      scale: 0.95, 
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo Container with smooth fade and scale */}
          <motion.div
            className="logo-container"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.img 
              src="/og-image.jpg" 
              alt="Irisnex Logo" 
              className="splash-logo"
            />
          </motion.div>

          {/* Loading Dots with smooth pulsing effect */}
          <motion.div className="loading-dots">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="dot"
                variants={dotVariants}
                initial="initial"
                animate="animate"
                custom={i}
              />
            ))}
          </motion.div>

          {/* Powered By Text with fade-in effect */}
          <motion.div
            className="powered-by"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Powered by <span className="irisnex-text">Irisnex</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;