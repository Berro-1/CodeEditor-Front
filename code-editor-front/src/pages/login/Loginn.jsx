import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }
      
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        toast.success('Login successful');
        const token = response.data.authorization.token;
        localStorage.setItem('token', token);

        // Decode the token to get the user's role
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // Navigate based on the user's role
        if (userRole === 'admin') {
          navigate('/admin/users');
        } else if (userRole === 'user') {
          navigate('/chats');
        } else{
          navigate('/')
        }
      }
    } catch (error) {
      toast.error("Error logging in");
      console.log("Error logging in", error);
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
          Login
        </Typography>
        <div>
          <TextField
            id="Email"
            label="Email"
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
            onClick={handleLogin}
          >
            Login
          </Button>
          <Typography align="right" className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
