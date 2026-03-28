const express = require("express");
const router = express.Router();
const { db } = require("../db/database");
const { requireAuth } = require("../middleware/authMiddleware");

function mapApplicationRow(row) {
  return {
    id: row.id,
    userId: row.userId,
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

router.get("/", requireAuth, (req, res) => {
  const query = `
    SELECT *
    FROM applications
    WHERE userId = ?
    ORDER BY datetime(createdAt) DESC
  `;

  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch applications." });
    }

    const applications = rows.map(mapApplicationRow);
    res.json(applications);
  });
});

router.post("/", requireAuth, (req, res) => {
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
      userId,
      company,
      role,
      status,
      location,
      link,
      dateApplied,
      notes,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    req.user.id,
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
      userId: req.user.id,
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

router.put("/:id", requireAuth, (req, res) => {
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
    WHERE id = ? AND userId = ?
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
    req.user.id,
  ];

  db.run(query, params, function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to update application." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Application not found." });
    }

    db.get(
      `SELECT * FROM applications WHERE id = ? AND userId = ?`,
      [id, req.user.id],
      (fetchErr, row) => {
        if (fetchErr) {
          return res
            .status(500)
            .json({ error: "Application updated, but failed to fetch it." });
        }

        res.json(mapApplicationRow(row));
      }
    );
  });
});

router.delete("/:id", requireAuth, (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM applications WHERE id = ? AND userId = ?`,
    [id, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to delete application." });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Application not found." });
      }

      res.json({ message: "Application deleted successfully." });
    }
  );
});

module.exports = router;