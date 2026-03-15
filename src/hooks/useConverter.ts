import { INITIAL_FROM, INITIAL_TO } from "@/constants/currencies";
import { useDebounce } from "@/hooks/useDebounce";
import { addHistoryItem } from "@/lib/features/history/historySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { calculateConversion } from "@/lib/utils";
import { CurrencyCode } from "@/types/currency";
import { useMemo, useState } from "react";

export function useConverter() {
  const [amount, setAmount] = useState("1");
  const debouncedAmount = +useDebounce(amount, 500);
  const [from, setFrom] = useState<CurrencyCode>(INITIAL_FROM);
  const [to, setTo] = useState<CurrencyCode>(INITIAL_TO);

  const dispatch = useAppDispatch();
  const { rates, status } = useAppSelector((state) => state.converter);

  const result = useMemo(
    () => calculateConversion(debouncedAmount, rates[from], rates[to]),
    [debouncedAmount, from, to, rates],
  );

  const currentRate = useMemo(() => {
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 0;
    return Number(toRate / fromRate).toFixed(4);
  }, [from, to, rates]);

  const handleSaveToHistory = () => {
    dispatch(addHistoryItem({ from, to, amount: debouncedAmount, result }));
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return {
    amount,
    setAmount,
    from,
    setFrom,
    to,
    setTo,
    result,
    status,
    currentRate,
    handleSaveToHistory,
    handleSwap,
  };
}
