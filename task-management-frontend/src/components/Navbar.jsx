import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">Task Manager</div>

      <div className="nav-links">

        <Link to="/">Tasks</Link>
        <Link to="/add-task">Add Task</Link>

      </div>

    </nav>
  );
};

export default Navbar;