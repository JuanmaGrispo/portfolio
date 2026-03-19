import Image from "next/image";
import HeroSection from "@/features/HeroSection/components/HeroSection";
import ExperienceSection from "@/features/ExperienceSection/components/ExperienceSection";
import ProjectsSection from "@/features/ProjectsSection/components/ProjectsSection";
import ContactSection from "@/features/ContactSection/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
