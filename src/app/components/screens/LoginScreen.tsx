import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Logo } from "../Logo";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function LoginScreen({ navigate }: { navigate: Navigate }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("andini@sakuku.app");
  const [password, setPassword] = useState("password");
  const [show, setShow] = useState(false);

  return (
    <div className="flex h-full flex-col px-6 pb-8 pt-12">
      <div className="flex flex-col items-center">
        <Logo size={64} />
        <h1 className="mt-5" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
          {t("auth.welcome")}
        </h1>
        <p className="mt-1 text-muted-foreground">{t("auth.loginSubtitle")}</p>
      </div>

      <form
        className="mt-10 flex flex-1 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("home");
        }}
      >
        <Field icon={Mail} label={t("auth.email")}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </Field>

        <div className="h-4" />

        <Field icon={Lock} label={t("auth.password")}>
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
            {show ? (
              <EyeOff className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Eye className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </Field>

        <button type="button" className="mt-3 self-end text-sm text-secondary">
          {t("auth.forgot")}
        </button>

        <div className="flex-1" />

        <Button
          type="submit"
          className="h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90"
        >
          {t("auth.login")}
        </Button>

        <p className="mt-5 text-center text-muted-foreground">
          {t("auth.noAccount")}{" "}
          <button type="button" onClick={() => navigate("register")} className="text-primary">
            {t("auth.register")}
          </button>
        </p>
      </form>
    </div>
  );
}

export function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-3.5 focus-within:border-primary">
        <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
        {children}
      </div>
    </label>
  );
}
