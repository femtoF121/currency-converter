import { HistoryItem as HistoryItemType } from "@/types/history";
import { ArrowRight } from "lucide-react";

interface HistoryItemProps {
  item: HistoryItemType;
}

export function HistoryItem({ item }: HistoryItemProps) {
  const { from, to, amount, result, timestamp } = item;

  return (
    <li className="p-4 rounded-lg bg-white border border-l-6 border-l-emerald-500 flex items-center justify-between group hover:translate-x-3 hover:bg-emerald-50">
      <div className="flex items-center gap-8">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase">
            From
          </span>
          <p className="text-lg leading-1 font-black">
            {amount}{" "}
            <span className="text-sm font-bold text-slate-700">{from}</span>
          </p>
        </div>
        <ArrowRight className="size-5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
        <div>
          <span className="text-xs font-bold text-emerald-500 uppercase">
            To
          </span>
          <p className="text-lg leading-1 font-black text-emerald-700">
            {result}{" "}
            <span className="text-sm font-bold text-emerald-600/90">{to}</span>
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs font-bold text-slate-500">
          {new Date(timestamp).toLocaleDateString()}
        </p>
        <p className="text-sm font-mono font-medium text-slate-700">
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </li>
  );
}
