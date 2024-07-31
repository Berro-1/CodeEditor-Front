import React from "react";
import Login from "./pages/login/Loginn";

import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CodeEditor from "./pages/codeeditior/codeEditor";

function App() {
  return (
    <div>
      <CodeEditor />
    </div>
  );
}

export default App;
