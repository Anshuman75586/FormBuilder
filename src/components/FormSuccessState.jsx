import { motion } from "motion/react";
import { CheckCircle2, Database } from "lucide-react";

export function FormSuccessState({ submittedData, submissionCount, onReset }) {
  const formatValue = (field) => {
    if (Array.isArray(field.value)) {
      return field.value.length > 0 ? field.value.join(", ") : "—";
    }
    return field.value || "—";
  };

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center py-6"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
        className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5"
      >
        <CheckCircle2 size={32} strokeWidth={2} />
      </motion.div>

      <h3 className="text-xl font-bold text-on-surface tracking-tight">
        Saved to Storage
      </h3>
      <p className="text-xs text-on-surface-variant font-medium mt-1 mb-8">
        Submission{" "}
        <span className="font-bold text-primary">#{submissionCount}</span> saved
        to{" "}
        <span className="font-mono text-on-surface bg-surface-container-low px-1.5 py-0.5 rounded text-[11px]">
          localStorage
        </span>
      </p>

      <div className="w-full text-left mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Database size={13} className="text-primary/60" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            Stored Data
          </span>
        </div>
        <div className="border border-outline-variant/40 rounded-xl overflow-hidden divide-y divide-outline-variant/30">
          {submittedData.fields.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center justify-between px-4 py-3 bg-white hover:bg-surface-container-low/30 transition-colors"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                {f.label}
              </span>
              <span className="text-sm font-semibold text-primary text-right max-w-[55%] truncate">
                {formatValue(f)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-on-surface-variant/50 font-medium mb-6">
        {new Date(submittedData.submittedAt).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>

      <button
        onClick={onReset}
        className="px-8 py-3 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
      >
        Submit Another
      </button>
    </motion.div>
  );
}
