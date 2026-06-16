import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Wallet, Target, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

const pages = [
  { icon: TrendingUp, titleKey: "onb.p1.title", descKey: "onb.p1.desc", color: "#10b981", bg: "#ecfdf5" },
  { icon: Wallet, titleKey: "onb.p2.title", descKey: "onb.p2.desc", color: "#3b82f6", bg: "#eff6ff" },
  { icon: Target, titleKey: "onb.p3.title", descKey: "onb.p3.desc", color: "#f59e0b", bg: "#fffbeb" },
];

export function OnboardingScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();
  const [page, setPage] = useState(0);
  const isLast = page === pages.length - 1;
  const p = pages[page];
  const Icon = p.icon;

  const next = () => (isLast ? navigate("login") : setPage((x) => x + 1));

  return (
    <div className="flex h-full flex-col px-6 pb-8 pt-6">
      <div className="flex justify-end">
        <button onClick={() => navigate("login")} className="text-muted-foreground">
          {t("onb.skip")}
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div
              className="grid h-44 w-44 place-items-center rounded-full"
              style={{ background: p.bg }}
            >
              <div
                className="grid h-24 w-24 place-items-center rounded-[32%] shadow-lg"
                style={{ background: p.color, boxShadow: `0 12px 30px -8px ${p.color}80` }}
              >
                <Icon className="h-12 w-12 text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="mt-10" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              {t(p.titleKey)}
            </h1>
            <p className="mt-3 max-w-xs text-muted-foreground">{t(p.descKey)}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {pages.map((_, i) => (
          <span
            key={i}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === page ? 24 : 8,
              background: i === page ? p.color : "#e5e7eb",
            }}
          />
        ))}
      </div>

      <Button
        onClick={next}
        className="h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90"
      >
        {isLast ? t("onb.getStarted") : t("common.next")}
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
