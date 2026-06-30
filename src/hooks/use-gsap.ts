"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hook that provides a GSAP context scoped to a container ref.
 * Automatically cleans up animations on unmount.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    contextRef.current = gsap.context(() => {}, containerRef.current);

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return { containerRef, contextRef };
}

/**
 * Hook that creates a ScrollTrigger-powered animation.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animation: (element: T, tl: gsap.core.Timeline) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    animation(ref.current, tl);

    return () => {
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === ref.current)
        .forEach((st) => st.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
