import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SubmissionHistoryModal } from "../components/modals/SubmissionHistoryModal";

export function Layout({ sidebar, children, isSidebarOpen, onToggleSidebar, onOpenShare }) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        onToggleSidebar={onToggleSidebar}
        isSidebarOpen={isSidebarOpen}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenShare={onOpenShare}
      />
      <SubmissionHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />

      <main
        aria-label="Form builder workspace"
        className="pt-16 flex flex-1 relative overflow-hidden"
      >
        {sidebar}
        
        <section
          aria-label="Form preview"
          className="flex-1 px-4 md:px-8 py-8 bg-background overflow-y-auto relative z-10"
        >
          <div className="max-w-3xl mx-auto w-full flex flex-col min-h-[calc(100vh-128px)]">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}
