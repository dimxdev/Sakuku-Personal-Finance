import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Switch } from "./ui/switch";

export function MenuSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      {title && <p className="mb-2 px-1 text-sm text-muted-foreground">{title}</p>}
      <div className="overflow-hidden rounded-3xl border border-border bg-card">{children}</div>
    </div>
  );
}

interface RowBase {
  icon: LucideIcon;
  iconColor?: string;
  label: string;
  description?: string;
}

export function MenuLink({
  icon: Icon,
  iconColor = "#10b981",
  label,
  description,
  value,
  badge,
  danger,
  onClick,
}: RowBase & {
  value?: string;
  badge?: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left transition-colors last:border-0 hover:bg-accent active:bg-muted"
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
        style={{ background: (danger ? "#ef4444" : iconColor) + "1a", color: danger ? "#ef4444" : iconColor }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block truncate ${danger ? "text-destructive" : "text-foreground"}`}>{label}</span>
        {description && <span className="block truncate text-sm text-muted-foreground">{description}</span>}
      </span>
      {badge && (
        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary" style={{ fontWeight: 600 }}>
          {badge}
        </span>
      )}
      {value && <span className="shrink-0 text-sm text-muted-foreground">{value}</span>}
      <ChevronRight className={`h-5 w-5 shrink-0 ${danger ? "text-destructive/60" : "text-muted-foreground"}`} />
    </button>
  );
}

export function MenuToggle({
  icon: Icon,
  iconColor = "#10b981",
  label,
  description,
  checked,
  onChange,
}: RowBase & {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex w-full items-center gap-3 border-b border-border px-4 py-3.5 last:border-0">
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
        style={{ background: iconColor + "1a", color: iconColor }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-foreground">{label}</span>
        {description && <span className="block truncate text-sm text-muted-foreground">{description}</span>}
      </span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}
