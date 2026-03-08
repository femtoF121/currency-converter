"use client";

import { Button } from "@/components/ui/button";
import { clearHistory } from "@/lib/features/history/historySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Clock, Trash } from "lucide-react";
import { useRef } from "react";
import { HistoryItem } from "./HistoryItem";

export function History({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.history.items);
  const handleClearHistory = () => {
    dispatch(clearHistory());
  };

  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (items.length === 0) return;

    const newItem = listRef.current?.querySelector("li:first-child");

    if (newItem) {
      gsap.from(newItem, {
        opacity: 0,
        height: 0,
        paddingBottom: 0,
        paddingTop: 0,
        ease: "power1.out",
        duration: 0.4,
        onComplete: () => newItem.classList.add("transition-all"),
      });
    }
  }, [items]);

  return (
    <section className={cn("max-w-xl mx-auto p-4", className)}>
      <div className="flex items-center justify-between pb-2 border-b-2 border-slate-200">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          Last Conversions
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500"
          onClick={handleClearHistory}
        >
          Clear History <Trash />
        </Button>
      </div>
      <ul ref={listRef} className="mt-4 space-y-4">
        {items.length > 0 ? (
          items.map((item) => <HistoryItem key={item.id} item={item} />)
        ) : (
          <div className="text-center py-6 border-2 border-dashed rounded-xl text-slate-500 border-slate-200">
            <Clock className="mx-auto size-8 mb-3" />
            <p className="font-medium">No conversion history yet</p>
          </div>
        )}
      </ul>
    </section>
  );
}
