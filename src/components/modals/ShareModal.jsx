import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Share2, Copy, CheckCircle2 } from "lucide-react";

export function ShareModal({ isOpen, onClose, fields }) {
  const [copied, setCopied] = useState(false);



  const handleCopyLink = () => {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(fields)));
      const url = `${window.location.origin}${window.location.pathname}?schema=${encoded}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert("Failed to generate link. The form might be too large.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-sm bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <Share2 size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface leading-tight">Share Form</h2>
                  <p className="text-xs text-on-surface-variant font-medium">Export or share your layout</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-3 py-4 bg-surface-container-low hover:bg-surface-container border border-outline-variant/50 rounded-xl transition-all group"
              >
                {copied ? (
                  <CheckCircle2 size={20} className="text-success" />
                ) : (
                  <Copy size={20} className="text-primary group-hover:scale-110 transition-transform" />
                )}
                <span className={`font-bold text-sm ${copied ? 'text-success' : 'text-on-surface'}`}>
                  {copied ? "Link Copied!" : "Copy Shareable Link"}
                </span>
              </button>


            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
