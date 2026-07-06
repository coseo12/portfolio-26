"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface ConstellationProps {
  className?: string;
}

// 별자리 좌표 — 북두칠성을 단순화한 형태
const CONSTELLATION_STARS = [
  { cx: 120, cy: 60, r: 2 },
  { cx: 175, cy: 48, r: 1.6 },
  { cx: 230, cy: 55, r: 2.2 },
  { cx: 280, cy: 72, r: 1.8 },
  { cx: 335, cy: 65, r: 1.5 },
  { cx: 380, cy: 90, r: 2 },
  { cx: 350, cy: 115, r: 1.7 },
] as const;

// 흩어진 잔별
const SCATTERED_STARS = [
  { cx: 60, cy: 100, r: 0.8, delay: "1.8s" },
  { cx: 210, cy: 110, r: 0.7, delay: "2s" },
  { cx: 300, cy: 35, r: 0.9, delay: "2.2s" },
  { cx: 430, cy: 45, r: 0.8, delay: "2.4s" },
  { cx: 470, cy: 120, r: 0.7, delay: "2.1s" },
  { cx: 560, cy: 40, r: 0.9, delay: "2.5s" },
  { cx: 740, cy: 110, r: 0.8, delay: "2.7s" },
  { cx: 90, cy: 30, r: 0.6, delay: "2.6s" },
] as const;

export function Constellation({ className }: ConstellationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(svg);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  // 별자리 연결선 경로
  const constellationPath = CONSTELLATION_STARS.map(
    (s, i) => `${i === 0 ? "M" : "L"}${s.cx} ${s.cy}`
  ).join(" ");

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 160"
      fill="none"
      className={cn("w-full h-28 md:h-40", className)}
      aria-hidden="true"
    >
      {/* 궤도 타원 (우측) — 태양을 중심으로 도는 행성 궤도 */}
      <ellipse
        cx="620" cy="80" rx="140" ry="48"
        stroke="url(#orbitGradient)"
        strokeWidth="0.8"
        strokeDasharray="880"
        strokeDashoffset={isVisible ? 0 : 880}
        style={{ transition: "stroke-dashoffset 3s ease-in-out 0.5s" }}
      />
      <ellipse
        cx="620" cy="80" rx="90" ry="30"
        stroke="url(#orbitGradient)"
        strokeWidth="0.6"
        strokeDasharray="560"
        strokeDashoffset={isVisible ? 0 : 560}
        style={{ transition: "stroke-dashoffset 2.5s ease-in-out 0.8s" }}
      />
      <ellipse
        cx="620" cy="80" rx="45" ry="15"
        stroke="url(#orbitGradient)"
        strokeWidth="0.5"
        strokeDasharray="280"
        strokeDashoffset={isVisible ? 0 : 280}
        style={{ transition: "stroke-dashoffset 2s ease-in-out 1.1s" }}
      />

      {/* 중심 태양 */}
      <circle
        cx="620" cy="80" r="6"
        fill="url(#sunGradient)"
        opacity={isVisible ? 0.9 : 0}
        style={{ transition: "opacity 1.5s ease-in-out 1.3s" }}
      />
      <circle
        cx="620" cy="80" r="12"
        fill="url(#sunGlowGradient)"
        opacity={isVisible ? 0.4 : 0}
        style={{ transition: "opacity 2s ease-in-out 1.5s" }}
      />

      {/* 궤도 위 행성들 */}
      <circle
        cx="530" cy="105" r="2.5"
        fill="#e8c874"
        opacity={isVisible ? 0.8 : 0}
        style={{ transition: "opacity 1s ease-in-out 1.8s" }}
      />
      <circle
        cx="700" cy="62" r="1.8"
        fill="#d4a853"
        opacity={isVisible ? 0.7 : 0}
        style={{ transition: "opacity 1s ease-in-out 2s" }}
      />
      <circle
        cx="660" cy="93" r="1.4"
        fill="#f0dca0"
        opacity={isVisible ? 0.7 : 0}
        style={{ transition: "opacity 1s ease-in-out 2.2s" }}
      />

      {/* 별자리 연결선 (좌측) */}
      <path
        d={constellationPath}
        stroke="url(#goldLineGradientConstellation)"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeDasharray="450"
        strokeDashoffset={isVisible ? 0 : 450}
        style={{ transition: "stroke-dashoffset 2.5s ease-in-out 1s" }}
      />

      {/* 별자리 별 */}
      {CONSTELLATION_STARS.map((s, i) => (
        <g key={i}>
          <circle
            cx={s.cx} cy={s.cy} r={s.r * 2.2}
            fill="#e8c874"
            opacity={isVisible ? 0.12 : 0}
            style={{
              transition: `opacity 1s ease-in-out ${1.2 + i * 0.15}s`,
            }}
          />
          <circle
            cx={s.cx} cy={s.cy} r={s.r}
            fill="#f0dca0"
            opacity={isVisible ? 0.85 : 0}
            style={{
              transition: `opacity 1s ease-in-out ${1.2 + i * 0.15}s`,
            }}
          />
        </g>
      ))}

      {/* 흩어진 잔별 */}
      {SCATTERED_STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.cx} cy={s.cy} r={s.r}
          fill="#f0dca0"
          opacity={isVisible ? 0.45 : 0}
          style={{ transition: `opacity 1s ease-in-out ${s.delay}` }}
        />
      ))}

      {/* 유성 궤적 */}
      <path
        d="M480 25 L440 55"
        stroke="url(#meteorGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="50"
        strokeDashoffset={isVisible ? 0 : 50}
        style={{ transition: "stroke-dashoffset 1.2s ease-out 2.8s" }}
      />

      {/* 그라디언트 정의 */}
      <defs>
        <linearGradient
          id="orbitGradient"
          x1="0%" y1="0%" x2="100%" y2="0%"
        >
          <stop offset="0%" stopColor="#d4a853" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#d4a853" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#d4a853" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="sunGradient">
          <stop offset="0%" stopColor="#f0dca0" />
          <stop offset="100%" stopColor="#d4a853" />
        </radialGradient>
        <radialGradient id="sunGlowGradient">
          <stop offset="0%" stopColor="#e8c874" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e8c874" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="goldLineGradientConstellation"
          x1="0%" y1="0%" x2="100%" y2="0%"
        >
          <stop offset="0%" stopColor="#d4a853" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#e8c874" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4a853" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient
          id="meteorGradient"
          x1="0%" y1="0%" x2="100%" y2="100%"
        >
          <stop offset="0%" stopColor="#f0dca0" stopOpacity="0" />
          <stop offset="100%" stopColor="#f0dca0" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
