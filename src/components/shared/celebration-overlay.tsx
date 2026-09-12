"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CelebrationOverlayProps {
  duration?: number; // duration in seconds (default 15)
  onComplete?: () => void;
}

// Celebration color palette tailored to Hirance brand + festive tones
const CELEBRATION_COLORS = [
  "#2563eb", // Hirance Brand Blue
  "#38bdf8", // Sky Cyan
  "#f59e0b", // Radiant Gold
  "#fcd34d", // Soft Gold
  "#f43f5e", // Festive Coral
  "#8b5cf6", // Vibrant Violet
  "#10b981", // Emerald
  "#ffffff", // Crisp White
];

// Play a pleasant, gentle festive chime chord using standard Web Audio API
const playCelebrationChime = () => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    // Pleasant celebratory chord: C5, E5, G5, B5, C6 (Major 7th arpeggio)
    const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const startTime = ctx.currentTime + index * 0.09;
      const duration = 1.8;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  } catch {
    // Gracefully ignore any browser autoplay restriction
  }
};

export function CelebrationOverlay({
  duration = 15,
  onComplete,
}: CelebrationOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [shockwaves, setShockwaves] = useState<number[]>([0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiInstanceRef = useRef<confetti.CreateTypes | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Stable reference to onComplete to prevent useEffect re-triggering on parent re-renders
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // 1. Audio and Shockwaves trigger across the 15-second span
  useEffect(() => {
    playCelebrationChime();

    const shockwaveTimers = [
      setTimeout(() => setShockwaves((prev) => [...prev, 1]), 600),
      setTimeout(() => setShockwaves((prev) => [...prev, 2]), 1400),
      setTimeout(() => setShockwaves((prev) => [...prev, 3]), 4500),
      setTimeout(() => setShockwaves((prev) => [...prev, 4]), 8200),
      setTimeout(() => setShockwaves((prev) => [...prev, 5]), 11800),
    ];

    return () => {
      shockwaveTimers.forEach(clearTimeout);
    };
  }, []);

  // 2. High-impact 15-Second Multi-Phase Confetti & Fireworks Blast
  useEffect(() => {
    if (!canvasRef.current) return;

    const totalMs = duration * 1000;
    const startTime = Date.now();
    const endTime = startTime + totalMs;
    let isStopped = false;

    // Create standalone canvas-confetti instance tied to full-screen overlay canvas
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });
    confettiInstanceRef.current = myConfetti;

    // Custom star shape
    const starShape = confetti.shapeFromPath({
      path: "M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z",
    });

    // Dual Corner Cannons Blast
    const fireCornerCannons = (particleCount = 85) => {
      if (isStopped) return;
      myConfetti({
        particleCount,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.85 },
        colors: CELEBRATION_COLORS,
        shapes: ["circle", "square", starShape],
        startVelocity: 68,
        gravity: 0.8,
        scalar: 1.1,
        ticks: 300,
      });
      myConfetti({
        particleCount,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.85 },
        colors: CELEBRATION_COLORS,
        shapes: ["circle", "square", starShape],
        startVelocity: 68,
        gravity: 0.8,
        scalar: 1.1,
        ticks: 300,
      });
    };

    // Center Boom Explosion ("Boom")
    const fireCenterBoom = (particleCount = 120) => {
      if (isStopped) return;
      myConfetti({
        particleCount,
        spread: 140,
        origin: { x: 0.5, y: 0.4 },
        colors: CELEBRATION_COLORS,
        shapes: ["circle", "square", starShape],
        startVelocity: 48,
        ticks: 280,
        gravity: 0.72,
        scalar: 1.25,
      });
    };

    // Single skyward firework pop ("Splash & Pop")
    const fireSkywardPop = () => {
      if (isStopped) return;
      const randomX = 0.15 + Math.random() * 0.7;
      const randomY = 0.12 + Math.random() * 0.38;

      myConfetti({
        particleCount: 65,
        angle: 90,
        spread: 110,
        origin: { x: randomX, y: randomY },
        colors: CELEBRATION_COLORS,
        shapes: ["circle", starShape],
        startVelocity: 36,
        ticks: 240,
        gravity: 0.75,
        scalar: 1.15,
      });

      // Secondary sparkle echo
      setTimeout(() => {
        if (isStopped) return;
        myConfetti({
          particleCount: 40,
          angle: 90,
          spread: 85,
          origin: { x: randomX + (Math.random() - 0.5) * 0.08, y: randomY },
          colors: ["#f59e0b", "#38bdf8", "#ffffff", "#f43f5e"],
          startVelocity: 26,
          ticks: 200,
        });
      }, 130);
    };

    const timeouts: NodeJS.Timeout[] = [];

    // Schedule cannons across the 15-second duration
    const cannonWaves = [0, 300, 4200, 8000, 11500];
    cannonWaves.forEach((time) => {
      timeouts.push(
        setTimeout(() => {
          fireCornerCannons(time === 0 ? 90 : 75);
        }, time)
      );
    });

    // Schedule center booms
    const centerBooms = [450, 4400, 8200, 11800];
    centerBooms.forEach((time) => {
      timeouts.push(
        setTimeout(() => {
          fireCenterBoom(time === 450 ? 130 : 90);
        }, time)
      );
    });

    // Schedule cascading skyward fireworks across 15 seconds
    const fireworksTimes = [
      900, 1700, 2600, 3500, 5000, 5900, 6800, 7600, 9000, 9900, 10700,
      12400, 13300, 14100,
    ];
    fireworksTimes.forEach((delay) => {
      timeouts.push(setTimeout(fireSkywardPop, delay));
    });

    // Gentle confetti flutter loop
    const frame = () => {
      if (isStopped) return;
      const timeLeft = endTime - Date.now();
      if (timeLeft <= 0) return;

      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.72 },
        colors: CELEBRATION_COLORS,
        startVelocity: 32,
        gravity: 0.6,
      });
      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.72 },
        colors: CELEBRATION_COLORS,
        startVelocity: 32,
        gravity: 0.6,
      });

      animationFrameRef.current = requestAnimationFrame(frame);
    };

    animationFrameRef.current = requestAnimationFrame(frame);

    // EXACT STOP at duration (15 seconds)
    const autoDismissTimer = setTimeout(() => {
      isStopped = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsVisible(false);

      // Give 600ms for visual exit fade-out then unmount and notify parent
      setTimeout(() => {
        if (confettiInstanceRef.current) {
          confettiInstanceRef.current.reset();
        }
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }, 600);
    }, totalMs);

    return () => {
      isStopped = true;
      timeouts.forEach(clearTimeout);
      clearTimeout(autoDismissTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (confettiInstanceRef.current) {
        confettiInstanceRef.current.reset();
      }
    };
  }, [duration]); // Only duration in dependency array! Never restarts on re-renders!

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }}
          className="fixed inset-0 z-[120] pointer-events-none overflow-hidden"
        >
          {/* Confetti & Fireworks Canvas - full screen, 100% click-through */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* ─────────────────────────────────────────────────────────────
              RADIAL SHOCKWAVE BOOMS ("BOOM & SPLASH") OVER HERO
             ───────────────────────────────────────────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            {shockwaves.map((waveId) => (
              <motion.div
                key={waveId}
                initial={{ scale: 0.2, opacity: 0.85 }}
                animate={{ scale: [0.2, 3], opacity: [0.85, 0] }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                className="absolute w-[320px] h-[320px] sm:w-[560px] sm:h-[560px] rounded-full border border-blue-400/40 bg-radial from-blue-500/15 via-sky-400/5 to-transparent blur-md"
              />
            ))}

            {/* Radiant Ambient Flash on Launch */}
            <motion.div
              initial={{ opacity: 0.9, scale: 0.9 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-tr from-blue-500/20 via-amber-400/15 to-transparent blur-3xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
