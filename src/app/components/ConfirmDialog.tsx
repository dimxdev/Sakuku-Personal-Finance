import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  danger,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 px-6" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-3xl bg-background p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="mx-auto grid h-14 w-14 place-items-center rounded-full"
          style={{ background: (danger ? "#ef4444" : "#10b981") + "1a", color: danger ? "#ef4444" : "#10b981" }}
        >
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h3 className="mt-4">{title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{message}</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={onCancel} variant="outline" className="h-12 flex-1 rounded-2xl">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="h-12 flex-1 rounded-2xl text-white"
            style={{ background: danger ? "#ef4444" : "#10b981" }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
