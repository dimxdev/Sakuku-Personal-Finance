import { toast } from "sonner";
import { HelpCircle, Headphones, MessageSquarePlus, Bug, BookOpen } from "lucide-react";
import { ScreenHeader } from "../ScreenHeader";
import { MenuSection, MenuLink } from "../Menu";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function HelpSupportScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("hs.title")} onBack={() => navigate("profile")} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div
          className="mt-2 rounded-3xl p-5 text-white"
          style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
        >
          <Headphones className="h-7 w-7" />
          <h3 className="mt-3 text-white">{t("hs.contact")}</h3>
          <p className="mt-1 text-sm text-white/85">{t("hs.intro")}</p>
        </div>

        <MenuSection>
          <MenuLink
            icon={HelpCircle}
            label={t("hs.faq")}
            description={t("hs.faqDesc")}
            onClick={() => navigate("help-center")}
          />
          <MenuLink
            icon={BookOpen}
            iconColor="#8b5cf6"
            label={t("hs.guide")}
            description={t("hs.guideDesc")}
            onClick={() => navigate("about-app")}
          />
          <MenuLink
            icon={Headphones}
            iconColor="#3b82f6"
            label={t("hs.contact")}
            description={t("hs.contactDesc")}
            onClick={() => toast.success(t("hs.chatOpened"))}
          />
          <MenuLink
            icon={MessageSquarePlus}
            iconColor="#f59e0b"
            label={t("hs.feedback")}
            description={t("hs.feedbackDesc")}
            onClick={() => toast(t("hs.feedback"), { description: t("common.comingSoon") })}
          />
          <MenuLink
            icon={Bug}
            iconColor="#ef4444"
            label={t("hs.report")}
            description={t("hs.reportDesc")}
            onClick={() => toast(t("hs.report"), { description: t("common.comingSoon") })}
          />
        </MenuSection>
      </div>
    </div>
  );
}
