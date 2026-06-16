import { useState } from "react";
import { toast } from "sonner";
import { UserCog, Download, SlidersHorizontal, FileText, Trash2 } from "lucide-react";
import { ScreenHeader } from "../ScreenHeader";
import { MenuSection, MenuLink } from "../Menu";
import { ConfirmDialog } from "../ConfirmDialog";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function PrivacyDataScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("pv.title")} onBack={() => navigate("profile")} />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <MenuSection title={t("pv.section.data")}>
          <MenuLink
            icon={UserCog}
            label={t("pv.managePersonal")}
            description={t("pv.managePersonalDesc")}
            onClick={() => navigate("edit-profile")}
          />
          <MenuLink
            icon={Download}
            iconColor="#3b82f6"
            label={t("pv.download")}
            description={t("pv.downloadDesc")}
            onClick={() => toast.success(t("pv.downloadStarted"))}
          />
          <MenuLink
            icon={SlidersHorizontal}
            iconColor="#f59e0b"
            label={t("pv.permissions")}
            description={t("pv.permissionsDesc")}
            onClick={() => toast(t("pv.permissions"), { description: t("common.comingSoon") })}
          />
        </MenuSection>

        <MenuSection title={t("pv.section.legal")}>
          <MenuLink
            icon={FileText}
            iconColor="#8b5cf6"
            label={t("pv.policy")}
            onClick={() => navigate("about-app")}
          />
        </MenuSection>

        <MenuSection>
          <MenuLink icon={Trash2} danger label={t("pv.deleteAccount")} onClick={() => setConfirmDelete(true)} />
        </MenuSection>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title={t("pv.deleteAccount") + "?"}
        message={t("pv.deleteConfirm")}
        confirmLabel={t("pv.deleteAccount")}
        danger
        onConfirm={() => {
          setConfirmDelete(false);
          toast.error(t("pv.deleteDisabled"));
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
