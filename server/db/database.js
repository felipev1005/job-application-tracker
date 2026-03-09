const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const dataDir = path.join(__dirname, "..", "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "job-tracker.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      status TEXT NOT NULL,
      location TEXT,
      link TEXT,
      dateApplied TEXT,
      notes TEXT,
      createdAt TEXT NOT NULL
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Failed to create applications table:", err.message);
    } else {
      console.log("Applications table is ready.");
    }
  });
}

module.exports = {
  db,
  initializeDatabase,
};