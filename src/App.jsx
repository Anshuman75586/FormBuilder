import { useState, useEffect } from "react";
import Lenis from "lenis";
import { Menu, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { BuilderPanel } from "./components/BuilderPanel";
import { FormPreview } from "./components/FormPreview";
import { INITIAL_FIELDS } from "./utils/data";
import { Layout } from "./layout/Layout";
import { ShareModal } from "./components/modals/ShareModal";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const schema = searchParams.get('schema');
    if (schema) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(schema)));
        if (Array.isArray(decoded)) {
          setFields(decoded);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (e) {
        console.error("Failed to parse schema from URL", e);
      }
    }
  }, []);

  const [fields, setFields] = useState(INITIAL_FIELDS);

  const handleAddField = (field) => {
    setFields([...fields, field]);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleReorder = (newFields) => {
    setFields(newFields);
  };

  const sidebar = (
    <>
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div
        id="builder-sidebar"
        role="complementary"
        aria-label="Builder panel"
        className={`
        fixed md:static top-16 bottom-0 left-0 z-50 md:z-auto transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${isSidebarOpen ? "translate-x-0 w-[310px] shadow-2xl" : "-translate-x-full md:translate-x-0 w-[320px] shadow-none"}
        md:sticky md:h-[calc(100vh-64px)]
      `}
      >
        <BuilderPanel
          fields={fields}
          onAddField={handleAddField}
          onRemoveField={handleRemoveField}
          onReorder={handleReorder}
        />
      </div>
    </>
  );

  return (
    <Layout
      sidebar={sidebar}
      isSidebarOpen={isSidebarOpen}
      onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      onOpenShare={() => setIsShareOpen(true)}
    >
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="md:hidden mb-8 max-w-sm mx-auto p-4 bg-white/50 backdrop-blur-sm border border-primary/10 rounded-2xl flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Plus size={20} />
              </motion.div>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-black text-primary uppercase tracking-[0.1em]">
                Ready to Build?
              </p>
              <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">
                Toggle the menu to access builder tools
              </p>
            </div>
            <div className="pr-1">
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-primary"
              >
                <Menu size={16} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <FormPreview fields={fields} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} fields={fields} />
    </Layout>
  );
}
