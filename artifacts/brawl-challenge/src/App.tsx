import { useState, useEffect } from "react";
import { UserProvider } from "@/contexts/UserContext";
import Layout from "@/components/Layout";
import DailyChallenge from "@/pages/DailyChallenge";
import SpeedChallenge from "@/pages/SpeedChallenge";
import TrophyChallenge from "@/pages/TrophyChallenge";
import QuizMode from "@/pages/QuizMode";
import History from "@/pages/History";
import Profile from "@/pages/Profile";
import About from "@/pages/About";
import PrivacyPage from "@/pages/PrivacyPage";
import TOSPage from "@/pages/TOSPage";
import FAQPage from "@/pages/FAQPage";
import MoreAboutPage from "@/pages/MoreAboutPage";

type Page =
  | "daily"
  | "speed"
  | "trophy"
  | "quiz"
  | "history"
  | "profile"
  | "about"
  | "privacy"
  | "tos"
  | "faq"
  | "more-about";

// Footer pages don't use the full sidebar layout
const FOOTER_PAGES: Page[] = ["privacy", "tos", "faq", "more-about"];

function AppContent() {
  const [page, setPage] = useState<Page>("daily");

  const navigate = (p: string) => setPage(p as Page);

  const isFooterPage = FOOTER_PAGES.includes(page);

  function renderPage() {
    switch (page) {
      case "daily":
        return <DailyChallenge onNavigate={navigate} />;
      case "speed":
        return <SpeedChallenge onNavigate={navigate} />;
      case "trophy":
        return <TrophyChallenge />;
      case "quiz":
        return <QuizMode onNavigate={navigate} />;
      case "history":
        return <History />;
      case "profile":
        return <Profile />;
      case "about":
        return <About />;
      case "privacy":
        return <PrivacyPage onBack={() => setPage("about")} />;
      case "tos":
        return <TOSPage onBack={() => setPage("about")} />;
      case "faq":
        return <FAQPage onBack={() => setPage("about")} />;
      case "more-about":
        return <MoreAboutPage onBack={() => setPage("about")} />;
      default:
        return <DailyChallenge onNavigate={navigate} />;
    }
  }

  if (isFooterPage) {
    return (
      <Layout activePage={page} onNavigate={navigate}>
        {renderPage()}
      </Layout>
    );
  }

  return (
    <Layout activePage={page} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
