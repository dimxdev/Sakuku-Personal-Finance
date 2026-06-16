import { useState } from "react";
import { toast } from "sonner";
import { Landmark, Wallet, Plus, Check, Star, Trash2, Pencil, X, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { ConfirmDialog } from "../ConfirmDialog";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

type PMType = "bank" | "ewallet";

interface PaymentMethod {
  id: string;
  type: PMType;
  provider: string;
  number: string;
  holder: string;
  isDefault: boolean;
  color: string;
}

const bankProviders = ["BCA", "Mandiri", "BNI", "BRI", "CIMB Niaga"];
const ewalletProviders = ["GoPay", "OVO", "DANA", "ShopeePay", "LinkAja"];

const seed: PaymentMethod[] = [
  { id: "p1", type: "bank", provider: "BCA", number: "1234", holder: "Andini Putri", isDefault: true, color: "#0066ae" },
  { id: "p2", type: "ewallet", provider: "GoPay", number: "7890", holder: "Andini Putri", isDefault: false, color: "#00aa13" },
  { id: "p3", type: "ewallet", provider: "OVO", number: "4521", holder: "Andini Putri", isDefault: false, color: "#4c2a86" },
];

export function PaymentMethodsScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();
  const [methods, setMethods] = useState<PaymentMethod[]>(seed);
  const [sheet, setSheet] = useState<PMType | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [provider, setProvider] = useState("");
  const [number, setNumber] = useState("");
  const [holder, setHolder] = useState("Andini Putri");

  const openSheet = (type: PMType) => {
    setEditingId(null);
    setSheet(type);
    setProvider(type === "bank" ? bankProviders[0] : ewalletProviders[0]);
    setNumber("");
    setHolder("Andini Putri");
  };

  const openEdit = (m: PaymentMethod) => {
    setEditingId(m.id);
    setSheet(m.type);
    setProvider(m.provider);
    setNumber(m.number);
    setHolder(m.holder);
  };

  const save = () => {
    if (!provider || number.length < 4 || !holder.trim()) {
      toast.error(t("pm.incomplete"));
      return;
    }
    if (editingId) {
      setMethods((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? { ...m, provider, number: number.slice(-4), holder: holder.trim() }
            : m,
        ),
      );
      toast.success(t("pm.updated"));
    } else {
      setMethods((prev) => [
        ...prev,
        {
          id: "p" + Date.now(),
          type: sheet!,
          provider,
          number: number.slice(-4),
          holder: holder.trim(),
          isDefault: prev.length === 0,
          color: sheet === "bank" ? "#0066ae" : "#10b981",
        },
      ]);
      toast.success(t("pm.added"));
    }
    setSheet(null);
    setEditingId(null);
  };

  const setDefault = (id: string) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
    toast.success(t("pm.defaultSet"));
  };

  const remove = () => {
    setMethods((prev) => {
      const filtered = prev.filter((m) => m.id !== removeId);
      if (filtered.length > 0 && !filtered.some((m) => m.isDefault)) filtered[0].isDefault = true;
      return filtered;
    });
    toast.success(t("pm.removed"));
    setRemoveId(null);
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("pm.title")} onBack={() => navigate("profile")} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <p className="mt-1 text-sm text-muted-foreground">{t("pm.intro")}</p>

        {/* Methods list */}
        <div className="mt-4 space-y-3">
          {methods.map((m) => {
            const Icon = m.type === "bank" ? Landmark : Wallet;
            return (
              <div key={m.id} className="rounded-3xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                    style={{ background: m.color + "1a", color: m.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate" style={{ fontWeight: 600 }}>
                        {m.provider}
                      </p>
                      {m.isDefault && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary" style={{ fontWeight: 600 }}>
                          {t("pm.default")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      •••• {m.number} · {m.holder}
                    </p>
                  </div>
                  <button
                    onClick={() => openEdit(m)}
                    aria-label={t("common.edit")}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-accent"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setRemoveId(m.id)}
                    aria-label={t("common.remove")}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {!m.isDefault && (
                  <button
                    onClick={() => setDefault(m.id)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <Star className="h-4 w-4" />
                    {t("pm.setDefault")}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Add buttons */}
        <div className="mt-5 space-y-3">
          <button
            onClick={() => openSheet("bank")}
            className="flex w-full items-center gap-3 rounded-3xl border-2 border-dashed border-border p-4 text-left transition-colors hover:bg-accent"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary/15 text-secondary">
              <Landmark className="h-5 w-5" />
            </span>
            <span className="flex-1" style={{ fontWeight: 600 }}>
              {t("pm.addBank")}
            </span>
            <Plus className="h-5 w-5 text-muted-foreground" />
          </button>
          <button
            onClick={() => openSheet("ewallet")}
            className="flex w-full items-center gap-3 rounded-3xl border-2 border-dashed border-border p-4 text-left transition-colors hover:bg-accent"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
              <Wallet className="h-5 w-5" />
            </span>
            <span className="flex-1" style={{ fontWeight: 600 }}>
              {t("pm.addEwallet")}
            </span>
            <Plus className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Add / edit sheet */}
      {sheet && (
        <div
          className="absolute inset-0 z-30 flex items-end bg-black/40"
          onClick={() => {
            setSheet(null);
            setEditingId(null);
          }}
        >
          <div className="w-full rounded-t-3xl bg-background p-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3>
                {editingId
                  ? sheet === "bank"
                    ? t("pm.editBank")
                    : t("pm.editEwallet")
                  : sheet === "bank"
                    ? t("pm.newBank")
                    : t("pm.newEwallet")}
              </h3>
              <button
                onClick={() => {
                  setSheet(null);
                  setEditingId(null);
                }}
                aria-label={t("common.cancel")}
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("pm.provider")}</p>
            <div className="flex flex-wrap gap-2">
              {(sheet === "bank" ? bankProviders : ewalletProviders).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className="rounded-full border px-4 py-2 text-sm transition-colors"
                  style={{
                    borderColor: provider === p ? "#10b981" : "var(--border)",
                    background: provider === p ? "#10b9811a" : "transparent",
                    color: provider === p ? "#10b981" : "var(--foreground)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("pm.number")}</p>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-3.5 focus-within:border-primary">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <input
                inputMode="numeric"
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
                placeholder={sheet === "bank" ? t("pm.numberBank") : t("pm.numberEwallet")}
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("pm.holder")}</p>
            <input
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
              className="w-full rounded-2xl border border-border bg-accent px-4 py-3.5 outline-none focus:border-primary"
            />

            <Button
              onClick={save}
              className="mt-6 h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90"
            >
              <Check className="h-5 w-5" />
              {editingId ? t("common.saveChanges") : t("common.add")}
            </Button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={removeId !== null}
        title={t("common.remove") + "?"}
        message={t("pm.removeConfirm")}
        confirmLabel={t("common.remove")}
        danger
        onConfirm={remove}
        onCancel={() => setRemoveId(null)}
      />
    </div>
  );
}
