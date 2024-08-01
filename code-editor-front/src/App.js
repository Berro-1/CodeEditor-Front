import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/navBar/navBar";
import Login from "./pages/login/Loginn";
import Signup from "./pages/signup/signup";

import Users from "./pages/adminDashboard/Users";
import ChatList from "./pages/chatList/ChatList";
import Chat from "./pages/chat/Chat";
import ProtectedRoute from "./components/protectedRoutes/protectedRoutes"; // Import the ProtectedRoute component
import ProtectedAdminRoute from "./components/protectedRoutes/protectedAdminRoute"
import "./App.css";
import UserCodes from "./pages/userCodes/userCodes";
import CodeEditor from './pages/codeeditior/codeEditor'


const LayoutWithNavBar = () => (
  <div>
    <NavBar />
    <div className="p-40">
      <Outlet />
    </div>
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
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <ChatList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats/:id"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/codeEditor"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedAdminRoute isAdminRoute={true}>
                <Users />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/user/userCodes"
            element={
              <ProtectedRoute>
                <UserCodes />
              </ProtectedRoute>
            }
          />
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
