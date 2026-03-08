import { AnalyticChart } from "@/components/shared/AnalyticChart";
import { AnimateIn } from "@/components/shared/AnimateIn";
import { PeriodSelector } from "@/components/shared/PeriodSelector";
import { StatsCard } from "@/components/shared/StatsCard";
import { fetchHistoryData } from "@/lib/api/analytics";
import { AnalyticsRange } from "@/types/analytics";
import { CurrencyCode } from "@/types/currency";
import {
  ArrowLeft,
  ArrowLeftRight,
  Calendar,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ pair: string }>;
  searchParams: Promise<{ range?: AnalyticsRange }>;
}

export default async function AnalyticsPage({ params, searchParams }: Props) {
  const { pair } = await params;
  const { range } = await searchParams;
  const [from, to] = pair.split("-") as [CurrencyCode, CurrencyCode];

  if (!from || !to) return notFound();

  const chartData = await fetchHistoryData(from, to, range);

  const rates = chartData.map((d) => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10vh] -left-[10vw] w-[40vw] h-[40vh] bg-emerald-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10vh] -right-[5vw] w-[30vw] h-[30vh] bg-amber-200/30 blur-[100px] rounded-full" />
      </div>
      <AnimateIn className="space-y-6" targetClass=".animate-up">
        <header className="animate-up flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 pb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-all group"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              />
              <span className="text-sm font-bold uppercase tracking-wider">
                Back to Converter
              </span>
            </Link>
            <h1 className="text-4xl font-black text-slate-800 flex items-center gap-3">
              {from} <ArrowLeftRight className="text-slate-300" /> {to}
            </h1>
          </div>
          <PeriodSelector currentRange={range} />
        </header>

        <section className="animate-up bg-white p-6 rounded-3xl border shadow-sm h-110">
          <AnalyticChart data={chartData} />
        </section>

        <section className="animate-up grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatsCard
            label="Highest Rate"
            value={maxRate}
            icon={<TrendingUp className="text-emerald-500" />}
          />
          <StatsCard
            label="Average Rate"
            value={avgRate}
            icon={<Calendar className="text-amber-500" />}
          />
          <StatsCard
            label="Lowest Rate"
            value={minRate}
            icon={<TrendingDown className="text-red-500" />}
          />
        </section>
      </AnimateIn>
    </main>
  );
}
