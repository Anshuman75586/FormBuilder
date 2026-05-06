import { useState, useEffect } from "react";

const STORAGE_KEY = "formbuilder_submissions";

export function useSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  const refreshSubmissions = () => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setSubmissions(data);
    } catch {
      setSubmissions([]);
    }
  };

  useEffect(() => {
    refreshSubmissions();
  }, []);

  const saveSubmission = (data) => {
    let current = [];
    try {
      current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {}
    
    const entry = { id: Date.now(), submittedAt: new Date().toISOString(), data };
    current.push(entry);
    setSubmissions(current);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return current.length;
  };

  const deleteSubmission = (id) => {
    const updated = submissions.filter(s => s.id !== id);
    setSubmissions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearSubmissions = () => {
    setSubmissions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    submissions,
    saveSubmission,
    deleteSubmission,
    clearSubmissions,
    refreshSubmissions
  };
}
