'use client';

import { useState } from 'react';
import Dashboard from './index';

const Section1 = () => {
  const [calendars, setCalendars] = useState([]);
  const [newCalendarName, setNewCalendarName] = useState('');

  const addCalendar = async () => {
    if (newCalendarName.trim() !== '') {
      const response = await fetch('/api/calendar/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName: newCalendarName }),
      });

      if (response.ok) {
        const newCalendar = await response.json();
        setCalendars([...calendars, newCalendar]);
        setNewCalendarName('');
      } else {
        console.error('Errore nella creazione del calendario');
      }
    }
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Crea Nuovo Calendario</h2>
          <input
            type="text"
            value={newCalendarName}
            onChange={(e) => setNewCalendarName(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Nome del Calendario"
          />
          <button
            onClick={addCalendar}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Calendario
          </button>
          <h2 className="text-2xl font-bold mt-6">Calendari Attuali</h2>
          <ul className="list-disc list-inside">
            {calendars.map((calendar, index) => (
              <li key={index} className="text-lg mt-2">
                {calendar.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default Section1;
