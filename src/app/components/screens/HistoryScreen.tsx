import { useMemo, useState } from "react";
import { ChevronRight, SlidersHorizontal, Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { TransactionRow } from "../TransactionRow";
import { useStore, formatRupiah, categoryKey, expenseCategories, incomeCategories } from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

const dateFilters = [
  { value: "All", labelKey: "hist.f.all" },
  { value: "Today", labelKey: "hist.f.today" },
  { value: "7 Days", labelKey: "hist.f.7days" },
  { value: "30 Days", labelKey: "hist.f.30days" },
] as const;

const typeFilters = [
  { value: "All", labelKey: "hist.f.all" },
  { value: "Income", labelKey: "hist.f.income" },
  { value: "Expense", labelKey: "hist.f.expense" },
] as const;

export function HistoryScreen({ navigate }: { navigate: Navigate }) {
  const { transactions } = useStore();
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [dateF, setDateF] = useState<string>("All");
  const [typeF, setTypeF] = useState<string>("All");
  const [cat, setCat] = useState("All");
  const [catSheetOpen, setCatSheetOpen] = useState(false);

  const allCats = ["All", ...incomeCategories.map((c) => c.name), ...expenseCategories.map((c) => c.name)];

  const filtered = useMemo(() => {
    const now = Date.now();
    const dayMs = 86400000;
    return transactions.filter((tx) => {
      if (typeF !== "All" && tx.type !== typeF.toLowerCase()) return false;
      if (cat !== "All" && tx.category !== cat) return false;
      if (query && !`${tx.category} ${tx.note ?? ""} ${tx.noteKey ? t(tx.noteKey) : ""}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (dateF !== "All") {
        const diff = (now - new Date(tx.date).getTime()) / dayMs;
        if (dateF === "Today" && diff > 1) return false;
        if (dateF === "7 Days" && diff > 7) return false;
        if (dateF === "30 Days" && diff > 30) return false;
      }
      return true;
    });
  }, [transactions, query, dateF, typeF, cat, t]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((tx) => {
      const key = new Date(tx.date).toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      map.set(key, [...(map.get(key) ?? []), tx]);
    });
    return Array.from(map.entries());
  }, [filtered, locale]);

  const total = filtered.reduce((s, tx) => s + (tx.type === "income" ? tx.amount : -tx.amount), 0);

  return (
    <div className="flex h-full flex-col pb-28">
      <ScreenHeader title={t("hist.title")} onBack={() => navigate("home")} />

      <div className="px-5">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("hist.search")}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-3 flex gap-2">
          {typeFilters.map((f) => (
            <Chip key={f.value} active={typeF === f.value} onClick={() => setTypeF(f.value)}>
              {t(f.labelKey)}
            </Chip>
          ))}
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {dateFilters.map((f) => (
            <Chip key={f.value} active={dateF === f.value} onClick={() => setDateF(f.value)}>
              {t(f.labelKey)}
            </Chip>
          ))}
        </div>

        <button
          onClick={() => setCatSheetOpen(true)}
          className="mt-2 flex w-full items-center gap-2 rounded-2xl border border-border bg-accent px-4 py-3 text-left transition-colors hover:bg-muted"
        >
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 truncate text-sm">{t("hist.category")}: </span>
          <span className="truncate text-sm" style={{ fontWeight: 600 }}>
            {cat === "All" ? t("hist.f.all") : t(categoryKey(cat))}
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>

        <div className="mt-3 flex items-center justify-between rounded-2xl bg-accent px-4 py-3">
          <span className="text-sm text-muted-foreground">{t("hist.count", { n: filtered.length })}</span>
          <span style={{ fontWeight: 600, color: total >= 0 ? "#10b981" : "#ef4444" }}>
            {total >= 0 ? "+" : "−"}
            {formatRupiah(Math.abs(total))}
          </span>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto px-5">
        {grouped.length === 0 && <p className="mt-16 text-center text-muted-foreground">{t("hist.empty")}</p>}
        {grouped.map(([day, txs]) => {
          const dayTotal = txs.reduce((s, tx) => s + (tx.type === "income" ? tx.amount : -tx.amount), 0);
          return (
            <div key={day} className="mt-5">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-sm text-muted-foreground" style={{ fontWeight: 600 }}>
                  {day}
                </p>
                <p className="text-sm" style={{ color: dayTotal >= 0 ? "#10b981" : "#ef4444", fontWeight: 600 }}>
                  {dayTotal >= 0 ? "+" : "−"}
                  {formatRupiah(Math.abs(dayTotal))}
                </p>
              </div>
              <div className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
                {txs.map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} showDate={false} className="px-4" />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {catSheetOpen && (
        <div className="absolute inset-0 z-30 flex items-end bg-black/40" onClick={() => setCatSheetOpen(false)}>
          <div
            className="max-h-[75%] w-full overflow-y-auto rounded-t-3xl bg-background p-6 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3>{t("hist.category")}</h3>
              <button onClick={() => setCatSheetOpen(false)} aria-label={t("common.cancel")}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {allCats.map((c) => (
                <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                  {c === "All" ? t("hist.f.all") : t(categoryKey(c))}
                </Chip>
              ))}
            </div>

            <Button
              onClick={() => setCatSheetOpen(false)}
              className="mt-6 h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90"
            >
              {t("common.apply")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
  small,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border transition-colors ${
        small ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm"
      }`}
      style={{
        borderColor: active ? "#10b981" : "var(--border)",
        background: active ? "#10b981" : "transparent",
        color: active ? "#fff" : "var(--muted-foreground)",
      }}
    >
      {children}
    </button>
  );
}
