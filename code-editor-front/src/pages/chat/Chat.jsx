import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/chats/${chatId}/messages`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setMessages(response.data[0]))
    .catch(error => console.error('Error fetching messages:', error));
  }, [chatId]);

  const sendMessage = () => {
    axios.post(`/api/chats/${chatId}/messages`, { message }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setMessages([...messages, response.data]))
    .catch(error => console.error('Error sending message:', error));
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map(msg => (
          <div key={msg.id}>
            <strong>{msg.sender_id}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
