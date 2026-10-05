const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();

const PORT = 5000;


app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {

    res.json({
        message: "Task Management API is running"
    });

});


app.get("/api/tasks", (req, res) => {

    const sql = "SELECT * FROM tasks ORDER BY id DESC";

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch tasks"
            });

        }

        res.status(200).json(result);

    });

});


app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});