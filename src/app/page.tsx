import { ProjekParallax } from "./(landing)/project";
import { Hero } from "./(landing)/hero";
import { About } from "./(landing)/about";
import { Progress } from "./(landing)/progress";

export default function Home() {
  return (
    <main className="w-full">
      <section className="relative h-screen flex items-center justify-center mx-auto overflow-hidden">
        <Hero />
        <div className="absolute inset-0  bg-gradient-to-t from-white/20 dark:from-black/40 to-transparent pointer-events-none" />
      </section>
      <section className="relative overflow-hidden">
        <About />
        <div className="absolute inset-0 h-1/5 bg-gradient-to-b from-white/80 dark:from-black/80 to-transparent pointer-events-none" />
      </section>
      <Progress />
      <ProjekParallax />
    </main>
  );
}
