import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../login/Login.css";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Signup = async (name, email, password) => {
    try {
      if (!name || !email || !password) {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
      });
      toast.success("Signup successful");
      console.log(response);
      navigate("/home");
    } catch (error) {
      toast.error("Error signing up");
      console.log("Error signing up", error);
    }
  };

  return (
    <div className="maincont">
      <Paper elevation={6} className="login-paper">
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          className="login-title"
        >
          Sign up
        </Typography>
        <form>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            InputLabelProps={{
              className: "input-label",
            }}
            InputProps={{
              className: "input-text",
            }}
          />
          <TextField
            id="email"
            label="email"
            type="email"
            variant="standard"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            InputLabelProps={{
              className: "input-label",
            }}
            InputProps={{
              className: "input-text",
            }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputLabelProps={{
              className: "input-label",
            }}
            InputProps={{
              className: "input-text",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="login-button"
            onClick={() => Signup(name, email, password)}
          >
            Signup
          </Button>
          <Typography align="right" className="login-link">
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

export default Signup;
