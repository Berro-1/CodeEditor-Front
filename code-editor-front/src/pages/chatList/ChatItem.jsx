import React from 'react';
import './ChatList.css';

const ChatItem = ({ chat, userId, openChat }) => {
  const chatPartner = chat.user2 === userId ? chat.user1 : chat.user2;

  return (
    <li className="chatItem" onClick={() => openChat(chat.id)}>
      <div className="chatInfo">
        <span>Chat with User {chatPartner}</span>
        <span className="chatPreview">{chat.latestMessage || 'No messages yet'}</span>
      </div>
    </li>
  );
};

export default ChatItem;
