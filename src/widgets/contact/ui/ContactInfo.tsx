import { Mail, Phone, MapPin, Github } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}

const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: Mail,
    label: "이메일",
    value: "momo_12@naver.com",
    href: "mailto:momo_12@naver.com",
  },
  {
    icon: Phone,
    label: "연락처",
    value: "010-7139-7568",
    href: "tel:010-7139-7568",
  },
  {
    icon: MapPin,
    label: "위치",
    value: "서울 광진구",
    href: null,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/coseo12",
    href: "https://github.com/coseo12",
  },
];

export function ContactInfo() {
  return (
    <div className="rounded-lg border border-[--glass-border] p-6" style={{ backgroundColor: "var(--glass-bg)" }}>
      <div className="space-y-4">
        {CONTACT_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <item.icon className="size-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-foreground transition-colors hover:text-primary"
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-foreground">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
