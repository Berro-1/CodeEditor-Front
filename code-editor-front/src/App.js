import React from "react";
import Login from "./pages/login/Loginn";
import Users from "./pages/adminDashboard/Users";
import ChatList from "./pages/chatList/ChatList";
import Chat from "./pages/chat/Chat";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/chats/:chatId" element={<Chat />} />
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
