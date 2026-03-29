import { Header } from "@/widgets/header/ui";
import { HeroSection } from "@/widgets/hero/ui";
import { AboutSection } from "@/widgets/about/ui";
import { SkillsSection } from "@/widgets/skills/ui";
import { ProjectsSection } from "@/widgets/projects/ui";
import { ContactSection } from "@/widgets/contact/ui";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
