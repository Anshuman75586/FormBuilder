import { useState, useEffect } from "react";

export function useForm(fields) {
  const [formValues, setFormValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    setSubmitted(false);
    setFormValues({});
  }, [fields]);

  const handleChange = (fieldId, value) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleCheckbox = (fieldId, optValue, checked) => {
    setFormValues((prev) => {
      const current = Array.isArray(prev[fieldId]) ? prev[fieldId] : [];
      return {
        ...prev,
        [fieldId]: checked
          ? [...current, optValue]
          : current.filter((v) => v !== optValue),
      };
    });
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormValues({});
    setSubmittedData(null);
  };

  return {
    formValues,
    setFormValues,
    submitted,
    setSubmitted,
    submittedData,
    setSubmittedData,
    handleChange,
    handleCheckbox,
    resetForm,
  };
}
