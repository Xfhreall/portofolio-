import { ProjekParallax } from "./(landing)/project";
import { Hero } from "./(landing)/hero";
import { About } from "./(landing)/about";
import { ProjectShowcase } from "@/app/(landing)/project-show";
import Contact from "./(landing)/contact";
import Footer from "./(landing)/footer";

export default function Home() {
  return (
    <main className="w-full">
      <section className="relative h-screen flex items-center justify-center mx-auto overflow-hidden">
        <Hero />
        <div className="absolute inset-0  bg-gradient-to-t from-white/20 dark:from-black/40 to-transparent pointer-events-none" />
      </section>
      <section className="relative overflow-hidden h-screen">
        <About />
        <div className="absolute inset-0 h-1/5 bg-gradient-to-b from-white/80 dark:from-black/80 to-transparent pointer-events-none" />
      </section>
      <section className="relative">
        <span className="w-full h-32 bg-gradient-to-b absolute inset-0 from-white/80 dark:from-black to-transparent -z-10" />
        <ProjekParallax />
        <ProjectShowcase />
      </section>
      <section className="relative min-h-screen bg-background">
        <Contact />
      </section>
      <section className="relative">
        <Footer />
      </section>
    </main>
  );
}
