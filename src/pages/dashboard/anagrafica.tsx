'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Dashboard from './index';

const CondominiAnagrafica = () => {
  const [condomini, setCondomini] = useState([]);
  const [newCondomino, setNewCondomino] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    edificio: '',
    scala:'',
    garage:'',
    postoAuto:'',
    proprietario:'',
    affittuario:''
  });
  const [editingId, setEditingId] = useState(null); // Stato per gestire l'ID del condomino in modifica

  useEffect(() => {
    const fetchCondomini = async () => {
      const response = await fetch('/api/condomini/list');
      const data = await response.json();
      setCondomini(data);
    };

    fetchCondomini();
  }, []);

  const addOrUpdateCondomino = async () => {
    const url = editingId ? `/api/condomini/update?id=${editingId}` : '/api/condomini/add';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCondomino),
    });

    if (response.ok) {
      const savedCondomino = await response.json();
      if (editingId) {
        setCondomini(condomini.map(condomino => (condomino._id === editingId ? savedCondomino : condomino)));
        setEditingId(null); // Reset dello stato di modifica
      } else {
        setCondomini([...condomini, savedCondomino]);
      }
      setNewCondomino({ 
        name: '', 
        surname: '', 
        phone: '', 
        email: '', 
        edificio: '',
        scala:'',
        garage:'',
        postoAuto:'',
        proprietario:'',
        affittuario:'' 
      });
    } else {
      console.error('Errore nella creazione o modifica del condomino');
    }
  };

  const deleteCondomino = async (id: any) => {
    const response = await fetch(`/api/condomini/delete?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setCondomini(condomini.filter((condomino) => condomino._id !== id));
    } else {
      console.error('Errore durante l\'eliminazione del condomino');
    }
  };

  const editCondomino = (condomino: SetStateAction<{ name: string; surname: string; phone: string; email: string; edificio: string; scala: string; garage: string; postoAuto: string; proprietario: string; affittuario: string; }>) => {
    setNewCondomino(condomino);
    setEditingId(condomino._id);
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? 'Modifica Condomino' : 'Aggiungi Condomino'}
          </h2>
          <input
            type="text"
            value={newCondomino.name}
            onChange={(e) => setNewCondomino({ ...newCondomino, name: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Nome"
          />
          <input
            type="text"
            value={newCondomino.surname}
            onChange={(e) => setNewCondomino({ ...newCondomino, surname: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Cognome"
          />
          <input
            type="text"
            value={newCondomino.phone}
            onChange={(e) => setNewCondomino({ ...newCondomino, phone: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Telefono"
          />
          <input
            type="email"
            value={newCondomino.email}
            onChange={(e) => setNewCondomino({ ...newCondomino, email: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Email"
          />
          <input
            type="text"
            value={newCondomino.edificio}
            onChange={(e) => setNewCondomino({ ...newCondomino, edificio: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Edificio"
          />
          <input
            type="text"
            value={newCondomino.scala}
            onChange={(e) => setNewCondomino({ ...newCondomino, scala: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Scala"
          />
          <input
            type="text"
            value={newCondomino.garage}
            onChange={(e) => setNewCondomino({ ...newCondomino, garage: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Garage"
          />
          <input
            type="text"
            value={newCondomino.postoAuto}
            onChange={(e) => setNewCondomino({ ...newCondomino, postoAuto: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Posto Auto"
          />
          <input
            type="text"
            value={newCondomino.proprietario}
            onChange={(e) => setNewCondomino({ ...newCondomino, proprietario: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Proprietario"
          />
          <input
            type="text"
            value={newCondomino.affittuario}
            onChange={(e) => setNewCondomino({ ...newCondomino, affittuario: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Affittuario"
          />
          <button
            onClick={addOrUpdateCondomino}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editingId ? 'Salva Modifiche' : 'Aggiungi Condomino'}
          </button>
          <h2 className="text-2xl font-bold mt-6">Lista Condomini</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#2D3748] text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Cognome
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Telefono
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Edificio
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Scala
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Garage
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Posto Auto
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Proprietario
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Affittuario
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {condomini.map((condomino, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.surname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.edificio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.scala}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.garage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.postoAuto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.proprietario}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {condomino.affittuario}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      <button
                        onClick={() => editCondomino(condomino)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => deleteCondomino(condomino._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Elimina
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CondominiAnagrafica;
