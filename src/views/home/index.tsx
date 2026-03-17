import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero";

/** 임시 섹션 데이터 — Hero를 제외한 나머지 섹션 */
const SECTIONS = [
  {
    id: "about",
    label: "About Me Section",
    bg: "bg-sky-200 dark:bg-sky-900",
  },
  {
    id: "projects",
    label: "Projects Section",
    bg: "bg-amber-200 dark:bg-amber-900",
  },
] as const;

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {SECTIONS.map(({ id, label, bg }) => (
          <section
            key={id}
            id={id}
            className={`flex min-h-screen items-center justify-center pt-16 ${bg}`}
          >
            <h2 className="text-4xl font-medium text-foreground">{label}</h2>
          </section>
        ))}
      </main>
    </>
  );
}
