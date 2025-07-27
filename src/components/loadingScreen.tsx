// @ts-nocheck
"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  Video,
  Circle,
  Play,
  Heart,
  Star,
  Music,
  Camera,
  Mic,
} from "lucide-react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: Readonly<LoadingScreenProps>) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 3500; // 3.5 seconds
    const interval = 50; // Update every 50ms
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const doodleVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 180 },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Doodles */}
          <div className="absolute inset-0">
            {/* Top Left Doodles */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-20 left-20"
            >
              <motion.div
                variants={doodleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Play className="w-8 h-8 text-gray-300" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-40 left-40"
              style={{ animationDelay: "1s" }}
            >
              <motion.div
                variants={doodleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Heart className="w-6 h-6 text-gray-400" />
              </motion.div>
            </motion.div>

            {/* Top Right Doodles */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-32 right-32"
              style={{ animationDelay: "0.5s" }}
            >
              <motion.div
                variants={doodleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Star className="w-7 h-7 text-gray-300" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-16 right-16"
              style={{ animationDelay: "1.5s" }}
            >
              <motion.div
                variants={doodleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <Camera className="w-8 h-8 text-gray-400" />
              </motion.div>
            </motion.div>

            {/* Bottom Left Doodles */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute bottom-32 left-24"
              style={{ animationDelay: "2s" }}
            >
              <motion.div
                variants={doodleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Music className="w-6 h-6 text-gray-300" />
              </motion.div>
            </motion.div>

            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute bottom-16 left-48"
              style={{ animationDelay: "0.8s" }}
            >
              <motion.div
                variants={doodleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 2, duration: 0.8 }}
              >
                <Mic className="w-7 h-7 text-gray-400" />
              </motion.div>
            </motion.div>

            {/* Bottom Right Doodles */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute bottom-24 right-20"
              style={{ animationDelay: "1.2s" }}
            >
              <motion.div
                variants={doodleVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <Circle className="w-5 h-5 text-gray-300" />
              </motion.div>
            </motion.div>

            {/* Hand-drawn style SVG doodles */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1200 800"
            >
              {/* Squiggly line top */}
              <motion.path
                d="M100 150 Q200 100 300 150 T500 150"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200"
                variants={drawVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
              />

              {/* Circle doodle */}
              <motion.circle
                cx="900"
                cy="200"
                r="30"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200"
                variants={drawVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
              />

              {/* Squiggly line bottom */}
              <motion.path
                d="M700 600 Q800 650 900 600 T1100 600"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200"
                variants={drawVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.5 }}
              />

              {/* Star doodle */}
              <motion.path
                d="M200 650 L210 620 L240 620 L218 600 L225 570 L200 585 L175 570 L182 600 L160 620 L190 620 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200"
                variants={drawVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 2 }}
              />
            </svg>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center justify-center space-x-4"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Video className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center"
                >
                  <Circle className="w-3 h-3 text-white fill-white" />
                </motion.div>
              </div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-4xl font-bold text-black"
                >
                  Vidloom
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-gray-600"
                >
                  Where Stories Come Alive
                </motion.p>
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="text-lg text-gray-700 font-medium">
                {progress < 30 && "Preparing your experience..."}
                {progress >= 30 &&
                  progress < 60 &&
                  "Loading amazing content..."}
                {progress >= 60 && progress < 90 && "Almost ready..."}
                {progress >= 90 && "Welcome to Vidloom!"}
              </div>

              {/* Progress Bar */}
              <div className="w-80 mx-auto">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Loading</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-black rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-center space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
