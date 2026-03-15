import { REVALIDATION_TIME } from "@/constants/currencies";
import { fetchRates } from "@/lib/features/converter/converterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export function useConverterHeader() {
  const dispatch = useAppDispatch();
  const { lastUpdated, status } = useAppSelector((state) => state.converter);

  useEffect(() => {
    function fetchIfNeeded() {
      if (status === "idle") return dispatch(fetchRates());

      const isStale =
        !lastUpdated || Date.now() - lastUpdated > REVALIDATION_TIME;

      if (status === "succeeded" && isStale) return dispatch(fetchRates());
    }

    fetchIfNeeded();
  }, [dispatch, status, lastUpdated]);

  useEffect(() => {
    const handleOnlineChange = () => dispatch(fetchRates());

    window.addEventListener("online", handleOnlineChange);
    window.addEventListener("offline", handleOnlineChange);

    return () => {
      window.removeEventListener("online", handleOnlineChange);
      window.removeEventListener("offline", handleOnlineChange);
    };
  }, [dispatch]);

  const handleRefresh = () => dispatch(fetchRates());

  return {
    lastUpdated,
    handleRefresh,
    status,
  };
}
