import { Home, Receipt, Plus, BarChart3, User } from "lucide-react";
import type { Screen, Navigate } from "./nav";
import { useI18n } from "../data/i18n";

const items: { screen: Screen; labelKey: string; icon: typeof Home }[] = [
  { screen: "home", labelKey: "nav.home", icon: Home },
  { screen: "history", labelKey: "nav.history", icon: Receipt },
  { screen: "reports", labelKey: "nav.reports", icon: BarChart3 },
  { screen: "profile", labelKey: "nav.profile", icon: User },
];

export function BottomNav({ active, navigate }: { active: Screen; navigate: Navigate }) {
  const { t } = useI18n();
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div className="pointer-events-auto relative border-t border-border bg-background/95 px-2 pb-5 pt-2 backdrop-blur-md">
        <div className="flex items-center justify-around">
          {items.slice(0, 2).map((it) => (
            <NavButton key={it.screen} {...it} label={t(it.labelKey)} active={active} navigate={navigate} />
          ))}
          <div className="w-16" />
          {items.slice(2).map((it) => (
            <NavButton key={it.screen} {...it} label={t(it.labelKey)} active={active} navigate={navigate} />
          ))}
        </div>
        <button
          onClick={() => navigate("add-expense")}
          aria-label="Add transaction"
          className="absolute left-1/2 top-0 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-emerald-500/40 transition-transform active:scale-90"
        >
          <Plus className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}

function NavButton({
  screen,
  label,
  icon: Icon,
  active,
  navigate,
}: {
  screen: Screen;
  label: string;
  icon: typeof Home;
  active: Screen;
  navigate: Navigate;
}) {
  const isActive = active === screen;
  return (
    <button
      onClick={() => navigate(screen)}
      className="flex flex-1 flex-col items-center gap-1 py-1 transition-colors"
    >
      <Icon className={`h-6 w-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
      <span className={`text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
    </button>
  );
}
