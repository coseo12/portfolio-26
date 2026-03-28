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
      viewBox="0 0 800 120"
      fill="none"
      className={cn("w-full h-24 md:h-32 opacity-30", className)}
      aria-hidden="true"
    >
      {/* 메인 가지 */}
      <path
        d="M100 100 C200 80, 300 40, 500 50 C600 55, 700 30, 750 20"
        stroke="#d4a853"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="800"
        strokeDashoffset={isVisible ? 0 : 800}
        style={{ transition: "stroke-dashoffset 2s ease-in-out" }}
      />
      {/* 작은 가지 1 */}
      <path
        d="M350 55 C370 30, 390 20, 420 15"
        stroke="#d4a853"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset={isVisible ? 0 : 100}
        style={{ transition: "stroke-dashoffset 1.5s ease-in-out 0.5s" }}
      />
      {/* 작은 가지 2 */}
      <path
        d="M550 48 C570 70, 600 80, 630 75"
        stroke="#d4a853"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset={isVisible ? 0 : 100}
        style={{ transition: "stroke-dashoffset 1.5s ease-in-out 0.8s" }}
      />
      {/* 꽃봉오리 */}
      <circle
        cx="420"
        cy="15"
        r="3"
        fill="#d4a853"
        opacity={isVisible ? 0.6 : 0}
        style={{ transition: "opacity 0.8s ease-in-out 1.5s" }}
      />
      <circle
        cx="630"
        cy="75"
        r="2.5"
        fill="#e8c874"
        opacity={isVisible ? 0.5 : 0}
        style={{ transition: "opacity 0.8s ease-in-out 1.8s" }}
      />
      <circle
        cx="500"
        cy="50"
        r="3.5"
        fill="#d4a853"
        opacity={isVisible ? 0.4 : 0}
        style={{ transition: "opacity 0.8s ease-in-out 2s" }}
      />
    </svg>
  );
}
