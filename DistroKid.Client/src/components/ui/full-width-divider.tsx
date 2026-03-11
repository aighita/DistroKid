import { cn } from "@/lib/utils";

export function FullWidthDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-x-0 h-px bg-border", className)}
    />
  );
}
