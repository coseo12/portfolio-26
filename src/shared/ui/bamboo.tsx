"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface BambooProps {
  className?: string;
}

export function Bamboo({ className }: BambooProps) {
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

  // 대나무 마디를 표현하는 짧은 수평선
  const renderNode = (x: number, y: number, width: number, delay: string) => (
    <line
      x1={x - width / 2} y1={y} x2={x + width / 2} y2={y}
      stroke="#e8c874"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity={isVisible ? 0.6 : 0}
      style={{ transition: `opacity 0.6s ease-in-out ${delay}` }}
    />
  );

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
        cx="400" cy="130" rx="350" ry="22"
        fill="url(#bambooMistGradient)"
        opacity={isVisible ? 0.3 : 0}
        style={{ transition: "opacity 2s ease-in-out" }}
      />
      <ellipse
        cx="150" cy="125" rx="150" ry="15"
        fill="url(#bambooMistGradient)"
        opacity={isVisible ? 0.2 : 0}
        style={{ transition: "opacity 2s ease-in-out 0.3s" }}
      />
      <ellipse
        cx="680" cy="128" rx="140" ry="14"
        fill="url(#bambooMistGradient)"
        opacity={isVisible ? 0.25 : 0}
        style={{ transition: "opacity 2s ease-in-out 0.5s" }}
      />

      {/* 바닥 풀/이끼 */}
      <path
        d="M0 150 Q100 142, 200 148 Q300 140, 400 146 Q500 138, 600 145 Q700 140, 800 148 L800 160 L0 160 Z"
        fill="#1f2937"
        opacity={isVisible ? 0.5 : 0}
        style={{ transition: "opacity 1.5s ease-in-out 0.3s" }}
      />

      {/* === 좌측 대나무 그룹 === */}

      {/* 줄기 1 (좌측 메인) */}
      <line
        x1="120" y1="150" x2="120" y2="20"
        stroke="#d4a853"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="130"
        strokeDashoffset={isVisible ? 0 : 130}
        style={{ transition: "stroke-dashoffset 2s ease-in-out 0.5s" }}
      />
      {/* 줄기 1 마디 */}
      {renderNode(120, 120, 8, "1.2s")}
      {renderNode(120, 85, 7, "1.4s")}
      {renderNode(120, 50, 6, "1.6s")}

      {/* 줄기 2 (좌측 보조) */}
      <line
        x1="145" y1="150" x2="145" y2="40"
        stroke="#d4a853"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="110"
        strokeDashoffset={isVisible ? 0 : 110}
        style={{ transition: "stroke-dashoffset 2s ease-in-out 0.7s" }}
      />
      {renderNode(145, 115, 6, "1.3s")}
      {renderNode(145, 75, 5, "1.5s")}

      {/* 줄기 3 (좌측 뒤, 짧은) */}
      <line
        x1="100" y1="150" x2="100" y2="60"
        stroke="#d4a853"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={isVisible ? 0.5 : 0}
        strokeDasharray="90"
        strokeDashoffset={isVisible ? 0 : 90}
        style={{ transition: "stroke-dashoffset 1.8s ease-in-out 0.6s, opacity 1s ease-in-out 0.6s" }}
      />

      {/* 좌측 잎 */}
      <g
        opacity={isVisible ? 0.7 : 0}
        style={{ transition: "opacity 1s ease-in-out 1.8s" }}
      >
        <path d="M120 50 C105 40, 85 38, 70 42" stroke="#e8c874" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M120 48 C108 35, 92 30, 78 32" stroke="#d4a853" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M145 40 C130 28, 112 25, 95 30" stroke="#e8c874" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M120 85 C100 78, 82 80, 68 85" stroke="#d4a853" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M145 75 C160 65, 175 62, 185 65" stroke="#e8c874" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      </g>

      {/* === 우측 대나무 그룹 === */}

      {/* 줄기 1 (우측 메인) */}
      <line
        x1="680" y1="150" x2="680" y2="25"
        stroke="#d4a853"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="125"
        strokeDashoffset={isVisible ? 0 : 125}
        style={{ transition: "stroke-dashoffset 2s ease-in-out 0.6s" }}
      />
      {renderNode(680, 118, 8, "1.3s")}
      {renderNode(680, 80, 7, "1.5s")}
      {renderNode(680, 45, 6, "1.7s")}

      {/* 줄기 2 (우측 보조) */}
      <line
        x1="655" y1="150" x2="655" y2="35"
        stroke="#d4a853"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="115"
        strokeDashoffset={isVisible ? 0 : 115}
        style={{ transition: "stroke-dashoffset 2s ease-in-out 0.8s" }}
      />
      {renderNode(655, 112, 6, "1.4s")}
      {renderNode(655, 70, 5, "1.6s")}

      {/* 줄기 3 (우측 뒤, 짧은) */}
      <line
        x1="700" y1="150" x2="700" y2="55"
        stroke="#d4a853"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={isVisible ? 0.5 : 0}
        strokeDasharray="95"
        strokeDashoffset={isVisible ? 0 : 95}
        style={{ transition: "stroke-dashoffset 1.8s ease-in-out 0.7s, opacity 1s ease-in-out 0.7s" }}
      />

      {/* 우측 잎 */}
      <g
        opacity={isVisible ? 0.7 : 0}
        style={{ transition: "opacity 1s ease-in-out 2s" }}
      >
        <path d="M680 45 C695 35, 715 33, 730 37" stroke="#e8c874" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M680 43 C692 30, 708 26, 722 28" stroke="#d4a853" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M655 35 C670 23, 688 20, 705 25" stroke="#e8c874" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M680 80 C700 73, 718 75, 732 80" stroke="#d4a853" strokeWidth="0.8" strokeLinecap="round" fill="none" />
        <path d="M655 70 C640 60, 625 58, 615 62" stroke="#e8c874" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      </g>

      {/* 금빛 파티클 */}
      {[
        { cx: 110, cy: 35, r: 0.8, delay: "2.2s" },
        { cx: 155, cy: 55, r: 1.0, delay: "2.4s" },
        { cx: 85, cy: 70, r: 0.7, delay: "2.6s" },
        { cx: 400, cy: 130, r: 1.2, delay: "2.0s" },
        { cx: 350, cy: 125, r: 0.6, delay: "2.3s" },
        { cx: 450, cy: 128, r: 0.8, delay: "2.5s" },
        { cx: 670, cy: 30, r: 0.9, delay: "2.3s" },
        { cx: 640, cy: 50, r: 1.1, delay: "2.5s" },
        { cx: 715, cy: 65, r: 0.7, delay: "2.7s" },
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
        <radialGradient id="bambooMistGradient">
          <stop offset="0%" stopColor="#f5f0e0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f5f0e0" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
