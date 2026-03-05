import { useMemo, useState } from "react";
import { mockApplications } from "../data/mockApplications.js";
import ApplicationTable from "../components/ApplicationTable.jsx";
import EmptyState from "../components/EmptyState.jsx";

const STATUSES = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function Applications() {
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return mockApplications
      .filter((a) => (status === "All" ? true : a.status === status))
      .filter((a) => {
        if (!q) return true;
        return (
          a.company.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q)
        );
      });
  }, [status, query]);

  return (
    <div>
      <h1>Applications</h1>
      <ApplicationTable items={filtered} />
    </div>
  );
}