const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../db/database");

const router = express.Router();

const JWT_SECRET = "super_secret_job_tracker_key";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required." });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ error: "Email is required." });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [normalizedEmail],
    async (checkErr, existingUser) => {
      if (checkErr) {
        return res.status(500).json({ error: "Failed to check existing user." });
      }

      if (existingUser) {
        return res.status(409).json({ error: "Email is already registered." });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString();

        db.run(
          `
            INSERT INTO users (name, email, password, createdAt)
            VALUES (?, ?, ?, ?)
          `,
          [name.trim(), normalizedEmail, hashedPassword, createdAt],
          function (insertErr) {
            if (insertErr) {
              return res.status(500).json({ error: "Failed to create user." });
            }

            const user = {
              id: this.lastID,
              name: name.trim(),
              email: normalizedEmail,
            };

            const token = generateToken(user);

            res.status(201).json({
              message: "User registered successfully.",
              token,
              user,
            });
          }
        );
      } catch (hashErr) {
        return res.status(500).json({ error: "Failed to hash password." });
      }
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return res.status(400).json({ error: "Email is required." });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [normalizedEmail],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Failed to login." });
      }

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
      });

      res.json({
        message: "Login successful.",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    }
  );
});

module.exports = router;