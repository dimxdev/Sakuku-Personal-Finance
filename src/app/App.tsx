import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import { StoreProvider } from "./data/store";
import { I18nProvider } from "./data/i18n";
import type { Screen } from "./components/nav";
import { BottomNav } from "./components/BottomNav";
import { SplashScreen } from "./components/screens/SplashScreen";
import { OnboardingScreen } from "./components/screens/OnboardingScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { RegisterScreen } from "./components/screens/RegisterScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { AddTransactionScreen } from "./components/screens/AddTransactionScreen";
import { SavingsScreen } from "./components/screens/SavingsScreen";
import { RemindersScreen } from "./components/screens/RemindersScreen";
import { HistoryScreen } from "./components/screens/HistoryScreen";
import { ReportsScreen } from "./components/screens/ReportsScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { EditProfileScreen } from "./components/screens/EditProfileScreen";
import { HelpCenterScreen } from "./components/screens/HelpCenterScreen";
import { AboutAppScreen } from "./components/screens/AboutAppScreen";
import { ChangePasswordScreen } from "./components/screens/ChangePasswordScreen";
import { PrivacyDataScreen } from "./components/screens/PrivacyDataScreen";
import { PaymentMethodsScreen } from "./components/screens/PaymentMethodsScreen";
import { LanguageSettingsScreen } from "./components/screens/LanguageSettingsScreen";
import { HelpSupportScreen } from "./components/screens/HelpSupportScreen";

const navScreens: Screen[] = ["home", "history", "reports", "profile"];

function PhoneApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const navigate = (s: Screen) => setScreen(s);
  const showNav = navScreens.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen navigate={navigate} />;
      case "onboarding":
        return <OnboardingScreen navigate={navigate} />;
      case "login":
        return <LoginScreen navigate={navigate} />;
      case "register":
        return <RegisterScreen navigate={navigate} />;
      case "home":
        return <HomeScreen navigate={navigate} />;
      case "add-income":
        return <AddTransactionScreen type="income" navigate={navigate} />;
      case "add-expense":
        return <AddTransactionScreen type="expense" navigate={navigate} />;
      case "savings":
        return <SavingsScreen navigate={navigate} />;
      case "reminders":
        return <RemindersScreen navigate={navigate} />;
      case "history":
        return <HistoryScreen navigate={navigate} />;
      case "reports":
        return <ReportsScreen navigate={navigate} />;
      case "profile":
        return <ProfileScreen navigate={navigate} />;
      case "edit-profile":
        return <EditProfileScreen navigate={navigate} />;
      case "help-center":
        return <HelpCenterScreen navigate={navigate} />;
      case "about-app":
        return <AboutAppScreen navigate={navigate} />;
      case "change-password":
        return <ChangePasswordScreen navigate={navigate} />;
      case "privacy-data":
        return <PrivacyDataScreen navigate={navigate} />;
      case "payment-methods":
        return <PaymentMethodsScreen navigate={navigate} />;
      case "language-settings":
        return <LanguageSettingsScreen navigate={navigate} />;
      case "help-support":
        return <HelpSupportScreen navigate={navigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      {showNav && <BottomNav active={screen} navigate={navigate} />}
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <StoreProvider>
        <div className="flex h-full w-full items-center justify-center bg-background sm:bg-gradient-to-br sm:from-gray-100 sm:to-gray-200 sm:p-6">
          {/* Phone frame — on desktop shows as device mockup, on mobile fills the screen */}
          <div
            className="relative h-full w-full overflow-hidden bg-background text-foreground sm:h-[860px] sm:w-[400px] sm:rounded-[2.75rem] sm:border-8 sm:border-gray-900 sm:shadow-2xl"
            style={{ transform: "translateZ(0)" }}
          >
            {/* Notch — desktop only */}
            <div className="absolute left-1/2 top-0 z-50 hidden h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-gray-900 sm:block" />
            <PhoneApp />
            <Toaster position="top-center" richColors />
          </div>
        </div>
      </StoreProvider>
    </I18nProvider>
  );
}
