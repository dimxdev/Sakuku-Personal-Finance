import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, PiggyBank, Wallet } from "lucide-react";
import { ScreenHeader } from "../ScreenHeader";
import { useStore, formatRupiah, categoryColor, categoryKey } from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

const monthlyRaw = [
  { key: "month.jan", income: 7200000, expense: 4100000 },
  { key: "month.feb", income: 6800000, expense: 4600000 },
  { key: "month.mar", income: 7500000, expense: 5200000 },
  { key: "month.apr", income: 7000000, expense: 4300000 },
  { key: "month.may", income: 8100000, expense: 5500000 },
  { key: "month.jun", income: 8000000, expense: 4700000 },
];

export function ReportsScreen({ navigate }: { navigate: Navigate }) {
  const { transactions, totals } = useStore();
  const { t } = useI18n();
  const monthly = monthlyRaw.map((m) => ({ ...m, month: t(m.key) }));

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + t.amount));
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const savingsRate =
    totals.income > 0 ? Math.round(((totals.income - totals.expense) / totals.income) * 100) : 0;

  return (
    <div className="flex h-full flex-col pb-28">
      <ScreenHeader title={t("rep.title")} onBack={() => navigate("home")} />

      <div className="flex-1 overflow-y-auto px-5">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            color="#10b981"
            label={t("rep.totalIncome")}
            value={formatRupiah(totals.income)}
          />
          <StatCard
            icon={<TrendingDown className="h-5 w-5" />}
            color="#ef4444"
            label={t("rep.totalExpense")}
            value={formatRupiah(totals.expense)}
          />
          <StatCard
            icon={<PiggyBank className="h-5 w-5" />}
            color="#3b82f6"
            label={t("rep.totalSaved")}
            value={formatRupiah(totals.saved)}
          />
          <StatCard
            icon={<Wallet className="h-5 w-5" />}
            color="#f59e0b"
            label={t("rep.savingsRate")}
            value={`${savingsRate}%`}
          />
        </div>

        {/* Income vs Expense */}
        <div className="mt-6 rounded-3xl border border-border bg-card p-5">
          <h3 className="mb-1">{t("rep.incomeVsExpense")}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{t("rep.last6")}</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} barGap={4}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  formatter={(v: number) => formatRupiah(v)}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex justify-center gap-5 text-sm">
            <Legend color="#10b981" label={t("home.income")} />
            <Legend color="#3b82f6" label={t("home.expense")} />
          </div>
        </div>

        {/* Expense breakdown */}
        <div className="mt-5 rounded-3xl border border-border bg-card p-5">
          <h3 className="mb-1">{t("rep.breakdown")}</h3>
          <p className="mb-2 text-sm text-muted-foreground">{t("rep.byCategory")}</p>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byCategory}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {byCategory.map((c) => (
                      <Cell key={c.name} fill={categoryColor(c.name)} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatRupiah(v)} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {byCategory.slice(0, 5).map((c) => {
                const pct = Math.round((c.value / totals.expense) * 100);
                return (
                  <div key={c.name} className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: categoryColor(c.name) }}
                    />
                    <span className="flex-1 truncate text-muted-foreground">{t(categoryKey(c.name))}</span>
                    <span style={{ fontWeight: 600 }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Savings statistics */}
        <div
          className="mt-5 rounded-3xl p-5 text-white"
          style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
        >
          <h3 className="text-white">{t("rep.insight")}</h3>
          <p className="mt-1 text-sm text-white/85">{t("rep.insightDesc", { pct: savingsRate })}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  color,
  label,
  value,
}: {
  icon: React.ReactNode;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <span
        className="grid h-10 w-10 place-items-center rounded-2xl"
        style={{ background: color + "1a", color }}
      >
        {icon}
      </span>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
      <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>{value}</p>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </div>
  );
}
