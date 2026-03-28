"use client";

import { useState, useEffect } from "react";

const SECTION_IDS = ["#about", "#skills", "#projects", "#contact"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibilityMap = new Map<string, number>();

    SECTION_IDS.forEach((href) => {
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap.set(href, entry.intersectionRatio);

          // 가장 많이 보이는 섹션을 활성으로 설정
          let maxRatio = 0;
          let maxHref = "";
          visibilityMap.forEach((ratio, h) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxHref = h;
            }
          });

          if (maxRatio > 0) {
            setActiveSection(maxHref);
          }
        },
        { threshold: [0, 0.1, 0.3, 0.5, 0.7, 1] }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return activeSection;
}
