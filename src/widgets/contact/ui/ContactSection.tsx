"use client";

import { Mail, MapPin } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { GithubIcon } from "@/shared/ui/github-icon";
import { GoldParticles } from "@/shared/ui/gold-particles";
import { useScrollReveal } from "@/shared/lib/hooks/useScrollReveal";
import { SITE_CONFIG } from "@/shared/config";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
    external: false,
  },
  {
    icon: GithubIcon,
    label: "github.com/coseo12",
    href: SITE_CONFIG.github,
    external: true,
  },
  {
    icon: MapPin,
    label: SITE_CONFIG.location,
    href: null,
    external: false,
  },
] as const;

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-ink-900">
      <GoldParticles subtle />
      <div className="ink-fade-bottom h-24" />

      <div
        ref={ref}
        className={cn(
          "flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center max-w-4xl mx-auto px-4 transition-all duration-700",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        <h2 className="font-heading text-gold-gradient text-3xl md:text-4xl text-center mb-12">
          Contact
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {CONTACT_ITEMS.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon className="text-gold-500 w-5 h-5 shrink-0" />
                <span
                  className={cn(
                    "text-moon/80",
                    item.href && "hover:text-gold-400 transition"
                  )}
                >
                  {item.label}
                </span>
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.external ? `${item.label} (새 탭에서 열기)` : item.label}
                  className="glass-card px-6 py-4 rounded-lg flex items-center gap-3 hover:text-gold-400 transition"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.label}
                className="glass-card px-6 py-4 rounded-lg flex items-center gap-3"
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* 푸터 */}
        <footer className="mt-16 pt-8 border-t border-gold-500/10 text-center">
          <p className="text-moon/40 text-sm">&copy; 2026 서창오</p>
          <p className="text-moon/20 text-xs mt-1">
            Crafted with ink and gold
          </p>
        </footer>
      </div>
    </section>
  );
}
