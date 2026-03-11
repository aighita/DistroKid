import { cn } from "@/lib/utils";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const positionClasses: Record<Position, string> = {
  "top-left": "-top-px -left-px",
  "top-right": "-top-px -right-px",
  "bottom-left": "-bottom-px -left-px",
  "bottom-right": "-bottom-px -right-px",
};

export function DecorIcon({
  position,
  className,
}: {
  position: Position;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute z-10 flex items-center justify-center text-border select-none pointer-events-none",
        positionClasses[position],
        className
      )}
    >
      +
    </span>
  );
}
