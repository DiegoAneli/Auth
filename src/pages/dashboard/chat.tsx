'use client';

import { useState } from 'react';
import Dashboard from './index';

const ChatSection = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Collaboratore_1', lastMessage: 'Reminds me of a Chinese proverb...' },
    { id: 2, name: 'Collaboratore_2', lastMessage: 'This is amazing!' },
    { id: 3, name: 'Collaboratore_3', lastMessage: 'Sticker' },
    // Aggiungi altri contatti qui
  ]);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        const newMsg = await response.json();
        setMessages([...messages, newMsg]);
        setNewMessage('');
      } else {
        console.error('Errore nell\'invio del messaggio');
      }
    }
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 h-screen">
        {/* Sidebar */}
        <div className="col-span-1 bg-[#2D3748] text-white p-4 rounded-lg shadow-md overflow-y-auto mb-20">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          />
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className={`flex items-center space-x-4 p-2 hover:bg-gray-600 rounded cursor-pointer ${selectedContact.id === contact.id ? 'bg-gray-600' : ''
                  }`}
                onClick={() => setSelectedContact(contact)}
              >
                <div className="bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-lg font-bold">{contact.name}</div>
                  <div className="text-sm text-gray-400">{contact.lastMessage}</div>
                </div>
                <div className="ml-auto text-gray-400 text-sm">11:00</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="col-span-3 bg-[#1A202C] text-white p-6 rounded-lg shadow-md flex flex-col mb-20">
          <h2 className="text-2xl font-bold mb-4">Chat con {selectedContact.name}</h2>
          <div className="flex-1 overflow-y-auto h-64 bg-gray-700 p-4 rounded mb-4">
            {messages.map((message, index) => (
              <div key={index} className="text-lg mt-2">
                <strong>{message.user}:</strong> {message.content}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Scrivi un messaggio"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Invia Messaggio
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default ChatSection;
