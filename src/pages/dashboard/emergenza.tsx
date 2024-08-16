'use client';

import { useState } from 'react';
import Dashboard from './index';

const EmergencyPage = () => {
  const [emergencies, setEmergencies] = useState([
    {
      id: 1,
      type: 'Incendio',
      description: 'Incendio nel seminterrato',
      date: new Date(2024, 7, 16).toDateString(),
      status: 'In corso',
    },
  ]);
  const [newEmergency, setNewEmergency] = useState({
    type: '',
    description: '',
  });

  const addEmergency = () => {
    if (newEmergency.type && newEmergency.description) {
      const emergency = {
        id: emergencies.length + 1, // Genera un ID semplice
        ...newEmergency,
        date: new Date().toDateString(),
        status: 'In corso',
      };
      setEmergencies([...emergencies, emergency]);
      setNewEmergency({ type: '', description: '' });
    }
  };

  const resolveEmergency = (id) => {
    const updatedEmergencies = emergencies.map(emergency =>
      emergency.id === id ? { ...emergency, status: 'Risolto' } : emergency
    );
    setEmergencies(updatedEmergencies);
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Emergenze del Condominio</h2>

        {/* Contatti di Emergenza */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Contatti di Emergenza</h3>
          <ul className="space-y-2">
            <li><strong>Manutenzione Edificio:</strong> +39 123 456 7890</li>
            <li><strong>Sicurezza Condominiale:</strong> +39 098 765 4321</li>
            <li><strong>Vigili del Fuoco:</strong> 115</li>
            <li><strong>Polizia:</strong> 113</li>
            <li><strong>Pronto Soccorso:</strong> 118</li>
          </ul>
        </div>

        {/* Modulo di Segnalazione di Emergenza */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Segnala un'Emergenza</h3>
          <input
            type="text"
            value={newEmergency.type}
            onChange={(e) => setNewEmergency({ ...newEmergency, type: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Tipo di Emergenza (es. Incendio, Allagamento)"
          />
          <textarea
            value={newEmergency.description}
            onChange={(e) => setNewEmergency({ ...newEmergency, description: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Descrizione dell'Emergenza"
          />
          <button
            onClick={addEmergency}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Segnala Emergenza
          </button>
        </div>

        {/* Lista delle Emergenze Segnalate */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Emergenze Segnalate</h3>
          <ul className="space-y-2">
            {emergencies.map((emergency) => (
              <li key={emergency.id} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                <div>
                  <strong>Tipo:</strong> {emergency.type} <br />
                  <strong>Data:</strong> {emergency.date} <br />
                  <strong>Descrizione:</strong> {emergency.description} <br />
                  <strong>Status:</strong> {emergency.status}
                </div>
                {emergency.status === 'In corso' && (
                  <button
                    onClick={() => resolveEmergency(emergency.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Risolvi
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default EmergencyPage;
