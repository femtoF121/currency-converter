import { AnimateIn } from "@/components/shared/AnimateIn";
import { Converter } from "@/components/shared/Converter";

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-300/50 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-teal-200/60 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        <AnimateIn targetClass=".animate-up">
          <header className="text-center mb-16 animate-up">
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Green<span className="text-emerald-600">Exchange</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Your reliable tool for instant currency conversion and market
              analysis.
            </p>
          </header>

          <section className="animate-up flex justify-center mb-24">
            <Converter />
          </section>

          <section className="animate-up space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-800">
                Last Conversion
              </h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            History
          </section>
        </AnimateIn>
      </div>
    </main>
  );
}
