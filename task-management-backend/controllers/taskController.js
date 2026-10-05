const db = require("../config/db");

// CREATE TASK
const createTask = (req, res) => {

    const { title, description, status } = req.body || {};

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    if (!status) {
        return res.status(400).json({
            message: "Task status is required"
        });
    }

    const sql = `INSERT INTO tasks (title, description, status)VALUES (?, ?, ?)`;

    db.query(sql,
        [title, description || "", status],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Failed to create task"
                });
            }

            res.status(201).json({
                message: "Task created successfully",
                taskId: result.insertId
            });
        }
    );
};


// GET ALL TASKS
const getTasks = (req, res) => {

    const sql = `SELECT * FROM tasks ORDER BY id DESC`;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch tasks"
            });
        }

        res.status(200).json(result);
    });
};


// GET SINGLE TASK
const getTaskById = (req, res) => {

    const { id } = req.params;

    const sql = `SELECT * FROM tasks WHERE id = ?`;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to fetch task"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(result[0]);
    });
};


// UPDATE TASK
const updateTask = (req, res) => {

    const { id } = req.params;
    const { title, description, status } = req.body || {};

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    if (!status) {
        return res.status(400).json({
            message: "Task status is required"
        });
    }

    if (status !== "Pending" && status !== "Completed") {
        return res.status(400).json({
            message: "Invalid task status"
        });
    }

    const sql = `
        UPDATE tasks
        SET title = ?,
            description = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            title.trim(),
            description || "",
            status,
            id
        ],
        (err, result) => {

            if (err) {
                console.log("UPDATE ERROR:", err);

                return res.status(500).json({
                    message: "Failed to update task",
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Task not found"
                });
            }

            res.status(200).json({
                message: "Task updated successfully"
            });
        }
    );
};


// DELETE TASK
const deleteTask = (req, res) => {

    const { id } = req.params;

    const sql = `DELETE FROM tasks WHERE id = ?`;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to delete task"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    });
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};