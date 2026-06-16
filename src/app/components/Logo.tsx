import { Wallet } from "lucide-react";

export function Logo({ size = 64 }: { size?: number }) {
  return (
    <div
      className="grid place-items-center rounded-[28%] shadow-lg shadow-emerald-500/30"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      }}
    >
      <Wallet color="#fff" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={2.2} />
    </div>
  );
}
