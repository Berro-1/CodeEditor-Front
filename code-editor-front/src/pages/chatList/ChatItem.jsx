import React from 'react';
import './ChatList.css';

const ChatItem = ({ chat, userId, openChat }) => {
  const chatPartnerName = chat.user2 === userId ? chat.user1Name : chat.user2Name;

  return (
    <li className="chatItem" onClick={() => openChat(chat.id)}>
      <div className="chatInfo">
        <span>Chat with {chatPartnerName}</span>
        <span className="chatPreview">{chat.latestMessage || 'No messages yet'}</span>
      </div>
    </li>
  );
};

export default ChatItem;
