"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface GoldenWaveProps {
  className?: string;
}

export function GoldenWave({ className }: GoldenWaveProps) {
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
      {/* 안개 레이어 */}
      <ellipse
        cx="400" cy="100" rx="380" ry="25"
        fill="url(#waveMistGradient)"
        opacity={isVisible ? 0.35 : 0}
        style={{ transition: "opacity 2s ease-in-out" }}
      />
      <ellipse
        cx="200" cy="110" rx="220" ry="18"
        fill="url(#waveMistGradient)"
        opacity={isVisible ? 0.2 : 0}
        style={{ transition: "opacity 2s ease-in-out 0.3s" }}
      />
      <ellipse
        cx="650" cy="105" rx="180" ry="15"
        fill="url(#waveMistGradient)"
        opacity={isVisible ? 0.25 : 0}
        style={{ transition: "opacity 2s ease-in-out 0.5s" }}
      />

      {/* 물결 1 — 뒤 (가장 먼 파도) */}
      <path
        d="M0 120 Q50 95, 100 110 Q150 125, 200 105 Q250 85, 320 100 Q390 115, 450 95 Q510 75, 580 95 Q650 115, 720 100 Q760 92, 800 105 L800 160 L0 160 Z"
        fill="#1f2937"
        opacity={isVisible ? 0.4 : 0}
        style={{ transition: "opacity 1.5s ease-in-out 0.2s" }}
      />

      {/* 물결 2 — 중간 */}
      <path
        d="M0 135 Q70 105, 140 120 Q210 135, 280 112 Q350 90, 430 108 Q510 126, 580 105 Q650 85, 730 110 Q770 120, 800 115 L800 160 L0 160 Z"
        fill="#1f2937"
        opacity={isVisible ? 0.6 : 0}
        style={{ transition: "opacity 1.5s ease-in-out 0.5s" }}
      />

      {/* 물결 3 — 앞 (가장 가까운 파도) */}
      <path
        d="M0 145 Q60 125, 130 135 Q200 145, 270 128 Q340 112, 420 125 Q500 138, 570 120 Q640 102, 720 125 Q770 135, 800 130 L800 160 L0 160 Z"
        fill="#111827"
        opacity={isVisible ? 0.8 : 0}
        style={{ transition: "opacity 1.5s ease-in-out 0.8s" }}
      />

      {/* 금빛 물결 하이라이트 — 앞 물결 능선 */}
      <path
        d="M0 145 Q60 125, 130 135 Q200 145, 270 128 Q340 112, 420 125 Q500 138, 570 120 Q640 102, 720 125 Q770 135, 800 130"
        stroke="url(#waveGoldGradient)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="1200"
        strokeDashoffset={isVisible ? 0 : 1200}
        style={{ transition: "stroke-dashoffset 3s ease-in-out 1s" }}
      />

      {/* 금빛 물결 하이라이트 — 중간 물결 능선 */}
      <path
        d="M0 135 Q70 105, 140 120 Q210 135, 280 112 Q350 90, 430 108 Q510 126, 580 105 Q650 85, 730 110 Q770 120, 800 115"
        stroke="url(#waveGoldGradient)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeDasharray="1200"
        strokeDashoffset={isVisible ? 0 : 1200}
        style={{ transition: "stroke-dashoffset 3.5s ease-in-out 0.8s" }}
      />

      {/* 물보라 파티클 */}
      {[
        { cx: 90, cy: 108, r: 1.2, delay: "1.5s" },
        { cx: 230, cy: 100, r: 0.9, delay: "1.8s" },
        { cx: 310, cy: 95, r: 1.0, delay: "2.0s" },
        { cx: 440, cy: 102, r: 0.7, delay: "2.2s" },
        { cx: 530, cy: 92, r: 1.1, delay: "1.7s" },
        { cx: 620, cy: 88, r: 0.8, delay: "2.4s" },
        { cx: 710, cy: 105, r: 1.0, delay: "2.1s" },
        { cx: 170, cy: 115, r: 0.6, delay: "2.6s" },
        { cx: 480, cy: 118, r: 0.8, delay: "2.3s" },
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
        <radialGradient id="waveMistGradient">
          <stop offset="0%" stopColor="#f5f0e0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f5f0e0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="waveGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4a853" stopOpacity="0" />
          <stop offset="15%" stopColor="#d4a853" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#e8c874" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#f0dca0" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#e8c874" stopOpacity="0.7" />
          <stop offset="85%" stopColor="#d4a853" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
