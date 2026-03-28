"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { NAV_ITEMS } from "@/shared/config";
import { useScrollPosition } from "@/shared/lib/hooks/useScrollPosition";
import { useActiveSection } from "@/shared/lib/hooks/useActiveSection";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const activeSection = useActiveSection();

  const isScrolled = scrollY > 50;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-ink-900/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* 로고 */}
        <button
          onClick={scrollToTop}
          className="flex h-10 w-10 items-center justify-center border border-gold-500 font-serif text-gold-500 transition-colors hover:bg-gold-500/10"
          aria-label="맨 위로 이동"
        >
          CO
        </button>

        {/* 데스크톱 네비게이션 */}
        <ul className="hidden gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "pb-1 text-sm transition-colors",
                  activeSection === item.href
                    ? "border-b-2 border-gold-500 text-gold-400"
                    : "text-moon/70 hover:text-gold-400"
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 버튼 */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-moon md:hidden"
          aria-label="메뉴 열기"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* 모바일 전체화면 오버레이 */}
      {isMobileMenuOpen && (
        <div role="dialog" aria-label="메뉴" className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-ink-900/95 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-6 top-6 text-moon"
            aria-label="메뉴 닫기"
          >
            <X className="h-6 w-6" />
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-2xl text-moon transition-colors hover:text-gold-400"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
