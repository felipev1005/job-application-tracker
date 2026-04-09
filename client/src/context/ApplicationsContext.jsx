import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const ApplicationsContext = createContext();

const BASE_URL = (
  import.meta.env.VITE_API_URL || "https://job-application-tracker-hspy.onrender.com"
).replace(/\/+$/, "");

const API_BASE_URL = `${BASE_URL}/api/applications`;

console.log("APPLICATIONS API BASE URL:", API_BASE_URL);

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
  const { token, isAuthenticated } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function fetchApplications() {
    if (!isAuthenticated || !token) {
      setApplications([]);
      setLoading(false);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load applications.");
      }

      setApplications(data);
    } catch (err) {
      setError(err.message || "Something went wrong while loading data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, [isAuthenticated, token]);

  async function addApplication(values) {
    try {
      setSubmitting(true);
      setError("");

      const payload = normalizeApplication(values);

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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