import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="h-64 overflow-y-auto mb-4 border rounded p-2">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border rounded-l px-2 py-1"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#004aad] text-white px-4 py-2 rounded-r hover:bg-[#003c8f]"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Chat;