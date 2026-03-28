require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/database");
const applicationsRoutes = require("./routes/application");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Job Tracker API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error.message);
    process.exit(1);
  });