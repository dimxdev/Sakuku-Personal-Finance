import { categoryColor, categoryIcon, categoryKey, formatRupiah, type Transaction } from "../data/store";
import { useI18n } from "../data/i18n";

export function TransactionRow({
  tx,
  showDate = true,
  className = "",
}: {
  tx: Transaction;
  showDate?: boolean;
  className?: string;
}) {
  const { t, locale } = useI18n();
  const Icon = categoryIcon(tx.category);
  const color = categoryColor(tx.category);
  const isIncome = tx.type === "income";
  const dateLabel = new Date(tx.date).toLocaleDateString(locale, { day: "numeric", month: "short" });
  const noteText = tx.noteKey ? t(tx.noteKey) : tx.note;

  return (
    <div className={`flex items-center gap-3 py-3.5 ${className}`}>
      <div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
        style={{ background: color + "1a" }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-foreground" style={{ fontWeight: 500 }}>
          {t(categoryKey(tx.category))}
        </p>
        <p className="truncate text-sm text-muted-foreground">{noteText || (showDate ? dateLabel : "")}</p>
      </div>
      <div className="shrink-0 text-right">
        <p style={{ color: isIncome ? "#10b981" : "var(--foreground)", fontWeight: 600 }}>
          {isIncome ? "+" : "−"}
          {formatRupiah(tx.amount)}
        </p>
        {showDate && <p className="text-sm text-muted-foreground">{dateLabel}</p>}
      </div>
    </div>
  );
}
