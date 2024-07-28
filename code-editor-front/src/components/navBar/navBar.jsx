import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./navBar.css"; // Ensure this import is correct

const NavBar = () => {
  const [searchItem, setItem] = useState("");
  const [searchResult, setResult] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user");
        console.log(response.data);

        const flattenedUsers = response.data.flat();

        setAllUsers(flattenedUsers);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.log("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    if (searchItem.trim() === "") {
      setResult([]);
      return;
    }

    const filteredUsers = allUsers.filter((user) => {
      return (
        user.name &&
        user.name.trim().toLowerCase().includes(searchItem.trim().toLowerCase())
      );
    });

    console.log("Filtered Users:", filteredUsers);

    if (filteredUsers.length === 0) {
      toast.error("No results found");
    } else {
      setResult(filteredUsers);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="logo" /> {/* Ensure the path is correct */}
      </div>
      <div className="nav-center">
        <div className="search">
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Search for developers"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
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
