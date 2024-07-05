'use client';

import { useState } from 'react';
import Dashboard from './index';

const Section1 = () => {
  const [activitys, setActivitys] = useState([]);
  const [newActivityName, setNewActivityName] = useState('');

  const addActivity = async () => {
    if (newActivityName.trim() !== '') {
      const response = await fetch('/api/activity/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activityName: newActivityName }),
      });

      if (response.ok) {
        const newActivity = await response.json();
        setActivitys([...activitys, newActivity]);
        setNewActivityName('');
      } else {
        console.error('Errore nella creazione dell attività');
      }
    }
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Crea Nuova Attività</h2>
          <input
            type="text"
            value={newActivityName}
            onChange={(e) => setNewActivityName(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Nome dell'attività"
          />
          <button
            onClick={addActivity}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Attività
          </button>
          <h2 className="text-2xl font-bold mt-6">Attività Attuali</h2>
          <ul className="list-disc list-inside">
            {activitys.map((activity, index) => (
              <li key={index} className="text-lg mt-2">
                {activity.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default Section1;
