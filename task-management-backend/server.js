const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
    res.json({ message: "Task Management API is running" });
});


// Task Routes
app.use("/api/tasks", taskRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});