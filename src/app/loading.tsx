import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream-50">
      <p className="font-display text-3xl font-semibold text-ink-900">Ridhi Jain</p>
      <p className="mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.3em] text-clay-600">
        Fat Loss Coach
      </p>
      <Loader2 className="mt-7 h-7 w-7 animate-spin text-clay-600" strokeWidth={2} />
    </div>
  );
}
