const express = require("express");
const router = express.Router();
const { pool } = require("../db/database");
const { requireAuth } = require("../middleware/authMiddleware");

function mapApplicationRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    company: row.company,
    role: row.role,
    status: row.status,
    location: row.location || "",
    link: row.link || "",
    dateApplied: row.date_applied || "",
    notes: row.notes || "",
    createdAt: row.created_at,
  };
}

router.get("/", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM applications
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    const applications = result.rows.map(mapApplicationRow);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications." });
  }
});

router.post("/", requireAuth, async (req, res) => {
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

  try {
    const result = await pool.query(
      `
      INSERT INTO applications (
        user_id,
        company,
        role,
        status,
        location,
        link,
        date_applied,
        notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        req.user.id,
        company.trim(),
        role.trim(),
        status,
        location.trim(),
        link.trim(),
        dateApplied,
        notes.trim(),
      ]
    );

    res.status(201).json(mapApplicationRow(result.rows[0]));
  } catch (error) {
    res.status(500).json({ error: "Failed to create application." });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
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

  try {
    const result = await pool.query(
      `
      UPDATE applications
      SET
        company = $1,
        role = $2,
        status = $3,
        location = $4,
        link = $5,
        date_applied = $6,
        notes = $7
      WHERE id = $8 AND user_id = $9
      RETURNING *
      `,
      [
        company.trim(),
        role.trim(),
        status,
        location.trim(),
        link.trim(),
        dateApplied,
        notes.trim(),
        id,
        req.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found." });
    }

    res.json(mapApplicationRow(result.rows[0]));
  } catch (error) {
    res.status(500).json({ error: "Failed to update application." });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      DELETE FROM applications
      WHERE id = $1 AND user_id = $2
      RETURNING id
      `,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Application not found." });
    }

    res.json({ message: "Application deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete application." });
  }
});

module.exports = router;