import { useState } from "react";
import { toast } from "sonner";
import { Camera, User, Mail, Phone, Check } from "lucide-react";
import { Button } from "../ui/button";
import { ScreenHeader } from "../ScreenHeader";
import { Avatar } from "../Avatar";
import { useStore } from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

const presetAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
];

export function EditProfileScreen({ navigate }: { navigate: Navigate }) {
  const { user, setUser } = useStore();
  const { t } = useI18n();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [avatar, setAvatar] = useState(user.avatar);
  const [pickerOpen, setPickerOpen] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid = name.trim().length > 1 && emailValid;

  const save = () => {
    if (!valid) {
      toast.error(t("ep.checkFields"));
      return;
    }
    setUser({ name: name.trim(), email: email.trim(), phone: phone.trim(), avatar });
    toast.success(t("ep.updated"));
    navigate("profile");
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader title={t("ep.title")} onBack={() => navigate("profile")} />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Avatar */}
        <div className="flex flex-col items-center pt-2">
          <div className="relative">
            <Avatar user={{ name, email, avatar }} size={104} />
            <button
              onClick={() => setPickerOpen((o) => !o)}
              aria-label="Change photo"
              className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full border-4 border-background bg-primary text-primary-foreground"
            >
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <button onClick={() => setPickerOpen((o) => !o)} className="mt-3 text-sm text-primary">
            {t("ep.changePhoto")}
          </button>

          {pickerOpen && (
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() => {
                  setAvatar(undefined);
                  setPickerOpen(false);
                }}
                className="grid h-14 w-14 place-items-center rounded-full border border-border text-sm text-muted-foreground"
              >
                {t("ep.none")}
              </button>
              {presetAvatars.map((src) => (
                <button
                  key={src}
                  onClick={() => {
                    setAvatar(src);
                    setPickerOpen(false);
                  }}
                  className="overflow-hidden rounded-full ring-2 ring-transparent focus:ring-primary"
                >
                  <img src={src} alt="Avatar option" className="h-14 w-14 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="mt-8 space-y-4">
          <Field icon={User} label={t("ep.fullName")}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </Field>
          <div>
            <Field icon={Mail} label={t("ep.email")}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </Field>
            {!emailValid && email.length > 0 && (
              <p className="mt-1.5 px-1 text-sm text-destructive">{t("ep.invalidEmail")}</p>
            )}
          </div>
          <Field icon={Phone} label={t("ep.phone")}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+62 ..."
              className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </Field>
        </div>
      </div>

      <div className="px-5 pb-8 pt-2">
        <Button
          onClick={save}
          disabled={!valid}
          className="h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
        >
          <Check className="h-5 w-5" />
          {t("common.saveChanges")}
        </Button>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block px-1 text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-accent px-4 py-3.5 focus-within:border-primary">
        <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
        {children}
      </div>
    </label>
  );
}
