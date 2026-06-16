import { useState } from "react";
import { toast } from "sonner";
import {
  Bell,
  ChevronRight,
  Fingerprint,
  HelpCircle,
  LogOut,
  Shield,
  Lock,
  CreditCard,
  Globe,
} from "lucide-react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { ConfirmDialog } from "../ConfirmDialog";
import { useStore, formatRupiah } from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function ProfileScreen({ navigate }: { navigate: Navigate }) {
  const { user, totals, transactions, goals } = useStore();
  const { t, lang } = useI18n();
  const [notif, setNotif] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const langValue = lang === "id" ? "Indonesia" : "English";

  return (
    <div className="flex h-full flex-col pb-28">
      <ScreenHeader title={t("profile.title")} onBack={() => navigate("home")} />

      <div className="flex-1 overflow-y-auto px-5">
        {/* User card */}
        <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5">
          <div
            className="grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary"
            style={{ fontSize: "1.5rem", fontWeight: 700 }}
          >
            {user.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
              {user.name}
            </p>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={() => navigate("edit-profile")}
            className="rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:bg-accent active:bg-muted"
          >
            {t("profile.edit")}
          </button>
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Stat label={t("profile.stat.balance")} value={formatRupiah(totals.balance)} />
          <Stat label={t("profile.stat.transactions")} value={String(transactions.length)} />
          <Stat label={t("profile.stat.goals")} value={String(goals.length)} />
        </div>

        {/* Notifications */}
        <Section title={t("profile.section.notifications")}>
          <ToggleRow
            icon={<Bell className="h-5 w-5" />}
            label={t("profile.pushNotifications")}
            checked={notif}
            onChange={(v) => {
              setNotif(v);
              toast(v ? t("profile.notifOn") : t("profile.notifOff"));
            }}
          />
        </Section>

        {/* Security */}
        <Section title={t("profile.section.security")}>
          <ToggleRow
            icon={<Fingerprint className="h-5 w-5" />}
            label={t("profile.biometric")}
            checked={biometric}
            onChange={(v) => {
              setBiometric(v);
              toast(v ? t("profile.bioOn") : t("profile.bioOff"));
            }}
          />
          <LinkRow
            icon={<Lock className="h-5 w-5" />}
            label={t("profile.changePassword")}
            onClick={() => navigate("change-password")}
          />
          <LinkRow
            icon={<Shield className="h-5 w-5" />}
            label={t("profile.privacyData")}
            onClick={() => navigate("privacy-data")}
          />
        </Section>

        {/* General */}
        <Section title={t("profile.section.general")}>
          <LinkRow
            icon={<CreditCard className="h-5 w-5" />}
            label={t("profile.paymentMethods")}
            onClick={() => navigate("payment-methods")}
          />
          <LinkRow
            icon={<Globe className="h-5 w-5" />}
            label={t("profile.language")}
            value={langValue}
            onClick={() => navigate("language-settings")}
          />
          <LinkRow
            icon={<HelpCircle className="h-5 w-5" />}
            label={t("profile.helpSupport")}
            onClick={() => navigate("help-support")}
          />
        </Section>

        <Button
          onClick={() => setConfirmLogout(true)}
          variant="outline"
          className="mt-6 h-14 w-full rounded-2xl border-destructive/30 text-destructive hover:bg-destructive/5"
        >
          <LogOut className="h-5 w-5" />
          {t("profile.logout")}
        </Button>

        <p className="mt-4 text-center text-sm text-muted-foreground">SakuKu v1.0.0</p>
      </div>

      <ConfirmDialog
        open={confirmLogout}
        title={t("profile.logout") + "?"}
        message={t("profile.logoutConfirm")}
        confirmLabel={t("profile.logout")}
        onConfirm={() => {
          setConfirmLogout(false);
          navigate("login");
        }}
        onCancel={() => setConfirmLogout(false)}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-accent p-3 text-center">
      <p className="truncate" style={{ fontWeight: 700 }}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-sm text-muted-foreground">{title}</p>
      <div className="overflow-hidden rounded-3xl border border-border bg-card">{children}</div>
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3.5 last:border-0">
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex-1">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}

function LinkRow({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-border px-4 py-3.5 text-left transition-colors last:border-0 hover:bg-accent active:bg-muted"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex-1">{label}</span>
      {value && <span className="text-sm text-muted-foreground">{value}</span>}
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}
