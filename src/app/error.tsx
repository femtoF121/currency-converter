"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center p-6 sm:p-12 text-center space-y-4 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
      <div className="p-3 bg-red-100 rounded-full text-red-600">
        <AlertCircle size={32} />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-800">
          Something went wrong
        </h2>
        <p className="text-slate-500 max-w-xs mx-auto text-sm">
          We couldn&lsquo;t load the analytics data. This might be a temporary
          API issue.
        </p>
      </div>

      <Button
        onClick={() => reset()}
        variant="outline"
        className="gap-2 border-slate-300 hover:bg-white"
      >
        <RefreshCw size={16} />
        Try again
      </Button>
    </div>
  );
}
