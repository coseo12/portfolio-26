import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-background pt-16">
      {/* 상단 그라디언트 페이드 - Projects에서 Contact으로 전환 */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-muted to-transparent"
        aria-hidden="true"
      />

      {/* 콘텐츠 */}
      <div className="relative mx-auto max-w-5xl px-6 py-16 md:px-12 lg:px-24">
        {/* 섹션 헤더 */}
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          CONTACT
        </p>
        <h2 className="mt-2 text-3xl font-medium text-foreground">연락하기</h2>
        <p className="mt-2 max-w-lg text-[15px] text-muted-foreground">
          프로젝트 협업이나 채용에 관심이 있으시다면 편하게 연락 주세요.
        </p>

        {/* 2컬럼: 연락처 + 폼 */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>

        {/* 푸터 */}
        <div className="mt-16 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 서창오. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
