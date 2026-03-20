import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ApplicationsContext = createContext();

const API_BASE_URL = "http://localhost:5000/api/applications";

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
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function fetchApplications() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_BASE_URL);

      if (!response.ok) {
        throw new Error("Failed to load applications.");
      }

      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError(err.message || "Something went wrong while loading data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  async function addApplication(values) {
    try {
      setSubmitting(true);
      setError("");

      const payload = normalizeApplication(values);

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create application.");
      }

      setApplications((prev) => [data, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message || "Something went wrong while creating data.");
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  }

  async function updateApplication(id, values) {
    try {
      setSubmitting(true);
      setError("");

      const payload = normalizeApplication(values);

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update application.");
      }

      setApplications((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );

      return { success: true };
    } catch (err) {
      setError(err.message || "Something went wrong while updating data.");
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteApplication(id) {
    try {
      setSubmitting(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete application.");
      }

      setApplications((prev) => prev.filter((item) => item.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message || "Something went wrong while deleting data.");
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  }

  const value = useMemo(
    () => ({
      applications,
      loading,
      submitting,
      error,
      fetchApplications,
      addApplication,
      updateApplication,
      deleteApplication,
    }),
    [applications, loading, submitting, error]
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