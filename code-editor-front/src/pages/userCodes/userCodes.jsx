import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./userCodes.css";

const UserCodes = () => {
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserCodes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/code/userCodes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setCodes(response.data);
      } catch (error) {
        console.error("Error fetching user codes:", error);
      }
    };

    fetchUserCodes();
  }, [navigate]);

  return (
    <div className="user-codes-container">
      <h1>Your Codes</h1>
      <div className="codes-list">
        {codes.length > 0 ? (
          codes.map((code, index) => (
            <div key={index} className="code-item">
              <h3>{code.code}</h3>
            </div>
          ))
        ) : (
          <p>No codes available</p>
        )}
      </div>
    </div>
  );
};

export default UserCodes;
