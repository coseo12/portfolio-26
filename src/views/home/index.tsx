import { Header } from "@/widgets/header";
import { HeroSection } from "@/widgets/hero";
import { AboutSection } from "@/widgets/about";
import { ProjectsSection } from "@/widgets/projects";
import { ContactSection } from "@/widgets/contact";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
