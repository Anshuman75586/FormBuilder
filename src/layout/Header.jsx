import { motion } from "motion/react";
import { Menu, X, History, Share2 } from "lucide-react";

export function Header({ onToggleSidebar, isSidebarOpen, onOpenHistory, onOpenShare }) {
  return (
    <header className="fixed top-0 z-50 bg-white/95 backdrop-blur-sm flex justify-between items-center w-full px-6 h-16 border-b border-outline-variant/30">
      <div className="flex flex-col justify-center">
        <h1 className="text-xl font-bold text-on-surface tracking-tight leading-none">
          FormBuilder
        </h1>
        <span className="hidden md:block text-[10px] text-on-surface-variant/40 font-medium tracking-wide mt-0.5">
          by Anshul Gourkede
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border-r border-outline-variant/30 pr-4">
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs font-bold bg-surface-container-low text-on-surface rounded-full border border-outline-variant/30 hover:border-primary/30 hover:text-primary transition-all active:scale-[0.98]"
          >
            <History size={16} />
            <span className="hidden sm:inline">Submissions</span>
          </button>
          
          <button
            onClick={onOpenShare}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs font-bold bg-primary text-on-primary rounded-full hover:opacity-90 transition-all active:scale-[0.98] shadow-md shadow-primary/20"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
        <span className="hidden md:block text-xs font-semibold text-on-surface-variant/50 tracking-widest uppercase pl-0">
          Dynamic Form Builder
        </span>
        <button
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isSidebarOpen}
          aria-controls="builder-sidebar"
          className="md:hidden p-2 flex items-center justify-center w-10 h-10 rounded-full text-on-surface-variant border border-outline-variant/30 active:scale-90 transition-transform"
        >
          <motion.div
            animate={{ rotate: isSidebarOpen ? 90 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </button>
      </div>
    </header>
  );
}
