import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero";
import { AboutSection } from "@/widgets/about";
import { ProjectsSection } from "@/widgets/projects";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </main>
    </>
  );
}
