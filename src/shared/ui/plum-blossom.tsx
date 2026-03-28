"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface PlumBlossomProps {
  className?: string;
}

export function PlumBlossom({ className }: PlumBlossomProps) {
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

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 160"
      fill="none"
      className={cn("w-full h-28 md:h-40", className)}
      aria-hidden="true"
    >
      {/* 안개 레이어 (배경) */}
      <ellipse
        cx="400" cy="130" rx="350" ry="20"
        fill="url(#mistGradient)"
        opacity={isVisible ? 0.4 : 0}
        style={{ transition: "opacity 2s ease-in-out" }}
      />
      <ellipse
        cx="250" cy="120" rx="200" ry="15"
        fill="url(#mistGradient)"
        opacity={isVisible ? 0.25 : 0}
        style={{ transition: "opacity 2s ease-in-out 0.3s" }}
      />
      <ellipse
        cx="600" cy="125" rx="180" ry="12"
        fill="url(#mistGradient)"
        opacity={isVisible ? 0.3 : 0}
        style={{ transition: "opacity 2s ease-in-out 0.5s" }}
      />

      {/* 산 실루엣 (뒤) — 먼 산 */}
      <path
        d="M0 140 Q80 90, 160 110 Q200 85, 260 95 Q320 70, 380 100 Q420 80, 480 95 Q540 65, 620 90 Q680 75, 740 100 Q780 90, 800 105 L800 160 L0 160 Z"
        fill="#1f2937"
        opacity={isVisible ? 0.5 : 0}
        style={{ transition: "opacity 1.5s ease-in-out 0.2s" }}
      />

      {/* 산 실루엣 (앞) — 가까운 산 */}
      <path
        d="M0 150 Q60 120, 120 135 Q180 105, 250 125 Q300 100, 370 120 Q430 95, 500 115 Q560 90, 640 110 Q700 95, 760 120 Q790 110, 800 125 L800 160 L0 160 Z"
        fill="#111827"
        opacity={isVisible ? 0.7 : 0}
        style={{ transition: "opacity 1.5s ease-in-out 0.5s" }}
      />

      {/* 금빛 산능선 하이라이트 */}
      <path
        d="M0 150 Q60 120, 120 135 Q180 105, 250 125 Q300 100, 370 120 Q430 95, 500 115 Q560 90, 640 110 Q700 95, 760 120 Q790 110, 800 125"
        stroke="url(#goldLineGradient)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="1200"
        strokeDashoffset={isVisible ? 0 : 1200}
        style={{ transition: "stroke-dashoffset 3s ease-in-out 0.5s" }}
      />

      {/* 매화 가지 (좌측에서 뻗어나옴) */}
      <path
        d="M50 80 C120 60, 180 55, 240 65 C280 70, 310 50, 340 45"
        stroke="#d4a853"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="400"
        strokeDashoffset={isVisible ? 0 : 400}
        style={{ transition: "stroke-dashoffset 2s ease-in-out 1s" }}
      />
      <path
        d="M200 63 C215 40, 235 35, 250 30"
        stroke="#d4a853"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset={isVisible ? 0 : 60}
        style={{ transition: "stroke-dashoffset 1.5s ease-in-out 1.5s" }}
      />

      {/* 매화 꽃 (5장 꽃잎 패턴) */}
      <g
        opacity={isVisible ? 0.7 : 0}
        style={{ transition: "opacity 1s ease-in-out 2s" }}
      >
        {/* 꽃 1 — 가지 끝 */}
        <circle cx="340" cy="45" r="4" fill="#d4a853" opacity="0.3" />
        <circle cx="337" cy="42" r="2" fill="#e8c874" />
        <circle cx="343" cy="42" r="2" fill="#e8c874" />
        <circle cx="335" cy="46" r="2" fill="#e8c874" />
        <circle cx="345" cy="46" r="2" fill="#e8c874" />
        <circle cx="340" cy="49" r="2" fill="#e8c874" />
        <circle cx="340" cy="45" r="1.5" fill="#f0dca0" />

        {/* 꽃 2 — 잔가지 끝 */}
        <circle cx="250" cy="30" r="3.5" fill="#d4a853" opacity="0.3" />
        <circle cx="248" cy="27" r="1.8" fill="#e8c874" />
        <circle cx="253" cy="27" r="1.8" fill="#e8c874" />
        <circle cx="247" cy="32" r="1.8" fill="#e8c874" />
        <circle cx="254" cy="32" r="1.8" fill="#e8c874" />
        <circle cx="250" cy="30" r="1.2" fill="#f0dca0" />

        {/* 꽃 3 — 가지 중간 */}
        <circle cx="170" cy="58" r="3" fill="#d4a853" opacity="0.25" />
        <circle cx="168" cy="56" r="1.5" fill="#e8c874" />
        <circle cx="173" cy="56" r="1.5" fill="#e8c874" />
        <circle cx="167" cy="60" r="1.5" fill="#e8c874" />
        <circle cx="174" cy="60" r="1.5" fill="#e8c874" />
        <circle cx="170" cy="58" r="1" fill="#f0dca0" />
      </g>

      {/* 봉오리 (아직 안 핀 꽃) */}
      <circle
        cx="300" cy="55" r="2"
        fill="#d4a853" opacity={isVisible ? 0.5 : 0}
        style={{ transition: "opacity 0.8s ease-in-out 2.5s" }}
      />
      <circle
        cx="130" cy="65" r="1.8"
        fill="#d4a853" opacity={isVisible ? 0.4 : 0}
        style={{ transition: "opacity 0.8s ease-in-out 2.8s" }}
      />

      {/* 우측 매화 가지 */}
      <path
        d="M750 75 C700 60, 660 55, 620 60 C590 63, 570 48, 550 42"
        stroke="#d4a853"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="300"
        strokeDashoffset={isVisible ? 0 : 300}
        style={{ transition: "stroke-dashoffset 2s ease-in-out 1.2s" }}
      />
      <g
        opacity={isVisible ? 0.6 : 0}
        style={{ transition: "opacity 1s ease-in-out 2.2s" }}
      >
        <circle cx="550" cy="42" r="3" fill="#d4a853" opacity="0.25" />
        <circle cx="548" cy="39" r="1.5" fill="#e8c874" />
        <circle cx="553" cy="39" r="1.5" fill="#e8c874" />
        <circle cx="547" cy="44" r="1.5" fill="#e8c874" />
        <circle cx="554" cy="44" r="1.5" fill="#e8c874" />
        <circle cx="550" cy="42" r="1" fill="#f0dca0" />
      </g>

      {/* 금빛 먼지 파티클 */}
      {[
        { cx: 100, cy: 45, r: 1, delay: "1.5s" },
        { cx: 280, cy: 35, r: 0.8, delay: "1.8s" },
        { cx: 420, cy: 50, r: 1.2, delay: "2s" },
        { cx: 500, cy: 40, r: 0.7, delay: "2.3s" },
        { cx: 650, cy: 48, r: 1, delay: "2.5s" },
        { cx: 720, cy: 55, r: 0.9, delay: "2.7s" },
        { cx: 380, cy: 70, r: 0.6, delay: "2.2s" },
      ].map((p, i) => (
        <circle
          key={i}
          cx={p.cx} cy={p.cy} r={p.r}
          fill="#f0dca0"
          opacity={isVisible ? 0.5 : 0}
          style={{ transition: `opacity 1s ease-in-out ${p.delay}` }}
        />
      ))}

      {/* 그라디언트 정의 */}
      <defs>
        <radialGradient id="mistGradient">
          <stop offset="0%" stopColor="#f5f0e0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f5f0e0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4a853" stopOpacity="0" />
          <stop offset="20%" stopColor="#d4a853" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#e8c874" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#d4a853" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
