import { AnimateIn } from "@/components/shared/AnimateIn";
import { Converter } from "@/components/shared/Converter";
import { History } from "@/components/shared/History";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10vh] -left-[10vw] w-[40vw] h-[40vh] bg-emerald-300/50 blur-[120px] rounded-full" />
        <div className="absolute top-[20vh] -right-[5vw] w-[30vw] h-[30vh] bg-teal-200/60 blur-[100px] rounded-full" />
        <div className="absolute top-[70vh] left-[5vw] w-[30vw] h-[30vh] bg-amber-200/60 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 pb-6 sm:pt-16">
        <AnimateIn targetClass=".animate-up">
          <header className="text-center mb-6 sm:mb-10 animate-up">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Green<span className="text-emerald-600">Exchange</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Your reliable tool for instant currency conversion and market
              analysis.
            </p>
          </header>

          <section className="animate-up flex justify-center mb-12">
            <Converter />
          </section>

          <History className="animate-up" />
        </AnimateIn>
      </div>
    </main>
  );
}
