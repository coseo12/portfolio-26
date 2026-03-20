"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/**
 * window.scrollY를 반환하는 훅
 * passive 리스너 + requestAnimationFrame으로 성능 최적화
 */
export function useScrollPosition(): number {
  // 초기값을 지연 평가로 설정하여 effect 내 setState를 방지
  const [scrollY, setScrollY] = useState(() =>
    typeof window !== "undefined" ? window.scrollY : 0,
  );
  const rafId = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
      rafId.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  return scrollY;
}
