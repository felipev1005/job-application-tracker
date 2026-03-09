const express = require("express");
const router = express.Router();
const { db } = require("../db/database");

function mapApplicationRow(row) {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    status: row.status,
    location: row.location || "",
    link: row.link || "",
    dateApplied: row.dateApplied || "",
    notes: row.notes || "",
    createdAt: row.createdAt,
  };
}

router.get("/", (req, res) => {
  const query = `
    SELECT *
    FROM applications
    ORDER BY datetime(createdAt) DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch applications." });
    }

    const applications = rows.map(mapApplicationRow);
    res.json(applications);
  });
});

router.post("/", (req, res) => {
  const {
    company,
    role,
    status = "Applied",
    location = "",
    link = "",
    dateApplied = "",
    notes = "",
  } = req.body;

  if (!company || !company.trim()) {
    return res.status(400).json({ error: "Company is required." });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({ error: "Role is required." });
  }

  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO applications (
      company,
      role,
      status,
      location,
      link,
      dateApplied,
      notes,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    company.trim(),
    role.trim(),
    status,
    location.trim(),
    link.trim(),
    dateApplied,
    notes.trim(),
    createdAt,
  ];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to create application." });
    }

    res.status(201).json({
      id: this.lastID,
      company: company.trim(),
      role: role.trim(),
      status,
      location: location.trim(),
      link: link.trim(),
      dateApplied,
      notes: notes.trim(),
      createdAt,
    });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    company,
    role,
    status = "Applied",
    location = "",
    link = "",
    dateApplied = "",
    notes = "",
  } = req.body;

  if (!company || !company.trim()) {
    return res.status(400).json({ error: "Company is required." });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({ error: "Role is required." });
  }

  const query = `
    UPDATE applications
    SET
      company = ?,
      role = ?,
      status = ?,
      location = ?,
      link = ?,
      dateApplied = ?,
      notes = ?
    WHERE id = ?
  `;

  const params = [
    company.trim(),
    role.trim(),
    status,
    location.trim(),
    link.trim(),
    dateApplied,
    notes.trim(),
    id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to update application." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Application not found." });
    }

    db.get(`SELECT * FROM applications WHERE id = ?`, [id], (fetchErr, row) => {
      if (fetchErr) {
        return res
          .status(500)
          .json({ error: "Application updated, but failed to fetch it." });
      }

      res.json(mapApplicationRow(row));
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM applications WHERE id = ?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete application." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Application not found." });
    }

    res.json({ message: "Application deleted successfully." });
  });
});

module.exports = router;