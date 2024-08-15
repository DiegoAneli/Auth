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
    affittuario:'',
    dataInizioProprieta: '',
    fineProprieta: '',
    nomeAffittuario: '',
    giardino: '',
    inVendita: '',
    millesimi: '',
    metriQuadri: ''
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
    const url = editingId ? `/api/condomini/edit?id=${editingId}` : '/api/condomini/add';
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
      resetForm();
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

  const editCondomino = (condomino: SetStateAction<typeof newCondomino>) => {
    setNewCondomino(condomino);
    setEditingId(condomino._id);
  };

  const resetForm = () => {
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
      affittuario:'',
      dataInizioProprieta: '',
      fineProprieta: '',
      nomeAffittuario: '',
      giardino: '',
      inVendita: '',
      millesimi: '',
      metriQuadri: ''
    });
    setEditingId(null);
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? 'Modifica Condomino' : 'Aggiungi Condomino'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <input
              type="date"
              value={newCondomino.dataInizioProprieta}
              onChange={(e) => setNewCondomino({ ...newCondomino, dataInizioProprieta: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Data Inizio Proprietà"
            />
            <input
              type="date"
              value={newCondomino.fineProprieta}
              onChange={(e) => setNewCondomino({ ...newCondomino, fineProprieta: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Fine Proprietà"
            />
            <input
              type="text"
              value={newCondomino.nomeAffittuario}
              onChange={(e) => setNewCondomino({ ...newCondomino, nomeAffittuario: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Nome Affittuario"
            />
            <input
              type="text"
              value={newCondomino.giardino}
              onChange={(e) => setNewCondomino({ ...newCondomino, giardino: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Giardino"
            />
            <input
              type="text"
              value={newCondomino.inVendita}
              onChange={(e) => setNewCondomino({ ...newCondomino, inVendita: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="In Vendita"
            />
            <input
              type="number"
              value={newCondomino.millesimi}
              onChange={(e) => setNewCondomino({ ...newCondomino, millesimi: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Millesimi"
            />
            <input
              type="number"
              value={newCondomino.metriQuadri}
              onChange={(e) => setNewCondomino({ ...newCondomino, metriQuadri: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Metri Quadri"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={addOrUpdateCondomino}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingId ? 'Salva Modifiche' : 'Aggiungi Condomino'}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Annulla
              </button>
            )}
          </div>
          <h2 className="text-2xl font-bold mt-6">Lista Condomini</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#2D3748] text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cognome</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Telefono</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Edificio</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Scala</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Garage</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Posto Auto</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Proprietario</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Affittuario</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Data Inizio Proprietà</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Fine Proprietà</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nome Affittuario</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Giardino</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">In Vendita</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Millesimi</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Metri Quadri</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {condomini.map((condomino, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.surname}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.edificio}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.scala}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.garage}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.postoAuto}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.proprietario}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.affittuario}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.dataInizioProprieta}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.fineProprieta}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.nomeAffittuario}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.giardino}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.inVendita}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.millesimi}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.metriQuadri}</td>
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
