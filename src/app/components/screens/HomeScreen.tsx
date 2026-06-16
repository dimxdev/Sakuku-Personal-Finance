import { motion } from "motion/react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Eye,
  PiggyBank,
  Plus,
  Target,
} from "lucide-react";
import { useStore, formatRupiah } from "../../data/store";
import { useI18n } from "../../data/i18n";
import { TransactionRow } from "../TransactionRow";
import { ThemeToggle } from "../ThemeToggle";
import type { Navigate } from "../nav";

export function HomeScreen({ navigate }: { navigate: Navigate }) {
  const { user, totals, transactions, goals } = useStore();
  const { t } = useI18n();
  const recent = transactions.slice(0, 5);
  const topGoal = goals[0];
  const goalPct = Math.round((topGoal.saved / topGoal.target) * 100);

  return (
    <div className="h-full overflow-y-auto pb-28">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pb-2 pt-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary">
            <span style={{ fontWeight: 700 }}>{user.name.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("home.greeting")}</p>
            <p style={{ fontWeight: 600 }}>{user.name.split(" ")[0]}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => navigate("reminders")}
            aria-label="Reminders"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-accent"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </div>
      </div>

      {/* Balance card */}
      <div className="px-5 pt-3">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/25"
          style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
        >
          <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-white/5" />
          <div className="relative">
            <div className="flex items-center gap-2 text-white/80">
              <span className="text-sm">{t("home.balance")}</span>
              <Eye className="h-4 w-4" />
            </div>
            <p className="mt-1.5" style={{ fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.1 }}>
              {formatRupiah(totals.balance)}
            </p>
            <div className="mt-5 flex gap-3">
              <MiniStat
                icon={<ArrowDownLeft className="h-4 w-4" />}
                label={t("home.income")}
                value={formatRupiah(totals.income)}
              />
              <MiniStat
                icon={<ArrowUpRight className="h-4 w-4" />}
                label={t("home.expense")}
                value={formatRupiah(totals.expense)}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3 px-5 pt-5">
        <QuickAction
          color="#10b981"
          icon={<ArrowDownLeft className="h-6 w-6" />}
          label={t("home.addIncome")}
          onClick={() => navigate("add-income")}
        />
        <QuickAction
          color="#ef4444"
          icon={<ArrowUpRight className="h-6 w-6" />}
          label={t("home.addExpense")}
          onClick={() => navigate("add-expense")}
        />
        <QuickAction
          color="#3b82f6"
          icon={<PiggyBank className="h-6 w-6" />}
          label={t("home.addSavings")}
          onClick={() => navigate("savings")}
        />
      </div>

      {/* Savings progress */}
      <div className="px-5 pt-6">
        <button
          onClick={() => navigate("savings")}
          className="flex w-full items-center gap-4 rounded-3xl border border-border bg-card p-5 text-left transition-colors hover:bg-accent"
        >
          <div className="relative grid h-16 w-16 place-items-center">
            <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`${(goalPct / 100) * 97.4} 97.4`}
              />
            </svg>
            <span className="absolute" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              {goalPct}%
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Target className="h-4 w-4" />
              <span className="text-sm">{t("home.topGoal")}</span>
            </div>
            <p style={{ fontWeight: 600 }}>{topGoal.name}</p>
            <p className="text-sm text-muted-foreground">
              {formatRupiah(topGoal.saved)} {t("home.of")} {formatRupiah(topGoal.target)}
            </p>
          </div>
        </button>
      </div>

      {/* Recent transactions */}
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between">
          <h3>{t("home.recent")}</h3>
          <button onClick={() => navigate("history")} className="text-sm text-primary">
            {t("home.seeAll")}
          </button>
        </div>
        <div className="mt-1 divide-y divide-border">
          {recent.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex-1 rounded-2xl bg-white/15 px-3 py-2.5 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-white/80">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-0.5" style={{ fontWeight: 600 }}>
        {value}
      </p>
    </div>
  );
}

function QuickAction({
  color,
  icon,
  label,
  onClick,
}: {
  color: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card py-4 transition-transform active:scale-95"
    >
      <span
        className="grid h-12 w-12 place-items-center rounded-2xl"
        style={{ background: color + "1a", color }}
      >
        {icon}
      </span>
      <span className="text-xs text-foreground">{label}</span>
    </button>
  );
}
