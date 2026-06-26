import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashIntro({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show the logo text after the mindmap finishes drawing (1.8s)
    const logoTimer = setTimeout(() => setShowLogo(true), 1800);
    
    // Start fading out the entire splash screen at 3.0s
    const fadeTimer = setTimeout(() => setIsVisible(false), 3000);
    
    // Completely unmount the component and notify parent at 3.5s
    const completeTimer = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Nodes for the mind map animation
  const nodes = [
    { cx: 200, cy: 150, r: 8 }, // Top left
    { cx: 300, cy: 100, r: 6 }, // Top right
    { cx: 150, cy: 250, r: 7 }, // Bottom left
    { cx: 350, cy: 280, r: 9 }, // Bottom right
    { cx: 250, cy: 330, r: 6 }, // Bottom center
    { cx: 100, cy: 180, r: 5 }, // Far left
    { cx: 400, cy: 180, r: 7 }, // Far right
  ];

  // Lines connecting the center (250, 200) to the nodes
  const lines = nodes.map(n => `M 250 200 L ${n.cx} ${n.cy}`);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0f172a',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Animated Mind Map SVG */}
          <div style={{ position: 'relative', width: 500, height: 400 }}>
            <svg width="100%" height="100%" viewBox="0 0 500 400">
              
              {/* Draw Lines */}
              {lines.map((d, i) => (
                <motion.path
                  key={`line-${i}`}
                  d={d}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                />
              ))}

              {/* Draw Outer Nodes */}
              {nodes.map((n, i) => (
                <motion.circle
                  key={`node-${i}`}
                  cx={n.cx}
                  cy={n.cy}
                  r={n.r}
                  fill="#60a5fa"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + (i * 0.1), type: 'spring' }}
                />
              ))}

              {/* Draw Center Node */}
              <motion.circle
                cx="250"
                cy="200"
                r="16"
                fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, type: 'spring' }}
                style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.8))' }}
              />
            </svg>

            {/* Logo Text that fades in over the center */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  style={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '100%'
                  }}
                >
                  <h1 style={{ color: 'white', fontSize: 36, fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
                    Mindmaps <span style={{ color: '#3b82f6' }}>by Testbook</span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
