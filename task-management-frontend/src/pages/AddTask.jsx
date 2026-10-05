import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const AddTask = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddTask = async (taskData) => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.post("http://localhost:5000/api/tasks", taskData);
            alert(response.data.message);
            navigate("/");

        } catch (err) {

            console.log(err);
            setError(err.response?.data?.message || "Failed to add task");

        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Navbar />

            <div className="page-container">

                <h1>Add New Task</h1>
                <p>Create a new daily task.</p>

                {error && (
                    <p className="error-message">{error}|</p>
                )}

                <TaskForm onSubmit={handleAddTask} />

                {loading && (<p>Adding task...</p>)}

            </div>
        </>
    );
};

export default AddTask;