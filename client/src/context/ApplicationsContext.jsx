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