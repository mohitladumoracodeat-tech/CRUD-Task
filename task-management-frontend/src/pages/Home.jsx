import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

const Home = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // GET ALL TASKS
    const getTasks = async () => {

        try {

            const response = await axios.get("http://localhost:5000/api/tasks");
            setTasks(response.data);
            setError("");

        } catch (err) {
            console.log(err);
            setError("Failed to load tasks");

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => { getTasks(); }, []);

    // DELETE TASK
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this task?");

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`);

            alert(response.data.message);
            setTasks(tasks.filter((task) => task.id !== id));

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Failed to delete task");
        }
    };


    return (
        <>
            <Navbar />

            <main className="page-container">

                <h1>Task Management System</h1>

                <p>Manage your daily tasks</p>

                {loading && (<p>Loading tasks...</p>)}

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {!loading && !error && (
                    <div className="task-list">

                        {tasks.length === 0 ? (
                            <p>No tasks found.</p>
                        ) : (
                            tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDelete}
                                />
                            ))
                        )}

                    </div>
                )}

            </main>
        </>
    );
};

export default Home;