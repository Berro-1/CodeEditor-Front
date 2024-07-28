import React from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";


function Signup() {
  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Sign up
      </Typography>
      <form>
        <TextField
          id="username"
          label="Username"
          variant="standard"
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: { color: "#8FD6B3" },
          }}
        />
        <TextField
          id="email"
          label="email"
          type="email"
          variant="standard"
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: { color: "#8FD6B3" },
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
            style: { color: "#8FD6B3" },
          }}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Signup
        </Button>
      </form>
    </Paper>
  );
}

export default Signup;
