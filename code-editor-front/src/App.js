import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/navBar/navBar";
import Login from "./pages/login/Loginn";
import Signup from "./pages/signup/signup";


import "./App.css";

const LayoutWithNavBar = () => (
  <div>
    <NavBar />
    <Outlet />
  </div>
);

const LayoutWithoutNavBar = () => (
  <div>
    <Outlet />
  </div>
);

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<LayoutWithNavBar />}>
        </Route>
        <Route element={<LayoutWithoutNavBar />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </>
    )
  );

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
