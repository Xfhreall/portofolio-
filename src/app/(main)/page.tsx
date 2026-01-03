import { About } from "../(landing)/about";

export default function Home() {
  return (
    <main className="w-full relative">
      <section className="relative overflow-hidden h-screen">
        <About />
        <div className="absolute inset-0 h-1/5 bg-gradient-to-b from-white/80 dark:from-black/80 to-transparent pointer-events-none" />
      </section>
    </main>
  );
}
