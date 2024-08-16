'use client';

import { useState } from 'react';
import Dashboard from './index';

const CandidaturePage = () => {
  const [candidatures, setCandidatures] = useState([
    {
      id: 1,
      name: 'Mario Rossi',
      jobType: 'Elettricista',
      description: 'Elettricista con 10 anni di esperienza',
      email: 'mario.rossi@example.com',
      date: new Date().toLocaleDateString(),
      status: 'In attesa'
    },
  ]);
  const [newCandidature, setNewCandidature] = useState({
    name: '',
    jobType: '',
    description: '',
    email: '',
  });

  const addCandidature = () => {
    if (newCandidature.name && newCandidature.jobType && newCandidature.description && newCandidature.email) {
      const candidature = {
        id: candidatures.length + 1,
        ...newCandidature,
        date: new Date().toLocaleDateString(),
        status: 'In attesa'
      };
      setCandidatures([...candidatures, candidature]);
      setNewCandidature({ name: '', jobType: '', description: '', email: '' });
    }
  };

  const approveCandidature = (id) => {
    const updatedCandidatures = candidatures.map(candidature =>
      candidature.id === id ? { ...candidature, status: 'Approvato' } : candidature
    );
    setCandidatures(updatedCandidatures);
  };

  const rejectCandidature = (id) => {
    const updatedCandidatures = candidatures.map(candidature =>
      candidature.id === id ? { ...candidature, status: 'Rifiutato' } : candidature
    );
    setCandidatures(updatedCandidatures);
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        {/* Prefazione */}
        <div className="bg-[#1A202C] text-white p-4 rounded-lg shadow-md mb-8">
          <p className="text-lg text-center">
            Perchè pagare un servizio esterno se c'è qualcuno all'interno del condominio che può svolgere lo stesso lavoro?
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Candidature Condominio</h2>
        
        {/* Modulo Aggiunta Candidatura */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Invia la tua candidatura</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={newCandidature.name}
              onChange={(e) => setNewCandidature({ ...newCandidature, name: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Nome e Cognome"
            />
            <input
              type="email"
              value={newCandidature.email}
              onChange={(e) => setNewCandidature({ ...newCandidature, email: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={newCandidature.jobType}
              onChange={(e) => setNewCandidature({ ...newCandidature, jobType: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Tipo di Lavoro"
            />
            <textarea
              value={newCandidature.description}
              onChange={(e) => setNewCandidature({ ...newCandidature, description: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Descrivi la tua esperienza"
            />
          </div>
          <button
            onClick={addCandidature}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Invia Candidatura
          </button>
        </div>

        {/* Lista Candidature */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Lista Candidature</h3>
          
          <ul className="space-y-2">
            {candidatures.map((candidature) => (
              <li key={candidature.id} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                <div>
                  <strong>Nome:</strong> {candidature.name} <br />
                  <strong>Email:</strong> {candidature.email} <br />
                  <strong>Lavoro:</strong> {candidature.jobType} <br />
                  <strong>Descrizione:</strong> {candidature.description} <br />
                  <strong>Data:</strong> {candidature.date} <br />
                  <strong>Status:</strong> {candidature.status}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => approveCandidature(candidature.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Approva
                  </button>
                  <button
                    onClick={() => rejectCandidature(candidature.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Rifiuta
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default CandidaturePage;
