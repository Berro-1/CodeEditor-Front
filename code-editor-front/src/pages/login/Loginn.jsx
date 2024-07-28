import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import './Login.css';

function Login() {
  return (
    <Paper
      elevation={6}
      className="login-paper"
    >
      <Typography variant="h4" gutterBottom align="center" className="login-title">
        Login
      </Typography>
      <div>
        <TextField
          id="username"
          label="Username"
          variant="standard"
          fullWidth
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
          margin="normal"
          InputLabelProps={{
            className: 'input-label',
          }}
          InputProps={{
            className: 'input-text',
          }}
        />
        <Button variant="contained" color="primary" fullWidth className="login-button" >
          Login
        </Button>
      </div>
    </Paper>
  );
}

export default Login;
