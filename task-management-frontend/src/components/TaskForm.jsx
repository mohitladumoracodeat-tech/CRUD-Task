import React, { useState } from "react";

const TaskForm = ({ onSubmit, initialData }) => {

    const [title, setTitle] = useState(
        initialData?.title || ""
    );

    const [description, setDescription] = useState(
        initialData?.description || ""
    );

    const [status, setStatus] = useState(
        initialData?.status || "Pending"
    );


    const handleSubmit = (e) => {

        e.preventDefault();

        if (title.trim() === "") {
            alert("Task title is required");
            return;
        }

        const taskData = {
            title: title,
            description: description,
            status: status
        };

        onSubmit(taskData);
    };


    return (
        <form
            className="task-form"
            onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Task Title</label>
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label> Description</label>
                <textarea
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                </textarea>
            </div>

            <div className="form-group">
                <label>Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}>

                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <button type="submit">
                {initialData ? "Update Task" : "Add Task"}
            </button>

        </form>
    );
};

export default TaskForm;