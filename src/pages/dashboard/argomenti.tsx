'use client';

import { useState } from 'react';
import Dashboard from './index';

const ForumSection = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: 'Primo Argomento', author: 'Utente1', createdAt: new Date().toLocaleString(), comments: [{ text: 'Questo è un ottimo argomento!', author: 'Utente2', createdAt: new Date().toLocaleString() }, { text: 'Concordo!', author: 'Utente3', createdAt: new Date().toLocaleString() }] },
    { id: 2, title: 'Secondo Argomento', author: 'Utente2', createdAt: new Date().toLocaleString(), comments: [{ text: 'Interessante', author: 'Utente1', createdAt: new Date().toLocaleString() }, { text: 'Dovremmo approfondire questo tema.', author: 'Utente3', createdAt: new Date().toLocaleString() }] },
    { id: 3, title: 'Terzo Argomento', author: 'Utente3', createdAt: new Date().toLocaleString(), comments: [{ text: 'Ho delle idee su questo argomento.', author: 'Utente2', createdAt: new Date().toLocaleString() }, { text: 'Parliamone di più.', author: 'Utente1', createdAt: new Date().toLocaleString() }] },
  ]);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [newComment, setNewComment] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const addComment = () => {
    if (newComment.trim() !== '') {
      const updatedTopics = topics.map(topic => {
        if (topic.id === selectedTopic.id) {
          return {
            ...topic,
            comments: [...topic.comments, { text: newComment, author: 'UtenteCorrente', createdAt: new Date().toLocaleString() }]
          };
        }
        return topic;
      });
      setTopics(updatedTopics);
      setNewComment('');
    }
  };

  const addTopic = () => {
    if (newTopicTitle.trim() !== '') {
      const newTopic = {
        id: topics.length + 1,
        title: newTopicTitle,
        author: 'UtenteCorrente',
        createdAt: new Date().toLocaleString(),
        comments: [],
      };
      setTopics([...topics, newTopic]);
      setNewTopicTitle('');
      setSelectedTopic(newTopic);
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dashboard>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 h-screen">
        {/* Sidebar - Elenco Argomenti */}
        <div className="col-span-1 bg-[#2D3748] text-white p-4 rounded-lg shadow-md overflow-y-auto mb-20">
          <h2 className="text-xl font-bold mb-4">Argomenti</h2>
          <input
            type="text"
            placeholder="Cerca argomento"
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Aggiungi nuovo argomento"
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
          />
          <button
            onClick={addTopic}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Aggiungi Argomento
          </button>
          <ul className="space-y-4">
            {filteredTopics.map((topic) => (
              <li
                key={topic.id}
                className={`p-2 hover:bg-gray-600 rounded cursor-pointer ${selectedTopic.id === topic.id ? 'bg-gray-600' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                <div className="text-lg font-bold">{topic.title}</div>
                <div className="text-sm text-gray-400">Creato da: {topic.author}</div>
                <div className="text-sm text-gray-400">Creato il: {topic.createdAt}</div>
                <div className="text-sm text-gray-400">{topic.comments.length} commenti</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Forum Area */}
        <div className="col-span-3 bg-[#1A202C] text-white p-6 rounded-lg shadow-md flex flex-col mb-20">
          <h2 className="text-2xl font-bold mb-4">{selectedTopic.title}</h2>
          <div className="text-sm text-gray-400 mb-2">Creato da: {selectedTopic.author}</div>
          <div className="text-sm text-gray-400 mb-4">Creato il: {selectedTopic.createdAt}</div>
          <div className="flex-1 overflow-y-auto h-64 bg-gray-700 p-4 rounded mb-4">
            {selectedTopic.comments.map((comment, index) => (
              <div
                key={index}
                className={`text-lg mt-2 ${comment.author === 'UtenteCorrente' ? 'text-right' : 'text-left'}`}
              >
                <span className="block text-sm text-gray-400">{comment.author} - {comment.createdAt}</span>
                <span
                  className={`inline-block p-2 rounded-lg ${comment.author === 'UtenteCorrente' ? 'bg-blue-500' : 'bg-gray-500'}`}
                >
                  {comment.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center bg-gray-700 p-2 rounded mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 bg-gray-700 text-white rounded"
              placeholder="Aggiungi un commento"
            />
            <button
              onClick={addComment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Invia
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default ForumSection;
