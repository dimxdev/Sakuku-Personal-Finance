import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Headphones,
  ChevronDown,
  Wallet,
  ShieldCheck,
  PiggyBank,
  CreditCard,
  Settings,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

const categories = [
  { icon: Wallet, key: "hc.cat.transactions", color: "#10b981" },
  { icon: PiggyBank, key: "hc.cat.savings", color: "#3b82f6" },
  { icon: ShieldCheck, key: "hc.cat.security", color: "#f59e0b" },
  { icon: CreditCard, key: "hc.cat.payments", color: "#8b5cf6" },
  { icon: Settings, key: "hc.cat.account", color: "#06b6d4" },
  { icon: MessageCircle, key: "hc.cat.other", color: "#ec4899" },
];

const faqKeys = [
  { q: "hc.q1", a: "hc.a1" },
  { q: "hc.q2", a: "hc.a2" },
  { q: "hc.q3", a: "hc.a3" },
  { q: "hc.q4", a: "hc.a4" },
  { q: "hc.q5", a: "hc.a5" },
];

export function HelpCenterScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const faqs = useMemo(() => faqKeys.map((f) => ({ q: t(f.q), a: t(f.a) })), [t]);
  const filtered = useMemo(
    () => faqs.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(query.toLowerCase())),
    [faqs, query],
  );

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("hc.title")} onBack={() => navigate("help-support")} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("hc.search")}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>

        <p className="mb-3 mt-6 px-1 text-sm text-muted-foreground">{t("hc.browse")}</p>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                onClick={() => toast(t(c.key), { description: t("common.comingSoon") })}
                className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card py-4 transition-transform active:scale-95"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl"
                  style={{ background: c.color + "1a", color: c.color }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs text-foreground">{t(c.key)}</span>
              </button>
            );
          })}
        </div>

        <p className="mb-3 mt-6 px-1 text-sm text-muted-foreground">
          {query ? t("hc.results", { n: filtered.length }) : t("hc.faqTitle")}
        </p>
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">{t("hc.noResults")}</p>
          )}
          {filtered.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-border last:border-0">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent"
                >
                  <span className="flex-1" style={{ fontWeight: 500 }}>
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <p className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            );
          })}
        </div>

        <div
          className="mt-6 rounded-3xl p-5 text-white"
          style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
        >
          <h3 className="text-white">{t("hc.stillHelp")}</h3>
          <p className="mt-1 text-sm text-white/85">{t("hc.replyTime")}</p>
          <Button
            onClick={() => toast.success(t("hc.chatOpened"))}
            className="mt-4 h-12 w-full rounded-2xl bg-white text-primary hover:bg-white/90"
          >
            <Headphones className="h-5 w-5" />
            {t("hc.contact")}
          </Button>
        </div>
      </div>
    </div>
  );
}
