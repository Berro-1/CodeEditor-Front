import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './searchbar.css';

const SearchBar = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const loggedInUserId = decodedToken.sub;
        setUserId(loggedInUserId);

        const response = await axios.get('http://127.0.0.1:8000/api/user/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched users response:', response.data);

        const usersData = Array.isArray(response.data) ? response.data : [];
        console.log('Processed users data:', usersData);

        // Filter out the logged-in user
        const filteredUsersData = usersData.filter(user => user.id != loggedInUserId);
        setUsers(filteredUsersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredUsers(
        users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

  const handleChat = async (user2Id) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const user1Id = decodedToken.sub; // Assuming 'sub' contains the user's ID

      const response = await axios.post('http://127.0.0.1:8000/api/chat/createChat', {
        user1: user1Id,
        user2: user2Id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const chatId = response.data.chat.id;
      navigate(`/chats/${chatId}`);
    } catch (error) {
      console.error('Error creating or navigating to chat:', error);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="search-results">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <div key={user.id} className="search-result-item">
              <p>{user.name} ({user.email})</p>
              <button className="chat-button" onClick={() => handleChat(user.id)}>Chat</button>
            </div>
          ))
        ) : (
          searchTerm && <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
