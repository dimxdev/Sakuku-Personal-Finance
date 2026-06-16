import { toast } from "sonner";
import { FileText, Lock, Star, Share2, Globe, Mail } from "lucide-react";
import { ScreenHeader } from "../ScreenHeader";
import { MenuSection, MenuLink } from "../Menu";
import { Logo } from "../Logo";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function AboutAppScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("about.title")} onBack={() => navigate("profile")} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        {/* App identity */}
        <div className="flex flex-col items-center pt-4 text-center">
          <Logo size={80} />
          <h1 className="mt-4" style={{ fontSize: "1.6rem", fontWeight: 700 }}>
            SakuKu
          </h1>
          <p className="text-muted-foreground">{t("splash.tagline")}</p>
          <span className="mt-2 rounded-full bg-accent px-3 py-1 text-sm text-muted-foreground">
            {t("about.version")}
          </span>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">{t("about.desc")}</p>

        <MenuSection title={t("about.legal")}>
          <MenuLink icon={FileText} label={t("about.terms")} onClick={() => toast(t("about.terms"))} />
          <MenuLink icon={Lock} label={t("about.privacy")} onClick={() => toast(t("about.privacy"))} />
          <MenuLink icon={FileText} iconColor="#3b82f6" label={t("about.licenses")} onClick={() => toast(t("about.licenses"))} />
        </MenuSection>

        <MenuSection title={t("about.connect")}>
          <MenuLink icon={Star} iconColor="#f59e0b" label={t("about.rate")} onClick={() => toast("⭐⭐⭐⭐⭐")} />
          <MenuLink
            icon={Share2}
            iconColor="#8b5cf6"
            label={t("about.share")}
            onClick={() => toast.success(t("about.shareCopied"))}
          />
          <MenuLink icon={Globe} iconColor="#06b6d4" label={t("about.website")} value="sakuku.app" onClick={() => toast("sakuku.app")} />
          <MenuLink icon={Mail} iconColor="#10b981" label="hello@sakuku.app" onClick={() => toast("hello@sakuku.app")} />
        </MenuSection>

        <p className="mt-8 text-center text-sm text-muted-foreground">{t("about.copyright")}</p>
      </div>
    </div>
  );
}
