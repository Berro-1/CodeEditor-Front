import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import ChatItem from './ChatItem';
import SearchBar from '../../components/searchBar/searchBar';
import './ChatList.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        localStorage.clear();
        navigate('/login');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      setUserId(userId);

      const response = await axios.get(`http://127.0.0.1:8000/api/chat/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setChats(response.data);
    } catch (error) {
      setError('Error fetching chats');
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [navigate]);

  const openChat = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
    <div className="container2">
      <SearchBar/>
      <h1 className="title">Chats</h1>
      <ul className="chatList">
        {chats.length > 0 ? (
          chats.map(chat => (
            <ChatItem key={chat.id} chat={chat} userId={userId} openChat={openChat} />
          ))
        ) : (
          <div className="noChats">No chats available</div>
        )}
      </ul>
    </div></div>
  );
};

export default ChatList;
