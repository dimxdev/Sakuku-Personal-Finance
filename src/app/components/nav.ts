export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "register"
  | "home"
  | "add-income"
  | "add-expense"
  | "savings"
  | "reminders"
  | "history"
  | "reports"
  | "profile"
  | "edit-profile"
  | "help-center"
  | "about-app"
  | "change-password"
  | "privacy-data"
  | "payment-methods"
  | "language-settings"
  | "help-support";

export type Navigate = (screen: Screen) => void;
