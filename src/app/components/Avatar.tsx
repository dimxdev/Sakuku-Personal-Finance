import type { User } from "../data/store";

export function Avatar({ user, size = 64 }: { user: User; size?: number }) {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full bg-primary/15 text-primary"
      style={{ width: size, height: size, fontSize: size * 0.4, fontWeight: 700 }}
    >
      {user.name.charAt(0).toUpperCase()}
    </div>
  );
}
