import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css"; // Ensure this import is correct

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/CodeEditor">Coder</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
