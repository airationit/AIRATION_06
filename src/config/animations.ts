// Shared animation configuration for consistency across the site

export const transitions = {
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  smooth: {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.6,
  },
  slow: {
    type: "tween" as const,
    ease: [0.25, 0.1, 0.25, 1],
    duration: 1.2,
  },
} as const;

export const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
} as const;
