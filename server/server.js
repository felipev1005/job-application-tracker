const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/database");
const applicationsRoutes = require("./routes/application");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.json({ message: "Job Tracker API is running." });
});

app.use("/api/applications", applicationsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});