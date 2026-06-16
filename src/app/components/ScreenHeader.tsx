import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function ScreenHeader({
  title,
  onBack,
  action,
}: {
  title: string;
  onBack?: () => void;
  action?: ReactNode;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 bg-background/90 px-5 py-4 backdrop-blur-md">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="grid h-10 w-10 place-items-center rounded-full bg-accent text-foreground transition-colors hover:bg-muted active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <h2 className="flex-1 truncate">{title}</h2>
      {action}
    </div>
  );
}
