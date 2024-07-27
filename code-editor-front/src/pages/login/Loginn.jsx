import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import './Login.css';
import axios from 'axios';

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const login = async(email,password)=>{
    try{
    const response = await axios.post('http://127.0.0.1:8000/api/login',{
      email:email,
      password:password
    });
    console.log(response);
    }catch(error){
      console.log('error logging in', error);
    }
  }
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
          id="Email"
          label="Email"
          variant="standard"
          fullWidth
          onChange={(e)=>setEmail(e.target.value)}
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
          onChange={(e)=>setPassword(e.target.value)}
          margin="normal"
          InputLabelProps={{
            className: 'input-label',
          }}
          InputProps={{
            className: 'input-text',
          }}
        />
        <Button variant="contained" color="primary" fullWidth className="login-button" onClick={()=>login(email,password)}>
          Login
        </Button>
      </div>
    </Paper>
  );
}

export default Login;
