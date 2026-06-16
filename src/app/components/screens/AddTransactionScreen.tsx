import { useState } from "react";
import { toast } from "sonner";
import { Calendar as CalIcon, Check, ChevronRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import {
  useStore,
  formatRupiah,
  categoryKey,
  incomeCategories,
  expenseCategories,
  type TxType,
} from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function AddTransactionScreen({
  type,
  navigate,
}: {
  type: TxType;
  navigate: Navigate;
}) {
  const { addTransaction } = useStore();
  const { t } = useI18n();
  const isIncome = type === "income";
  const categories = isIncome ? incomeCategories : expenseCategories;
  const accent = isIncome ? "#10b981" : "#ef4444";

  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<string>(categories[0].name);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [catSheetOpen, setCatSheetOpen] = useState(false);

  const selectedCat = categories.find((c) => c.name === category) ?? categories[0];
  const SelectedIcon = selectedCat.icon;

  const press = (d: string) => {
    if (d === "del") return setAmount((a) => Math.floor(a / 10));
    if (d === "000") return setAmount((a) => Math.min(a * 1000, 9_999_999_999));
    setAmount((a) => Math.min(a * 10 + Number(d), 9_999_999_999));
  };

  const save = () => {
    if (amount <= 0) {
      toast.error(t("tx.enterAmount"));
      return;
    }
    addTransaction({ type, amount, category, date, note: note.trim() || undefined });
    toast.success(t(isIncome ? "tx.incomeAdded" : "tx.expenseAdded", { amt: formatRupiah(amount) }));
    navigate("home");
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={isIncome ? t("tx.addIncome") : t("tx.addExpense")} onBack={() => navigate("home")} />

      <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-4">
        {/* Amount display */}
        <div
          className="rounded-3xl px-6 py-5 text-center text-white"
          style={{ background: isIncome ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#ef4444,#dc2626)" }}
        >
          <p className="text-white/80">{t("tx.amount")}</p>
          <p className="mt-1" style={{ fontSize: "2.1rem", fontWeight: 700, lineHeight: 1.1 }}>
            {formatRupiah(amount)}
          </p>
        </div>

        {/* Category */}
        <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("tx.category")}</p>
        <button
          onClick={() => setCatSheetOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-2.5 text-left transition-colors hover:bg-muted"
        >
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
            style={{ background: selectedCat.color + "1a", color: selectedCat.color }}
          >
            <SelectedIcon className="h-5 w-5" />
          </span>
          <span className="flex-1 truncate text-foreground" style={{ fontWeight: 600 }}>
            {t(categoryKey(selectedCat.name))}
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
        </button>

        {/* Date + Note */}
        <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("tx.date")}</p>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-2.5">
          <CalIcon className="h-5 w-5 text-muted-foreground" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        <p className="mb-2 mt-3 text-sm text-muted-foreground">{t("tx.notes")}</p>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("tx.notePlaceholder")}
          className="w-full rounded-2xl border border-border bg-accent px-4 py-2.5 outline-none placeholder:text-muted-foreground focus:border-primary"
        />

        {/* Keypad */}
        <div className="mt-3 grid flex-1 grid-cols-3 grid-rows-4 gap-1.5">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "000", "0", "del"].map((k) => (
            <button
              key={k}
              onClick={() => press(k)}
              className="rounded-xl bg-accent text-lg transition-colors hover:bg-muted active:scale-95"
              style={{ fontWeight: 600 }}
            >
              {k === "del" ? "⌫" : k}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6 pt-2">
        <Button
          onClick={save}
          className="h-12 w-full rounded-2xl text-base text-white"
          style={{ background: accent }}
        >
          <Check className="h-5 w-5" />
          {isIncome ? t("tx.saveIncome") : t("tx.saveExpense")}
        </Button>
      </div>

      {/* Category picker sheet */}
      {catSheetOpen && (
        <div className="absolute inset-0 z-30 flex items-end bg-black/40" onClick={() => setCatSheetOpen(false)}>
          <div
            className="max-h-[80%] w-full overflow-y-auto rounded-t-3xl bg-background p-6 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3>{t("tx.category")}</h3>
              <button onClick={() => setCatSheetOpen(false)} aria-label={t("common.cancel")}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2.5">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = category === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => {
                      setCategory(c.name);
                      setCatSheetOpen(false);
                    }}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border py-3 transition-all"
                    style={{
                      borderColor: active ? c.color : "var(--border)",
                      background: active ? c.color + "14" : "transparent",
                    }}
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{ background: c.color + "1a", color: c.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="px-1 text-center text-[11px] leading-tight text-foreground">
                      {t(categoryKey(c.name))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
