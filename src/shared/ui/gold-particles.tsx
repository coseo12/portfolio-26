"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/shared/lib/utils";

const GOLD_COLORS = ["#d4a853", "#e8c874", "#f0dca0"];
const DESKTOP_COUNT = 80;
const TABLET_COUNT = 30;
const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 768;

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  maxOpacity: number;
  phase: number;
  phaseSpeed: number;
  swingAmplitude: number;
}

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: 1 + Math.random() * 2,
    color: GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)],
    speed: 0.15 + Math.random() * 0.35,
    opacity: 0,
    maxOpacity: 0.2 + Math.random() * 0.6,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: 0.005 + Math.random() * 0.01,
    swingAmplitude: 15 + Math.random() * 25,
  };
}

interface GoldParticlesProps {
  className?: string;
}

export function GoldParticles({ className }: GoldParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const reducedMotionRef = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    if (width <= MOBILE_BREAKPOINT) {
      particlesRef.current = [];
      return;
    }

    const count = width <= TABLET_BREAKPOINT ? TABLET_COUNT : DESKTOP_COUNT;
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(width, height)
    );

    // reduced-motion일 때 정적 표시용 초기 opacity 설정
    if (reducedMotionRef.current) {
      particlesRef.current = particlesRef.current.slice(0, 15);
      particlesRef.current.forEach((p) => {
        p.opacity = p.maxOpacity * 0.5;
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles(window.innerWidth, window.innerHeight);
    };

    resize();

    // reduced-motion일 때 정적 렌더링 후 종료
    if (reducedMotionRef.current) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.phase += p.phaseSpeed;
        p.y -= p.speed;
        p.x += Math.sin(p.phase) * 0.3;

        // 페이드 인/아웃: 뷰포트 상하 20% 구간에서
        const fadeZone = h * 0.2;
        if (p.y < fadeZone) {
          p.opacity = Math.max(0, (p.y / fadeZone) * p.maxOpacity);
        } else if (p.y > h - fadeZone) {
          p.opacity = Math.max(
            0,
            ((h - p.y) / fadeZone) * p.maxOpacity
          );
        } else {
          p.opacity = p.maxOpacity;
        }

        // 화면 밖으로 나가면 하단에서 재생성
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
          p.opacity = 0;
        }

        ctx.beginPath();
        ctx.arc(
          p.x + Math.sin(p.phase) * p.swingAmplitude,
          p.y,
          p.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 z-20", className)}
      aria-hidden="true"
    />
  );
}
