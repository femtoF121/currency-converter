"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CURRENCIES, INITIAL_FROM, INITIAL_TO } from "@/constants/currencies";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useDebounce } from "@/hooks/useDebounce";
import { addHistoryItem } from "@/lib/features/history/historySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { calculateConversion } from "@/lib/utils";
import { CurrencyCode } from "@/types/currency";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CurrencySelect } from "../CurrencySelect";

export function ConvertorContent() {
  const [amount, setAmount] = useState("1");
  const debouncedAmount = +useDebounce(amount, 500);

  const [from, setFrom] = useState<CurrencyCode>(INITIAL_FROM);
  const [to, setTo] = useState<CurrencyCode>(INITIAL_TO);

  const { rates, status } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();

  const result = useMemo(
    () => calculateConversion(debouncedAmount, rates[from], rates[to]),
    [debouncedAmount, from, to, rates],
  );

  const resultRef = useAnimatedCounter(result);

  const handleSaveToHistory = () => {
    dispatch(addHistoryItem({ from, to, amount: debouncedAmount, result }));
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <CardContent>
      <div className="flex items-end gap-4">
        <Field>
          <FieldLabel
            className="text-sm font-semibold text-slate-500 uppercase"
            htmlFor="convert-from"
          >
            From
          </FieldLabel>
          {status === "loading" ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Input
              id="convert-from"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={(e) => +e.target.value === 0 && setAmount("")}
              onBlur={(e) => e.target.value === "" && setAmount("1")}
            />
          )}
        </Field>
        <CurrencySelect
          items={CURRENCIES.filter(({ code }) => code !== to)}
          value={from}
          onValueChange={setFrom}
        />
      </div>

      <div className="relative py-6 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSwap}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full h-12 w-12 border-2 shadow-lg hover:bg-white hover:border-amber-400 hover:text-amber-500 transition-all z-10 group"
        >
          <ArrowUpDown className="size-5 group-hover:rotate-180 transition-all duration-500" />
        </Button>
        <div className="w-full border-t-2 border-dashed" />
      </div>

      <div className="flex items-end gap-4">
        <Field className="text-emerald-600">
          <FieldLabel
            className="text-sm font-semibold uppercase"
            htmlFor="convert-to"
          >
            To
          </FieldLabel>
          {status === "loading" ? (
            <Skeleton className="h-9 w-full" />
          ) : (
            <Input
              ref={resultRef}
              className="font-semibold border-emerald-300"
              id="convert-to"
              type="number"
              value={result}
              readOnly
            />
          )}
        </Field>
        <CurrencySelect
          items={CURRENCIES.filter(({ code }) => code !== from)}
          value={to}
          onValueChange={setTo}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-md bg-amber-50 outline outline-amber-200">
          <TrendingUp className="text-amber-600" />
          <p className="text-sm text-amber-800 font-medium">
            Rate: 1 {from} =
            {` ${Number((rates[to] || 0) / (rates[from] || 1)).toFixed(4)} ${to}`}
          </p>
          <Button
            size="sm"
            variant="link"
            className="ml-auto p-0 h-auto text-amber-600"
            asChild
          >
            <Link href={`/analytics/${from}-${to}`}>See more</Link>
          </Button>
        </div>
        <Button variant="outline" size="lg" onClick={handleSaveToHistory}>
          Save To History
        </Button>
      </div>
    </CardContent>
  );
}
