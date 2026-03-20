"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  /** IntersectionObserver threshold (기본: 0.15) */
  threshold?: number;
  /** 한번 보이면 계속 visible 유지 (기본: true) */
  once?: boolean;
}

/**
 * IntersectionObserver 기반 뷰포트 진입 감지 훅
 * 섹션이 뷰포트에 진입하면 isVisible을 true로 전환
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {},
) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // once 옵션이면 한 번 보인 뒤 관찰 중단
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}
