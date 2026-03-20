"use client";

import { useCrossfadeScroll } from "@/shared/lib/hooks/useCrossfadeScroll";

import { ContactInfo } from "./ContactInfo";

export function ContactSection() {
  const { style, progress } = useCrossfadeScroll(3, 4);

  // 스태거: 섹션 헤더 -> 연락처 -> 푸터
  const isHeaderVisible = progress > 0.3;
  const isContactVisible = progress > 0.5;
  const isFooterVisible = progress > 0.7;

  return (
    <div
      id="contact"
      className="fixed inset-0 z-[14] flex items-center"
      style={style}
    >
      <div className="w-full will-change-[transform,opacity]">
        <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-24">
          <div className="rounded-xl border border-[--glass-border] p-8" style={{ backgroundColor: "var(--glass-bg)", boxShadow: "var(--glass-shadow), var(--glass-highlight)" }}>
            {/* 섹션 헤더 */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: isHeaderVisible ? 1 : 0,
                transform: isHeaderVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                CONTACT
              </p>
              <h2 className="mt-2 text-3xl font-medium text-foreground">연락하기</h2>
              <p className="mt-2 max-w-lg text-[15px] text-muted-foreground">
                프로젝트 협업이나 채용에 관심이 있으시다면 편하게 연락 주세요.
              </p>
            </div>

            {/* 연락처 */}
            <div
              className="mt-12 transition-all duration-700 ease-out"
              style={{
                opacity: isContactVisible ? 1 : 0,
                transform: isContactVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <ContactInfo />
            </div>

            {/* 푸터 */}
            <div
              className="mt-16 border-t border-border pt-6 text-center transition-all duration-700 ease-out"
              style={{
                opacity: isFooterVisible ? 1 : 0,
                transform: isFooterVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <p className="text-sm text-muted-foreground">
                &copy; 2026 서창오. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
