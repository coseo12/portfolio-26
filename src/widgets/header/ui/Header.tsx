"use client";

import { useEffect, useState, useCallback, useRef } from "react";

import { cn } from "@/shared/lib/utils";
import { getSectionScrollTarget } from "@/shared/lib/hooks/useCrossfadeScroll";

/** 섹션 ID와 메뉴 표시명 매핑 */
const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

/** 크로스페이드 훅과 동일한 stride 상수 */
const STRIDE_RATIO = 0.45;

/** scrollY 기반으로 현재 활성 섹션 ID를 계산 */
function calcActiveSection(): string {
  if (typeof window === "undefined") return NAV_ITEMS[0].id;
  const vh = window.innerHeight;
  const stride = vh * STRIDE_RATIO;
  const currentScrollY = window.scrollY;

  for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
    const sectionStart = i * stride;
    if (currentScrollY >= sectionStart - vh * 0.1) {
      return NAV_ITEMS[i].id;
    }
  }
  return NAV_ITEMS[0].id;
}

export function Header() {
  // SSR과 동일한 초기값으로 hydration mismatch 방지
  const [activeSection, setActiveSection] = useState<string>("hero");
  const rafId = useRef<number>(0);

  useEffect(() => {
    // 마운트 직후 실제 스크롤 위치로 동기화
    setActiveSection(calcActiveSection());

    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        setActiveSection(calcActiveSection());
        rafId.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionIndex: number) => {
      e.preventDefault();
      window.scrollTo({
        top: getSectionScrollTarget(sectionIndex),
        behavior: "smooth",
      });
    },
    [],
  );

  return (
    <nav
      className={cn(
        "fixed z-50",
        // 모바일: 하단 중앙 가로 배치
        "bottom-4 left-1/2 -translate-x-1/2 flex-row gap-6",
        // 데스크탑: 우측 가장자리 세로 배치
        "sm:bottom-auto sm:left-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:flex-col sm:gap-4",
        "flex items-center sm:items-end",
      )}
    >
      {NAV_ITEMS.map(({ id, label }, index) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleNavClick(e, index)}
          className="group relative flex items-center justify-center"
          aria-label={label}
        >
          {/* 도트 인디케이터 */}
          <span
            className={cn(
              "block rounded-full transition-all duration-300",
              activeSection === id
                ? "h-3 w-3 bg-primary shadow-[0_0_10px_rgba(77,238,234,0.6)]"
                : "h-2 w-2 bg-muted-foreground/40 group-hover:bg-muted-foreground",
            )}
          />

          {/* 툴팁 — 데스크탑: 좌측, 모바일: 숨김 */}
          <span
            className={cn(
              "pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider sm:block",
              "border border-primary/30 bg-primary/15 text-primary backdrop-blur-md",
              "translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100",
            )}
          >
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}
