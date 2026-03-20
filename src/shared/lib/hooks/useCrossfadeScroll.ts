"use client";

import { useEffect, useRef, useState, useMemo } from "react";

/** 크로스페이드 전환 비율 상수 */
const FADE_RATIO = 0.15; // 15vh
const HOLD_RATIO = 0.30; // 30vh
const STRIDE_RATIO = HOLD_RATIO + FADE_RATIO; // 45vh (섹션 간 거리)

interface UseCrossfadeScrollReturn {
  /** 섹션에 적용할 style (opacity, transform, pointerEvents) */
  style: React.CSSProperties;
  /** 스태거용 progress (0: fadeIn 시작, 1: fadeIn 완료) */
  progress: number;
  /** 섹션이 보이는지 여부 */
  isActive: boolean;
  /** 현재 scrollY 값 (Hero 스크롤 인디케이터 등에 활용) */
  scrollY: number;
}

/**
 * 크로스페이드 스크롤 훅
 * 모든 섹션을 fixed로 쌓고, scrollY 기반으로 opacity/transform을 계산한다.
 * 이전 섹션이 fadeOut되는 동안 다음 섹션이 동시에 fadeIn되는 크로스페이드 전환.
 */
export function useCrossfadeScroll(
  sectionIndex: number,
  totalSections: number,
): UseCrossfadeScrollReturn {
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId.current = 0;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // 초기 scrollY 계산
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const result = useMemo(() => {
    // SSR 안전 처리
    const vh = typeof window !== "undefined" ? window.innerHeight : 1;
    const fadeDistance = vh * FADE_RATIO;
    const holdDistance = vh * HOLD_RATIO;
    const stride = vh * STRIDE_RATIO;

    const isFirst = sectionIndex === 0;
    const isLast = sectionIndex === totalSections - 1;

    // 각 섹션의 스크롤 경계 계산
    const fadeInStart = sectionIndex * stride - fadeDistance;
    const fadeInEnd = sectionIndex * stride;
    const holdEnd = sectionIndex * stride + holdDistance;
    const fadeOutStart = holdEnd;
    const fadeOutEnd = holdEnd + fadeDistance;

    // opacity 계산
    let opacity: number;
    if (isFirst) {
      // 첫 번째 섹션: fadeIn 없이 시작, fadeOut만
      if (scrollY <= holdEnd) opacity = 1;
      else if (scrollY <= fadeOutEnd) opacity = 1 - (scrollY - fadeOutStart) / fadeDistance;
      else opacity = 0;
    } else if (isLast) {
      // 마지막 섹션: fadeIn만, fadeOut 없음
      if (scrollY <= fadeInStart) opacity = 0;
      else if (scrollY <= fadeInEnd) opacity = (scrollY - fadeInStart) / fadeDistance;
      else opacity = 1;
    } else {
      // 중간 섹션: fadeIn + fadeOut 모두
      if (scrollY <= fadeInStart) opacity = 0;
      else if (scrollY <= fadeInEnd) opacity = (scrollY - fadeInStart) / fadeDistance;
      else if (scrollY <= holdEnd) opacity = 1;
      else if (scrollY <= fadeOutEnd) opacity = 1 - (scrollY - fadeOutStart) / fadeDistance;
      else opacity = 0;
    }

    // transform: 페이드 중 살짝 이동
    let translateY = 0;
    if (!isFirst && scrollY >= fadeInStart && scrollY < fadeInEnd) {
      translateY = 20 * (1 - opacity);
    }
    if (!isLast && scrollY > fadeOutStart && scrollY <= fadeOutEnd) {
      translateY = -15 * (1 - opacity);
    }

    // 스태거용 progress: fadeIn 구간에서 0 -> 1
    let progress: number;
    if (isFirst) {
      // Hero는 항상 표시 상태에서 시작
      progress = 1;
    } else {
      progress = Math.max(0, Math.min(1, (scrollY - fadeInStart) / fadeDistance));
    }

    const style: React.CSSProperties = {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0 ? "auto" : "none",
    };

    return {
      style,
      progress,
      isActive: opacity > 0,
      scrollY,
    };
  }, [scrollY, sectionIndex, totalSections]);

  return result;
}

/** 스크롤 스페이서 높이(vh) 계산 */
export function getSpacerHeightVh(totalSections: number): number {
  // 마지막 섹션의 hold 시작점 + 뷰포트 높이
  return (totalSections - 1) * (HOLD_RATIO + FADE_RATIO) * 100 + HOLD_RATIO * 100 + 100;
}

/** 섹션 인덱스에 해당하는 스크롤 위치(px)를 반환 — Header 네비게이션에 사용 */
export function getSectionScrollTarget(sectionIndex: number): number {
  if (typeof window === "undefined") return 0;
  const vh = window.innerHeight;
  const stride = vh * STRIDE_RATIO;
  return sectionIndex * stride;
}
