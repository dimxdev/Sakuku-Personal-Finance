import { useState } from "react";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Check, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function ChangePasswordScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const strong = next.length >= 8;
  const matches = confirm.length > 0 && confirm === next;
  const canSave = current.length > 0 && strong && matches;

  const strength = next.length === 0 ? 0 : next.length < 6 ? 1 : next.length < 8 ? 2 : 3;
  const strengthLabel = ["", t("cp.weak"), t("cp.fair"), t("cp.strong")][strength];
  const strengthColor = ["#e5e7eb", "#ef4444", "#f59e0b", "#10b981"][strength];

  const save = () => {
    if (!canSave) {
      toast.error(t("cp.incomplete"));
      return;
    }
    toast.success(t("cp.success"));
    navigate("profile");
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("cp.title")} onBack={() => navigate("profile")} />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="mt-2 space-y-3 rounded-3xl border border-border bg-card p-4">
          <PwField label={t("cp.current")} value={current} onChange={setCurrent} show={show} setShow={setShow} />
          <PwField label={t("cp.new")} value={next} onChange={setNext} show={show} setShow={setShow} />

          {next.length > 0 && (
            <div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full"
                    style={{ background: i <= strength ? strengthColor : "#e5e7eb" }}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs" style={{ color: strengthColor }}>
                {strengthLabel} · {t("cp.hint")}
              </p>
            </div>
          )}

          <PwField label={t("cp.confirm")} value={confirm} onChange={setConfirm} show={show} setShow={setShow} />
          {confirm.length > 0 && !matches && <p className="text-sm text-destructive">{t("cp.mismatch")}</p>}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-accent p-4">
          <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">{t("cp.note")}</p>
        </div>
      </div>

      <div className="px-5 pb-8 pt-2">
        <Button
          onClick={save}
          disabled={!canSave}
          className="h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
        >
          <Check className="h-5 w-5" />
          {t("cp.update")}
        </Button>
      </div>
    </div>
  );
}

function PwField({
  label,
  value,
  onChange,
  show,
  setShow,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-3 focus-within:border-primary">
        <Lock className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
        <button type="button" onClick={() => setShow(!show)} aria-label="Toggle password visibility">
          {show ? (
            <EyeOff className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Eye className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
      </div>
    </label>
  );
}
