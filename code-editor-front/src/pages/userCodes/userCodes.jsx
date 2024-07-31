import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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

  const handleDelete = async (codeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/code/${codeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCodes(codes.filter((code) => code.id !== codeId));
    } catch (error) {
      console.error("Error deleting code:", error);
    }
  };

  return (
    <div className="user-codes-container">
      <h1 className="title">Your Codes</h1>
      <div className="codes-list">
        {codes.length > 0 ? (
          codes.map((code) => (
            <div key={code.id} className="code-item">
              <div className="code-header">
                <h3>{code.title}</h3>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(code.id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <pre>{code.code}</pre>
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
