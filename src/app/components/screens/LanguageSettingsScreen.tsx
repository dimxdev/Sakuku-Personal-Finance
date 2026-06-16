import { toast } from "sonner";
import { Check, Languages } from "lucide-react";
import { ScreenHeader } from "../ScreenHeader";
import { useI18n, type Lang } from "../../data/i18n";
import type { Navigate } from "../nav";

export function LanguageSettingsScreen({ navigate }: { navigate: Navigate }) {
  const { t, lang, setLang } = useI18n();

  const options: { value: Lang; label: string; sub: string; flag: string }[] = [
    { value: "id", label: t("lang.id"), sub: t("lang.idSub"), flag: "🇮🇩" },
    { value: "en", label: t("lang.en"), sub: t("lang.enSub"), flag: "🇬🇧" },
  ];

  const choose = (value: Lang) => {
    if (value === lang) return;
    setLang(value);
    toast.success(value === "id" ? "Bahasa berhasil diubah" : "Language changed successfully");
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("lang.title")} onBack={() => navigate("profile")} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 text-primary">
          <Languages className="h-5 w-5 shrink-0" />
          <p className="text-sm">{t("lang.intro")}</p>
        </div>

        <p className="mb-2 mt-6 px-1 text-sm text-muted-foreground">{t("lang.current")}</p>
        <div className="space-y-3">
          {options.map((o) => {
            const active = lang === o.value;
            return (
              <button
                key={o.value}
                onClick={() => choose(o.value)}
                className="flex w-full items-center gap-3 rounded-3xl border bg-card p-4 text-left transition-all active:scale-[0.99]"
                style={{ borderColor: active ? "#10b981" : "var(--border)", background: active ? "#10b9810d" : undefined }}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent" style={{ fontSize: "1.4rem" }}>
                  {o.flag}
                </span>
                <span className="flex-1">
                  <span className="block" style={{ fontWeight: 600 }}>
                    {o.label}
                  </span>
                  <span className="block text-sm text-muted-foreground">{o.sub}</span>
                </span>
                <span
                  className="grid h-6 w-6 place-items-center rounded-full border-2"
                  style={{ borderColor: active ? "#10b981" : "var(--border)", background: active ? "#10b981" : "transparent" }}
                >
                  {active && <Check className="h-3.5 w-3.5 text-white" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
