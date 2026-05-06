import { motion } from "motion/react";
import { Plus } from "lucide-react";

export function FormEmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-24 text-center flex flex-col items-center justify-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/40 border border-primary/10">
        <Plus size={32} />
      </div>
      <div className="space-y-1">
        <p className="text-base font-bold text-on-surface">
          No fields added yet
        </p>
        <p className="text-sm text-on-surface-variant max-w-[240px] mx-auto">
          Start building your form by adding components from the sidebar
        </p>
      </div>
    </motion.div>
  );
}
