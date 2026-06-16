import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { Field } from "./LoginScreen";
import { useStore } from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

export function RegisterScreen({ navigate }: { navigate: Navigate }) {
  const { setUser } = useStore();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const mismatch = confirm.length > 0 && confirm !== password;
  const match = confirm.length > 0 && confirm === password;
  const valid = name && email && password.length >= 6 && match;

  return (
    <div className="flex h-full flex-col pb-8">
      <ScreenHeader title={t("auth.createAccount")} onBack={() => navigate("login")} />

      <form
        className="flex flex-1 flex-col px-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          setUser({ name, email });
          navigate("home");
        }}
      >
        <p className="mb-6 text-muted-foreground">{t("auth.registerSubtitle")}</p>

        <Field icon={User} label={t("auth.fullName")}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Andini Putri"
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </Field>
        <div className="h-4" />
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
            placeholder={t("auth.minChars")}
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
        <div className="h-4" />
        <Field icon={Lock} label={t("auth.confirmPassword")}>
          <input
            type={show ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder={t("auth.reenter")}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
          {match && <CheckCircle2 className="h-5 w-5 text-primary" />}
        </Field>
        {mismatch && <p className="mt-2 text-sm text-destructive">{t("auth.mismatch")}</p>}

        <div className="flex-1" />

        <Button
          type="submit"
          disabled={!valid}
          className="h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
        >
          {t("auth.register")}
        </Button>
        <p className="mt-5 text-center text-muted-foreground">
          {t("auth.haveAccount")}{" "}
          <button type="button" onClick={() => navigate("login")} className="text-primary">
            {t("auth.login")}
          </button>
        </p>
      </form>
    </div>
  );
}
