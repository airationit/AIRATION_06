"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveDotsProps {
  className?: string;
  /** Distance between dots in px. */
  spacing?: number;
  /** Radius of the pointer's influence in px. */
  radius?: number;
  /** Base dot color (rgb triplet). */
  baseColor?: [number, number, number];
  /** Accent color dots fade toward near the pointer (rgb triplet). */
  accentColor?: [number, number, number];
}

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
}

/**
 * A canvas field of dots that reacts to the pointer: nearby dots brighten,
 * grow, shift toward the brand accent, and gently push away — creating a
 * living "surrounding" effect. Falls back to a soft static grid when the
 * user prefers reduced motion or is on a coarse pointer.
 */
export function InteractiveDots({
  className,
  spacing = 34,
  radius = 170,
  baseColor = [148, 163, 184],
  accentColor = [37, 99, 235],
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const interactive = fine && !reduced;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    // Pointer state (smoothed toward target for a fluid trail).
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const build = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * spacing;
          const y = offsetY + r * spacing;
          dots.push({ ox: x, oy: y, x, y });
        }
      }
    };

    const [br, bg, bb] = baseColor;
    const [ar, ag, ab] = accentColor;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Ease pointer toward its target.
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;

      const r2 = radius * radius;

      for (const dot of dots) {
        let influence = 0;

        if (interactive) {
          const dx = dot.ox - pointer.x;
          const dy = dot.oy - pointer.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < r2) {
            const dist = Math.sqrt(d2) || 0.0001;
            influence = 1 - dist / radius;
            // Push the dot outward from the pointer.
            const push = influence * 14;
            dot.x += ((dot.ox + (dx / dist) * push) - dot.x) * 0.2;
            dot.y += ((dot.oy + (dy / dist) * push) - dot.y) * 0.2;
          } else {
            dot.x += (dot.ox - dot.x) * 0.12;
            dot.y += (dot.oy - dot.y) * 0.12;
          }
        }

        if (!interactive || influence <= 0) {
          continue;
        }

        const eased = influence * influence;
        const size = 1 + eased * 2.4;
        const alpha = eased * 0.9;
        const cr = Math.round(br + (ar - br) * eased);
        const cg = Math.round(bg + (ag - bg) * eased);
        const cb = Math.round(bb + (ab - bb) * eased);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo on strongly lit dots.
        if (eased > 0.35) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${ar},${ag},${ab},${eased * 0.12})`;
          ctx.arc(dot.x, dot.y, size + 6 * eased, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    build();

    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onLeave);
      raf = requestAnimationFrame(render);
    } else {
      // Single static paint.
      render();
      cancelAnimationFrame(raf);
      raf = 0;
    }

    const ro = new ResizeObserver(() => {
      build();
      if (!interactive) {
        cancelAnimationFrame(raf);
        render();
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, [spacing, radius, baseColor, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  );
}
