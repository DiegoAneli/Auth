'use client';

import { useState } from 'react';
import Dashboard from './index';

const ForumSection = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: 'Primo Argomento', comments: ['Questo è un ottimo argomento!', 'Concordo!'] },
    { id: 2, title: 'Secondo Argomento', comments: ['Interessante', 'Dovremmo approfondire questo tema.'] },
    { id: 3, title: 'Terzo Argomento', comments: ['Ho delle idee su questo argomento.', 'Parliamone di più.'] },
  ]);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [newComment, setNewComment] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');

  const addComment = () => {
    if (newComment.trim() !== '') {
      const updatedTopics = topics.map(topic => {
        if (topic.id === selectedTopic.id) {
          return { ...topic, comments: [...topic.comments, newComment] };
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
        comments: [],
      };
      setTopics([...topics, newTopic]);
      setNewTopicTitle('');
      setSelectedTopic(newTopic);
    }
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 h-screen">
        {/* Sidebar - Elenco Argomenti */}
        <div className="col-span-1 bg-[#2D3748] text-white p-4 rounded-lg shadow-md overflow-y-auto mb-20">
          <h2 className="text-xl font-bold mb-4">Argomenti</h2>
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
            {topics.map((topic) => (
              <li
                key={topic.id}
                className={`p-2 hover:bg-gray-600 rounded cursor-pointer ${selectedTopic.id === topic.id ? 'bg-gray-600' : ''}`}
                onClick={() => setSelectedTopic(topic)}
              >
                <div className="text-lg font-bold">{topic.title}</div>
                <div className="text-sm text-gray-400">{topic.comments.length} commenti</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Forum Area */}
        <div className="col-span-3 bg-[#1A202C] text-white p-6 rounded-lg shadow-md flex flex-col mb-20">
          <h2 className="text-2xl font-bold mb-4">{selectedTopic.title}</h2>
          <div className="flex-1 overflow-y-auto h-64 bg-gray-700 p-4 rounded mb-4">
            {selectedTopic.comments.map((comment, index) => (
              <div key={index} className="text-lg mt-2">
                {comment}
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
