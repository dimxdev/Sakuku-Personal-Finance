import { useEffect } from "react";
import { motion } from "motion/react";
import { Logo } from "../Logo";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function SplashScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();
  useEffect(() => {
    const t = setTimeout(() => navigate("onboarding"), 2400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
      <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10" />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="z-10 flex flex-col items-center"
      >
        <div className="rounded-[28%] bg-white/15 p-3 backdrop-blur-sm">
          <Logo size={84} />
        </div>
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-4xl font-bold tracking-tight"
          style={{ fontSize: "2.25rem", fontWeight: 800 }}
        >
          SakuKu
        </motion.h1>
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-white/90"
        >
          {t("splash.tagline")}
        </motion.p>
      </motion.div>

      <div className="absolute bottom-12 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-white/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
