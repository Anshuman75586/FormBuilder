import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "../hooks/useForm";
import { useSubmissions } from "../hooks/useSubmissions";
import { FormField } from "./FormField";
import { FormSuccessState } from "./FormSuccessState";
import { FormEmptyState } from "./FormEmptyState";

export function FormPreview({ fields }) {
  const {
    formValues,
    submitted,
    setSubmitted,
    submittedData,
    setSubmittedData,
    handleChange,
    handleCheckbox,
    resetForm,
  } = useForm(fields);

  const { saveSubmission } = useSubmissions();
  const [submissionCount, setSubmissionCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const snapshot = fields.map((f) => ({
      label: f.label,
      type: f.type,
      value: formValues[f.id] ?? (f.type === "checkbox" ? [] : ""),
    }));
    const count = saveSubmission(snapshot);
    setSubmittedData({ fields: snapshot, submittedAt: new Date().toISOString() });
    setSubmissionCount(count);
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white border border-outline-variant/50 rounded-2xl shadow-xl shadow-black/5 overflow-hidden mb-8">
      <div className="bg-surface-container-low/30 px-8 py-6 border-b border-outline-variant/30">
        <h2 className="text-xl font-bold text-on-surface tracking-tight">
          Form Preview
        </h2>
        <p className="text-xs text-on-surface-variant font-medium mt-1">
          Fill and submit your form below
        </p>
      </div>

      <div className="p-8 md:p-10">
        <AnimatePresence mode="wait">
          {fields.length === 0 ? (
            <FormEmptyState key="empty" />
          ) : submitted && submittedData ? (
            <FormSuccessState
              key="success"
              submittedData={submittedData}
              submissionCount={submissionCount}
              onReset={resetForm}
            />
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="space-y-2"
                  >
                    <label
                      htmlFor={`field-${field.id}`}
                      className="text-sm font-bold text-on-surface flex items-center gap-1"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-error font-bold" aria-hidden="true">*</span>
                      )}
                      {field.required && (
                        <span className="sr-only">(required)</span>
                      )}
                    </label>

                    <div className="relative transition-all">
                      <FormField
                        field={field}
                        value={formValues[field.id]}
                        onChange={handleChange}
                        onCheckboxChange={handleCheckbox}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:bg-primary/95 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
                >
                  Submit Form
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3.5 border border-outline-variant text-on-surface-variant font-bold text-sm rounded-xl hover:bg-surface-container-low active:scale-[0.99] transition-all"
                >
                  Clear All
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
