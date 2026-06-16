import { useState } from "react";
import { toast } from "sonner";
import { Bell, Plus, X, Clock, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { ScreenHeader } from "../ScreenHeader";
import { ConfirmDialog } from "../ConfirmDialog";
import { useStore, type Reminder } from "../../data/store";
import { useI18n } from "../../data/i18n";
import type { Navigate } from "../nav";

const repeatKeys = ["rep.daily", "rep.sundays", "rep.monthly25", "rep.weekdays"];

export function RemindersScreen({ navigate }: { navigate: Navigate }) {
  const { reminders, toggleReminder, addReminder, editReminder, removeReminder } = useStore();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("20:00");
  const [repeat, setRepeat] = useState(repeatKeys[0]);

  const reminderTitle = (r: Reminder) => (r.titleKey ? t(r.titleKey) : r.title);

  const openNew = () => {
    setEditingId(null);
    setTitle("");
    setTime("20:00");
    setRepeat(repeatKeys[0]);
    setOpen(true);
  };

  const openEdit = (r: Reminder) => {
    setEditingId(r.id);
    setTitle(reminderTitle(r));
    setTime(r.time);
    setRepeat(r.repeat);
    setOpen(true);
  };

  const save = () => {
    if (!title.trim()) {
      toast.error(t("rem.enterTitle"));
      return;
    }
    if (editingId) {
      const enabled = reminders.find((r) => r.id === editingId)?.enabled ?? true;
      editReminder(editingId, { title: title.trim(), time, repeat, enabled });
      toast.success(t("rem.updated"));
    } else {
      addReminder({ title: title.trim(), time, repeat, enabled: true });
      toast.success(t("rem.added"));
    }
    setOpen(false);
    setEditingId(null);
    setTitle("");
    setTime("20:00");
    setRepeat(repeatKeys[0]);
  };

  const remove = () => {
    if (deleteId) {
      removeReminder(deleteId);
      toast.success(t("rem.removed"));
    }
    setDeleteId(null);
  };

  return (
    <div className="flex h-full flex-col">
      <ScreenHeader
        title={t("rem.title")}
        onBack={() => navigate("home")}
        action={
          <button
            onClick={openNew}
            aria-label={t("common.add")}
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"
          >
            <Plus className="h-5 w-5" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="mb-4 flex items-center gap-3 rounded-2xl bg-secondary/10 p-4 text-secondary">
          <Bell className="h-5 w-5 shrink-0" />
          <p className="text-sm">{t("rem.intro")}</p>
        </div>

        <div className="space-y-3">
          {reminders.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-3xl border border-border bg-card p-4">
              <div
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                style={{ background: r.enabled ? "#10b9811a" : "var(--accent)", color: r.enabled ? "#10b981" : "#9ca3af" }}
              >
                <Clock className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate" style={{ fontWeight: 600 }}>
                  {reminderTitle(r)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {r.time} · {t(r.repeat)}
                </p>
              </div>
              <button
                aria-label={t("common.edit")}
                onClick={() => openEdit(r)}
                className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-accent"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                aria-label={t("common.delete")}
                onClick={() => setDeleteId(r.id)}
                className="grid h-9 w-9 place-items-center rounded-full text-destructive transition-colors hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <Switch checked={r.enabled} onCheckedChange={() => toggleReminder(r.id)} />
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="absolute inset-0 z-30 flex items-end bg-black/40"
          onClick={() => {
            setOpen(false);
            setEditingId(null);
          }}
        >
          <div className="w-full rounded-t-3xl bg-background p-6 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3>{editingId ? t("rem.editTitle") : t("rem.new")}</h3>
              <button
                onClick={() => {
                  setOpen(false);
                  setEditingId(null);
                }}
                aria-label={t("common.cancel")}
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("rem.titleLabel")}</p>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("rem.titlePlaceholder")}
              className="w-full rounded-2xl border border-border bg-accent px-4 py-3.5 outline-none focus:border-primary"
            />

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("rem.notifTime")}</p>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-2xl border border-border bg-accent px-4 py-3.5 outline-none focus:border-primary"
            />

            <p className="mb-2 mt-4 text-sm text-muted-foreground">{t("rem.repeat")}</p>
            <div className="flex flex-wrap gap-2">
              {repeatKeys.map((o) => (
                <button
                  key={o}
                  onClick={() => setRepeat(o)}
                  className="rounded-full border px-4 py-2 text-sm transition-colors"
                  style={{
                    borderColor: repeat === o ? "#10b981" : "var(--border)",
                    background: repeat === o ? "#10b9811a" : "transparent",
                    color: repeat === o ? "#10b981" : "var(--foreground)",
                  }}
                >
                  {t(o)}
                </button>
              ))}
            </div>

            <Button
              onClick={save}
              className="mt-6 h-14 w-full rounded-2xl bg-primary text-base text-primary-foreground hover:bg-primary/90"
            >
              {editingId ? t("rem.saveChanges") : t("rem.save")}
            </Button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title={t("common.delete") + "?"}
        message={t("rem.removeConfirm")}
        confirmLabel={t("common.delete")}
        danger
        onConfirm={remove}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
