import TechStrip from "@/components/layout/TechStrip";
import HeroSection from "@/features/HeroSection/components/HeroSection";
import ExperienceSection from "@/features/ExperienceSection/components/ExperienceSection";
import ProjectsSection from "@/features/ProjectsSection/components/ProjectsSection";
import ContactSection from "@/features/ContactSection/components/ContactSection";

export default function Home() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <main className="relative flex-1">
        <HeroSection />
        <ExperienceSection />
        <TechStrip />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>

  );
}
