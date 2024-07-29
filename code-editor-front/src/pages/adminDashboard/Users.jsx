import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./Users.css";
import axios from "axios";
import {format} from 'date-fns';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/");
        if (response.data) {
          setUsers(response.data[0]);
          console.log(response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "created_at", headerName: "Registered At", flex: 1,
      renderCell: (params)=> format(params.row.created_at,`yyyy-MM-dd`)
     },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <div className="container">
        <h1
          style={{
            marginBottom: "20px",
            color: "#fff",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          All Users
        </h1>
        <button className="btn">Import</button>
      </div>
      <div
        style={{
          height: "70vh",
          width: "70vw",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {users && (
          <DataGrid
            columns={columns}
            rows={rows}
            slots={{ toolbar: GridToolbar }}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                fontFamily: "Arial, sans-serif",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1a73e8",
                color: "#204E45",
                fontSize: "16px",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#f9f9f9",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#e0f7fa",
              },
              "& .MuiDataGrid-toolbarContainer": {
                justifyContent: "flex-end",
                padding: "10px",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f1f1f1",
              },
              "& .MuiDataGrid-virtualScroller": {
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "8px",
                  height: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
