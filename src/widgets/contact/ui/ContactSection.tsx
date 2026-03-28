"use client";

import { Mail, MapPin } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useScrollReveal } from "@/shared/lib/hooks/useScrollReveal";
import { SITE_CONFIG } from "@/shared/config";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

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
    <section id="contact" className="bg-ink-900 pb-12">
      <div className="ink-fade-bottom h-24" />

      <div
        ref={ref}
        className={cn(
          "max-w-4xl mx-auto px-4 transition-all duration-700",
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
