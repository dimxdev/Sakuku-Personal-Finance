import { useState } from "react";
import { toast } from "sonner";
import { Plus, X, Target, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { ConfirmDialog } from "../ConfirmDialog";
import { useStore, formatRupiah, type SavingsGoal } from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

const goalColors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#ec4899"];

export function SavingsScreen({ navigate }: { navigate: Navigate }) {
  const { goals, totals, addToGoal, addGoal, editGoal, removeGoal } = useStore();
  const { t } = useI18n();
  const [active, setActive] = useState<SavingsGoal | null>(null);
  const [amount, setAmount] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [color, setColor] = useState(goalColors[0]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const overallPct = totals.savedTarget > 0 ? Math.round((totals.saved / totals.savedTarget) * 100) : 0;
  const goalName = (g: SavingsGoal) => (g.nameKey ? t(g.nameKey) : g.name);

  const submit = () => {
    const val = Number(amount);
    if (!active || !val || val <= 0) return;
    addToGoal(active.id, val);
    toast.success(t("savings.added", { amt: formatRupiah(val), name: goalName(active) }));
    setActive(null);
    setAmount("");
  };

  const openNewGoal = () => {
    setEditingId(null);
    setName("");
    setTarget("");
    setSaved("");
    setColor(goalColors[0]);
    setFormOpen(true);
  };

  const openEditGoal = (g: SavingsGoal) => {
    setEditingId(g.id);
    setName(goalName(g));
    setTarget(String(g.target));
    setSaved(String(g.saved));
    setColor(g.color);
    setFormOpen(true);
  };

  const saveGoal = () => {
    const targetVal = Number(target);
    if (!name.trim() || !targetVal || targetVal <= 0) {
      toast.error(t("savings.incomplete"));
      return;
    }
    const savedVal = Math.min(targetVal, Math.max(0, Number(saved) || 0));
    if (editingId) {
      editGoal(editingId, { name: name.trim(), target: targetVal, saved: savedVal, color });
      toast.success(t("savings.goalUpdated"));
    } else {
      addGoal({ name: name.trim(), target: targetVal, saved: savedVal, color });
      toast.success(t("savings.goalAdded"));
    }
    setFormOpen(false);
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (deleteId) {
      removeGoal(deleteId);
      toast.success(t("savings.goalRemoved"));
    }
    setDeleteId(null);
  };

  return (
    <div className="flex h-full flex-col pb-28">
      <ScreenHeader
        title={t("savings.title")}
        onBack={() => navigate("home")}
        action={
          <button
            onClick={openNewGoal}
            aria-label={t("common.add")}
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5">
        {/* Overall card */}
        <div
          className="rounded-3xl p-6 text-white"
          style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}
        >
          <div className="flex items-center gap-2 text-white/80">
            <Target className="h-4 w-4" />
            <span className="text-sm">{t("savings.totalSaved")}</span>
          </div>
          <p className="mt-1" style={{ fontSize: "2rem", fontWeight: 700 }}>
            {formatRupiah(totals.saved)}
          </p>
          <p className="text-sm text-white/80">{t("savings.ofTarget", { amt: formatRupiah(totals.savedTarget) })}</p>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white" style={{ width: `${overallPct}%` }} />
          </div>
          <p className="mt-2 text-sm text-white/90">{t("savings.reached", { pct: overallPct })}</p>
        </div>

        <div className="mt-6 space-y-4">
          {goals.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">{t("savings.empty")}</p>
          )}
          {goals.map((g) => {
            const pct = Math.round((g.saved / g.target) * 100);
            return (
              <div key={g.id} className="rounded-3xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate" style={{ fontWeight: 600 }}>
                      {goalName(g)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatRupiah(g.saved)} / {formatRupiah(g.target)}
                    </p>
                  </div>
                  <div
                    className="shrink-0 rounded-full px-3 py-1 text-sm"
                    style={{ background: g.color + "1a", color: g.color, fontWeight: 600 }}
                  >
                    {pct}%
                  </div>
                  <button
                    aria-label={t("common.edit")}
                    onClick={() => openEditGoal(g)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-accent"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    aria-label={t("common.delete")}
                    onClick={() => setDeleteId(g.id)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-accent">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: g.color }}
                  />
                </div>
                <button
                  onClick={() => setActive(g)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-sm transition-colors"
                  style={{ background: g.color + "14", color: g.color, fontWeight: 600 }}
                >
                  <Plus className="h-4 w-4" />
                  {t("savings.addSavings")}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add savings sheet */}
      {active && (
        <div className="absolute inset-0 z-30 flex items-end bg-black/40" onClick={() => setActive(null)}>
          <div
            className="w-full rounded-t-3xl bg-background p-6 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3>{t("savings.addTo", { name: goalName(active) })}</h3>
              <button onClick={() => setActive(null)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("savings.amount")}</p>
            <input
              autoFocus
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-border bg-accent px-4 py-3.5 outline-none focus:border-primary"
            />
            <div className="mt-3 flex gap-2">
              {[50000, 100000, 250000].map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(String(q))}
                  className="flex-1 rounded-xl bg-accent py-2 text-sm text-foreground"
                >
                  {formatRupiah(q)}
                </button>
              ))}
            </div>
            <Button
              onClick={submit}
              className="mt-5 h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90"
            >
              {t("common.confirm")}
            </Button>
          </div>
        </div>
      )}

      {/* Create / edit goal sheet */}
      {formOpen && (
        <div
          className="absolute inset-0 z-30 flex items-end bg-black/40"
          onClick={() => setFormOpen(false)}
        >
          <div
            className="max-h-[85%] w-full overflow-y-auto rounded-t-3xl bg-background p-6 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3>{editingId ? t("savings.editGoal") : t("savings.newGoal")}</h3>
              <button onClick={() => setFormOpen(false)} aria-label={t("common.cancel")}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("savings.name")}</p>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("savings.namePlaceholder")}
              className="w-full rounded-2xl border border-border bg-accent px-4 py-3.5 outline-none focus:border-primary"
            />

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("savings.target")}</p>
            <input
              type="number"
              inputMode="numeric"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-border bg-accent px-4 py-3.5 outline-none focus:border-primary"
            />

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("savings.alreadySaved")}</p>
            <input
              type="number"
              inputMode="numeric"
              value={saved}
              onChange={(e) => setSaved(e.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-border bg-accent px-4 py-3.5 outline-none focus:border-primary"
            />

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("savings.color")}</p>
            <div className="flex flex-wrap gap-2">
              {goalColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={c}
                  className="h-9 w-9 rounded-full transition-transform"
                  style={{
                    background: c,
                    outline: color === c ? "2px solid var(--foreground)" : "none",
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>

            <Button
              onClick={saveGoal}
              className="mt-6 h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90"
            >
              {editingId ? t("common.saveChanges") : t("common.add")}
            </Button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title={t("common.delete") + "?"}
        message={t("savings.removeConfirm")}
        confirmLabel={t("common.delete")}
        danger
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
