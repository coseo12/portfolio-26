"use client";

import { useEffect, useRef, useState, useCallback, type RefObject } from "react";

interface UseStickyScriptionOptions {
  /** 페이드 인 구간 [시작, 끝] (기본: [0, 0.2]) — null이면 처음부터 표시 */
  fadeIn?: [number, number] | null;
  /** 페이드 아웃 구간 [시작, 끝] (기본: [0.8, 1.0]) — null이면 페이드 아웃 없음 */
  fadeOut?: [number, number] | null;
}

interface UseStickyScriptionReturn {
  /** 래퍼(wrapper) div에 연결할 ref */
  wrapperRef: RefObject<HTMLDivElement | null>;
  /** 콘텐츠에 적용할 style (opacity, transform) */
  contentStyle: { opacity: number; transform: string };
  /** 현재 스크롤 진행도 (0~1) */
  progress: number;
}

/** progress 값과 fadeIn/fadeOut 구간에 따라 opacity, transform을 계산 */
function getOpacityAndTransform(
  progress: number,
  fadeIn: [number, number] | null,
  fadeOut: [number, number] | null,
): { opacity: number; transform: string } {
  let opacity = 1;
  let transform = "translateY(0)";

  // 페이드 인 구간 처리
  if (fadeIn !== null) {
    const [start, end] = fadeIn;
    if (progress < start) {
      return { opacity: 0, transform: `translateY(30px)` };
    }
    if (progress < end) {
      const t = (progress - start) / (end - start);
      opacity = t;
      transform = `translateY(${30 * (1 - t)}px)`;
      return { opacity, transform };
    }
  }

  // 페이드 아웃 구간 처리
  if (fadeOut !== null) {
    const [start, end] = fadeOut;
    if (progress > end) {
      return { opacity: 0, transform: `translateY(-20px)` };
    }
    if (progress > start) {
      const t = (progress - start) / (end - start);
      opacity = 1 - t;
      transform = `translateY(${-20 * t}px)`;
      return { opacity, transform };
    }
  }

  // 홀드 구간 — 완전히 보이는 상태
  return { opacity: 1, transform: "translateY(0)" };
}

/**
 * Sticky Section + Scroll Progress 기반 애니메이션 훅
 * 래퍼 요소의 스크롤 진행도를 계산하여 opacity/transform을 반환
 */
export function useStickySection(
  options?: UseStickyScriptionOptions,
): UseStickyScriptionReturn {
  const { fadeIn = [0, 0.2], fadeOut = [0.8, 1.0] } = options ?? {};

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      const wrapperEl = wrapperRef.current;
      if (wrapperEl) {
        const rect = wrapperEl.getBoundingClientRect();
        const wrapperHeight = wrapperEl.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        const scrollableDistance = wrapperHeight - viewportHeight;

        // scrollableDistance가 0 이하면 progress를 0 또는 1로 고정
        if (scrollableDistance <= 0) {
          setProgress(scrolled >= 0 ? 1 : 0);
        } else {
          setProgress(Math.max(0, Math.min(1, scrolled / scrollableDistance)));
        }
      }
      rafId.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // 초기 progress 계산
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  const contentStyle = getOpacityAndTransform(progress, fadeIn, fadeOut);

  return { wrapperRef, contentStyle, progress };
}
