'use client';

import { useState } from 'react';
import Dashboard from './index';

const CondoSchedulePage = () => {
  const [activeTab, setActiveTab] = useState('waste'); // Stato per gestire la scheda attiva

  const wasteSchedule = [
    { day: 'Ogni 2 settimane al Lunedì', wasteType: 'Carta' },
    { day: 'Ogni Lunedì', wasteType: 'Indifferenziato' },
    { day: 'Giovedì Mattina', wasteType: 'Plastica' },
  
  ];

  const cleaningSchedule = [
    { day: 'Lunedì', task: 'Pulizia scale piano 1 e 2' },
    { day: 'Mercoledì', task: 'Pulizia scale piano 3 e 4' },
    { day: 'Venerdì', task: 'Pulizia scale piano 5 e 6' },
  ];

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Programma del Condominio</h2>
        
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('waste')}
            className={`py-2 px-4 rounded-t-lg ${activeTab === 'waste' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            Ritiro Rifiuti
          </button>
          <button
            onClick={() => setActiveTab('cleaning')}
            className={`py-2 px-4 rounded-t-lg ${activeTab === 'cleaning' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            Pulizia Scale
          </button>
        </div>

        {activeTab === 'waste' && (
          <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Giorni di Ritiro dei Rifiuti</h3>
            <ul className="space-y-2">
              {wasteSchedule.map((item, index) => (
                <li key={index} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                  <div>
                    <strong>Giorno:</strong> {item.day} <br />
                    <strong>Tipo di Rifiuto:</strong> {item.wasteType}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'cleaning' && (
          <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Giorni di Pulizia delle Scale</h3>
            <ul className="space-y-2">
              {cleaningSchedule.map((item, index) => (
                <li key={index} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                  <div>
                    <strong>Giorno:</strong> {item.day} <br />
                    <strong>Task:</strong> {item.task}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default CondoSchedulePage;
