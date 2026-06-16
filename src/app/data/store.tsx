import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  Briefcase,
  Gift,
  TrendingUp,
  Utensils,
  ShoppingBag,
  Car,
  Home as HomeIcon,
  Zap,
  Coffee,
  HeartPulse,
  GraduationCap,
  PiggyBank,
  type LucideIcon,
} from "lucide-react";

export type TxType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TxType;
  amount: number;
  category: string;
  date: string; // ISO date
  note?: string;
  noteKey?: string; // translation key for seeded notes
}

export interface SavingsGoal {
  id: string;
  name: string;
  nameKey?: string;
  target: number;
  saved: number;
  color: string;
}

export interface Reminder {
  id: string;
  title: string;
  titleKey?: string;
  time: string; // HH:mm
  repeat: string; // translation key, e.g. "rep.daily"
  enabled: boolean;
}

export const incomeCategories = [
  { name: "Salary", icon: Briefcase, color: "#10b981" },
  { name: "Freelance", icon: TrendingUp, color: "#3b82f6" },
  { name: "Gift", icon: Gift, color: "#f59e0b" },
  { name: "Investment", icon: PiggyBank, color: "#8b5cf6" },
] as const;

export const expenseCategories = [
  { name: "Food & Drink", icon: Utensils, color: "#ef4444" },
  { name: "Shopping", icon: ShoppingBag, color: "#f59e0b" },
  { name: "Transport", icon: Car, color: "#3b82f6" },
  { name: "Bills", icon: Zap, color: "#8b5cf6" },
  { name: "Housing", icon: HomeIcon, color: "#06b6d4" },
  { name: "Coffee", icon: Coffee, color: "#a16207" },
  { name: "Health", icon: HeartPulse, color: "#ec4899" },
  { name: "Education", icon: GraduationCap, color: "#10b981" },
] as const;

const categoryIconMap: Record<string, LucideIcon> = {};
[...incomeCategories, ...expenseCategories].forEach((c) => {
  categoryIconMap[c.name] = c.icon;
});
const categoryColorMap: Record<string, string> = {};
[...incomeCategories, ...expenseCategories].forEach((c) => {
  categoryColorMap[c.name] = c.color;
});

export function categoryIcon(name: string): LucideIcon {
  return categoryIconMap[name] ?? PiggyBank;
}
export function categoryColor(name: string): string {
  return categoryColorMap[name] ?? "#6b7280";
}
export function categoryKey(name: string): string {
  return "cat." + name;
}

export function formatRupiah(n: number): string {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

const today = new Date();
function daysAgo(d: number) {
  const dt = new Date(today);
  dt.setDate(dt.getDate() - d);
  return dt.toISOString().slice(0, 10);
}

const seedTransactions: Transaction[] = [
  { id: "t1", type: "income", amount: 6500000, category: "Salary", date: daysAgo(2), noteKey: "note.salary" },
  { id: "t2", type: "expense", amount: 48000, category: "Food & Drink", date: daysAgo(0), noteKey: "note.lunch" },
  { id: "t3", type: "expense", amount: 25000, category: "Transport", date: daysAgo(0), noteKey: "note.gojek" },
  { id: "t4", type: "expense", amount: 32000, category: "Coffee", date: daysAgo(1), note: "Kopi Kenangan" },
  { id: "t5", type: "income", amount: 1200000, category: "Freelance", date: daysAgo(3), noteKey: "note.logo" },
  { id: "t6", type: "expense", amount: 350000, category: "Shopping", date: daysAgo(4), noteKey: "note.headphones" },
  { id: "t7", type: "expense", amount: 180000, category: "Bills", date: daysAgo(5), noteKey: "note.internet" },
  { id: "t8", type: "expense", amount: 1500000, category: "Housing", date: daysAgo(6), noteKey: "note.rent" },
  { id: "t9", type: "expense", amount: 95000, category: "Health", date: daysAgo(8), noteKey: "note.pharmacy" },
  { id: "t10", type: "income", amount: 300000, category: "Gift", date: daysAgo(10), noteKey: "note.birthday" },
  { id: "t11", type: "expense", amount: 220000, category: "Education", date: daysAgo(12), noteKey: "note.course" },
  { id: "t12", type: "expense", amount: 67000, category: "Food & Drink", date: daysAgo(13), noteKey: "note.groceries" },
];

const seedGoals: SavingsGoal[] = [
  { id: "g1", name: "Emergency Fund", nameKey: "goal.emergency", target: 15000000, saved: 9200000, color: "#10b981" },
  { id: "g2", name: "New Laptop", nameKey: "goal.laptop", target: 18000000, saved: 6500000, color: "#3b82f6" },
  { id: "g3", name: "Bali Holiday", nameKey: "goal.bali", target: 8000000, saved: 7100000, color: "#f59e0b" },
];

const seedReminders: Reminder[] = [
  { id: "r1", title: "Log daily expenses", titleKey: "rem.logDaily", time: "20:00", repeat: "rep.daily", enabled: true },
  { id: "r2", title: "Pay electricity bill", titleKey: "rem.electricity", time: "09:00", repeat: "rep.monthly25", enabled: true },
  { id: "r3", title: "Review savings goals", titleKey: "rem.review", time: "18:30", repeat: "rep.sundays", enabled: false },
];

interface StoreValue {
  user: User;
  setUser: (u: User) => void;
  transactions: Transaction[];
  goals: SavingsGoal[];
  reminders: Reminder[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  addToGoal: (goalId: string, amount: number) => void;
  addGoal: (g: Omit<SavingsGoal, "id">) => void;
  editGoal: (id: string, g: Omit<SavingsGoal, "id">) => void;
  removeGoal: (id: string) => void;
  toggleReminder: (id: string) => void;
  addReminder: (r: Omit<Reminder, "id">) => void;
  editReminder: (id: string, r: Omit<Reminder, "id">) => void;
  removeReminder: (id: string) => void;
  totals: { balance: number; income: number; expense: number; saved: number; savedTarget: number };
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    name: "Andini Putri",
    email: "andini@sakuku.app",
    phone: "+62 812-3456-7890",
  });
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);
  const [goals, setGoals] = useState<SavingsGoal[]>(seedGoals);
  const [reminders, setReminders] = useState<Reminder[]>(seedReminders);

  const addTransaction: StoreValue["addTransaction"] = (t) =>
    setTransactions((prev) => [{ ...t, id: "t" + Date.now() }, ...prev]);

  const addToGoal: StoreValue["addToGoal"] = (goalId, amount) =>
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, saved: Math.min(g.target, g.saved + amount) } : g)),
    );

  const addGoal: StoreValue["addGoal"] = (g) =>
    setGoals((prev) => [...prev, { ...g, id: "g" + Date.now() }]);

  const editGoal: StoreValue["editGoal"] = (id, g) =>
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...g, id } : goal)));

  const removeGoal: StoreValue["removeGoal"] = (id) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  const toggleReminder: StoreValue["toggleReminder"] = (id) =>
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));

  const addReminder: StoreValue["addReminder"] = (r) =>
    setReminders((prev) => [...prev, { ...r, id: "r" + Date.now() }]);

  const editReminder: StoreValue["editReminder"] = (id, r) =>
    setReminders((prev) => prev.map((rem) => (rem.id === id ? { ...r, id } : rem)));

  const removeReminder: StoreValue["removeReminder"] = (id) =>
    setReminders((prev) => prev.filter((r) => r.id !== id));

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const saved = goals.reduce((s, g) => s + g.saved, 0);
    const savedTarget = goals.reduce((s, g) => s + g.target, 0);
    return { balance: income - expense, income, expense, saved, savedTarget };
  }, [transactions, goals]);

  const value: StoreValue = {
    user,
    setUser,
    transactions,
    goals,
    reminders,
    addTransaction,
    addToGoal,
    addGoal,
    editGoal,
    removeGoal,
    toggleReminder,
    addReminder,
    editReminder,
    removeReminder,
    totals,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
