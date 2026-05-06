import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Database, Clock, CalendarDays, Inbox, Trash2, Eye } from "lucide-react";
import { useSubmissions } from "../../hooks/useSubmissions";

export function SubmissionHistoryModal({ isOpen, onClose }) {
  const { submissions, deleteSubmission, clearSubmissions, refreshSubmissions } = useSubmissions();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      refreshSubmissions();
      setExpandedId(null);
    }
  }, [isOpen]);

  const handleDelete = (id) => {
    deleteSubmission(id);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all submissions? This cannot be undone.")) {
      clearSubmissions();
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
            className="fixed top-[5%] md:top-[10%] left-1/2 -translate-x-1/2 w-[95%] max-w-2xl bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden max-h-[90vh] md:max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30 bg-surface-container-low/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <Database size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-on-surface leading-tight">Submission History</h2>
                  <p className="text-xs text-on-surface-variant font-medium">Manage your form submissions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {submissions.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-error bg-error/10 hover:bg-error/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                    Clear All
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6 overflow-y-auto flex-1 custom-scrollbar bg-surface-container-lowest">
              {submissions.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface-variant/50 mb-4 border border-outline-variant/30">
                    <Inbox size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-1">No Submissions Yet</h3>
                  <p className="text-sm text-on-surface-variant max-w-xs mx-auto">Forms that are submitted will appear here for you to review.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.slice().reverse().map((sub, reverseIdx) => {
                    const originalIdx = submissions.length - reverseIdx;
                    const isExpanded = expandedId === sub.id;
                    return (
                      <div key={sub.id} className={`border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${isExpanded ? 'border-primary/40 shadow-md' : 'border-outline-variant/40 hover:border-primary/30'}`}>
                        <div className="bg-white px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                              #{originalIdx}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                                Submission Entry
                              </span>
                              <div className="flex items-center gap-3 text-[11px] text-on-surface-variant font-medium mt-0.5">
                                <span className="flex items-center gap-1"><CalendarDays size={12}/> {new Date(sub.submittedAt).toLocaleDateString()}</span>
                                <span className="flex items-center gap-1"><Clock size={12}/> {new Date(sub.submittedAt).toLocaleTimeString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${isExpanded ? 'bg-primary text-white' : 'bg-surface-container-low text-on-surface hover:bg-surface-container'}`}
                            >
                              <Eye size={14} />
                              {isExpanded ? 'Hide Details' : 'View Details'}
                            </button>
                            <button
                              onClick={() => handleDelete(sub.id)}
                              aria-label="Delete submission"
                              className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-outline-variant/20 bg-surface-container-low/10"
                            >
                              <div className="p-4 divide-y divide-outline-variant/10">
                                {sub.data.map((field, fIdx) => (
                                  <div key={fIdx} className="py-2.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
                                    <span className="text-xs font-bold text-on-surface-variant/80 uppercase tracking-wider">{field.label}</span>
                                    <span className="text-sm font-semibold text-on-surface sm:text-right break-words">
                                      {Array.isArray(field.value) ? (field.value.length > 0 ? field.value.join(", ") : "—") : (field.value || "—")}
                                    </span>
                                  </div>
                                ))}
                                {sub.data.length === 0 && (
                                  <p className="py-2 text-sm text-on-surface-variant italic text-center">No fields recorded</p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
