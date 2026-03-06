import { createContext, useContext, useMemo, useState } from "react";
import { mockApplications } from "../data/mockApplications.js";

const ApplicationsContext = createContext();

function normalizeApplication(values) {
  return {
    company: values.company.trim(),
    role: values.role.trim(),
    status: values.status || "Applied",
    location: values.location?.trim() || "",
    link: values.link?.trim() || "",
    dateApplied: values.dateApplied || "",
    notes: values.notes?.trim() || "",
  };
}

export function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(mockApplications);

  function addApplication(values) {
    const normalized = normalizeApplication(values);

    const newApplication = {
      id: Date.now(),
      ...normalized,
      createdAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApplication, ...prev]);
  }

  function updateApplication(id, values) {
    const normalized = normalizeApplication(values);

    setApplications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...normalized,
            }
          : item
      )
    );
  }

  function deleteApplication(id) {
    setApplications((prev) => prev.filter((item) => item.id !== id));
  }

  const value = useMemo(
    () => ({
      applications,
      addApplication,
      updateApplication,
      deleteApplication,
    }),
    [applications]
  );

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationsContext);

  if (!context) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }

  return context;
}