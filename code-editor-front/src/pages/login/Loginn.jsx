import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        toast.error('Please enter both email and password');
        return;
      }
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
        email: email,
        password: password
      });
      toast.success('Login successful');
      localStorage.setItem('token', response.data.authorization.token);
      navigate('/chats');
    } catch (error) {
      toast.error('Error logging in');
      console.log('Error logging in', error);
    }
  };

  return (
    <Paper elevation={6} className="login-paper">
      <Typography variant="h4" gutterBottom align="center" className="login-title">
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
            className: 'input-label',
          }}
          InputProps={{
            className: 'input-text',
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
            className: 'input-label',
          }}
          InputProps={{
            className: 'input-text',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="login-button"
          onClick={() => login(email, password)}
        >
          Login
        </Button>
      </div>
    </Paper>
  );
}

export default Login;
