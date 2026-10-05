import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task, onDelete }) => {

    return (
        <div className="task-card">

            <div className="task-header">

                <h3>{task.title}</h3>
                <span className={
                    task.status === "Completed"
                        ? "status completed"
                        : "status pending"}>
                    {task.status}
                </span>

            </div>

            <p className="task-description">
                {task.description}
            </p>

            <p className="task-date">
                Created: {task.created_date}
            </p>

            <div className="task-actions">

                <Link to={`/edit-task/${task.id}`}>
                    <button className="edit-btn">Edit</button>
                </Link>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default TaskCard;