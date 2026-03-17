"use client";

import { useEffect, useState, useCallback } from "react";

import { cn } from "@/shared/lib/utils";

/** 섹션 ID와 메뉴 표시명 매핑 */
const NAV_ITEMS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
] as const;

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  /** IntersectionObserver로 현재 뷰포트에 보이는 섹션을 추적 */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 뷰포트의 절반 이상 보이면 활성 상태로 전환
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.5 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full",
        "h-16 border-b border-border",
        "bg-background/80 backdrop-blur-sm",
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* 로고 */}
        <span className="text-lg font-medium text-foreground">Portfolio</span>

        {/* 내비게이션 메뉴 */}
        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={cn(
                "text-sm transition-colors",
                activeSection === id
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
