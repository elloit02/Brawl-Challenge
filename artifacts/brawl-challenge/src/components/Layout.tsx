import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface Props {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, activePage, onNavigate }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => {
          onNavigate(page);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
          {children}
        </main>
        <footer className="border-t border-border p-4 flex flex-wrap gap-4 justify-center text-center">
          <button onClick={() => onNavigate("privacy")} className="footer-link">Privacy Policy</button>
          <button onClick={() => onNavigate("tos")} className="footer-link">Terms of Service</button>
          <button onClick={() => onNavigate("faq")} className="footer-link">FAQ</button>
          <button onClick={() => onNavigate("more-about")} className="footer-link">More About Brawl Challenge</button>
        </footer>
      </div>
    </div>
  );
}
