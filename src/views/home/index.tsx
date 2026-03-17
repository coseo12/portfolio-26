import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero";
import { AboutSection } from "@/widgets/about";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />

        {/* 임시 Projects 섹션 — 추후 구현 예정 */}
        <section
          id="projects"
          className="flex min-h-screen items-center justify-center bg-amber-200 pt-16 dark:bg-amber-900"
        >
          <h2 className="text-4xl font-medium text-foreground">
            Projects Section
          </h2>
        </section>
      </main>
    </>
  );
}
