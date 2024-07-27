import React, { Component } from "react";
import { Box, Container } from "@mui/material";
import Login from "./pages/login/Loginn";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Box className="app-container">
        <Container maxWidth="xs">
          <Login />
        </Container>
      </Box>
    );
  }
}

export default App;
