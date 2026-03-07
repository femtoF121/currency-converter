"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CURRENCIES } from "@/constants/currencies";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppSelector } from "@/lib/hooks";
import { CurrencyCode } from "@/types/currency";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { CurrencySelect } from "../CurrencySelect";

export function ConvertorContent() {
  const [amount, setAmount] = useState("1");
  const debouncedAmount = +useDebounce(amount, 500);

  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("UAH");

  const { rates, status } = useAppSelector((state) => state.currency);

  const result = useMemo(() => {
    const fromRate = rates[from];
    const toRate = rates[to];

    if (!fromRate || !toRate) return 0;

    const crossRate = toRate / fromRate;
    return Number((+debouncedAmount * crossRate).toFixed(2));
  }, [debouncedAmount, from, to, rates]);

  const resultRef = useAnimatedCounter(result);

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
      <div className="flex items-center gap-2 px-4 py-2 mt-4 rounded-lg bg-amber-50 border border-amber-200">
        <TrendingUp className="text-amber-600" />
        <p className="text-sm text-amber-800 font-medium">
          Rate: 1 {from} =
          {` ${Number((rates[to] || 0) / (rates[from] || 1)).toFixed(4)} ${to}`}
        </p>
      </div>
    </CardContent>
  );
}
