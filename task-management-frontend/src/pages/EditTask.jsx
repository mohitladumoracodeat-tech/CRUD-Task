import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const EditTask = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // GET SINGLE TASK
  const getTask = async () => {

    try {

      const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
      setTask(response.data);

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load task");

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => { getTask(); }, [id]);

  // UPDATE TASK
  const handleUpdateTask = async (taskData) => {

    try {
      setError("");

      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, taskData);
      alert(response.data.message);
      navigate("/");

    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Failed to update task");
    }
  };


  return (
    <>
      <Navbar />

      <div className="page-container">

        <h1>Edit Task</h1>
        <p>Update your existing task.</p>

        {loading && (<p>Loading task...</p>)}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && task && (
          <TaskForm
            initialData={task}
            onSubmit={handleUpdateTask}
          />
        )}

      </div>
    </>
  );
};

export default EditTask;