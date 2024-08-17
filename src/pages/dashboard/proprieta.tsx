'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Dashboard from './index';

const ProprietaAnagrafica = () => {
  const [proprietas, setProprietas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Stato per il campo di ricerca
  const [newProprieta, setNewProprieta] = useState({
    nome: '',
    cognome: '',
    edificio: '',
    scala: '',
    piano: '',
    balcone: '',
    garage: '',
    postoAuto: '',
    numeroCatastale: '',
    descrizione: '',
    superficie: '',
    numeroVani: '',
    raffreddamento: '',
    statoManutenzione: '',
    allaccioGas: '',
    induzione: '',
    sky: '',
    allaccioInternet: '',
    numeroBagni: '',
    inAffitto: '',
    dataInizioProprieta: '',
    fineProprieta: '',
    giardino: '',
    inVendita: '',
    millesimi: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProprietas = async () => {
      const response = await fetch('/api/proprietas/list');
      const data = await response.json();
      setProprietas(data);
    };

    fetchProprietas();
  }, []);

  const addOrUpdateProprieta = async () => {
    const url = editingId ? `/api/proprietas/edit?id=${editingId}` : '/api/proprietas/add';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProprieta),
    });

    if (response.ok) {
      const savedProprieta = await response.json();
      if (editingId) {
        setProprietas(proprietas.map(proprieta => (proprieta._id === editingId ? savedProprieta : proprieta)));
        setEditingId(null);
      } else {
        setProprietas([...proprietas, savedProprieta]);
      }
      resetForm();
    } else {
      console.error('Errore nella creazione o modifica della proprietà');
    }
  };

  const deleteProprieta = async (id: any) => {
    const response = await fetch(`/api/proprietas/delete?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProprietas(proprietas.filter((proprieta) => proprieta._id !== id));
    } else {
      console.error('Errore durante l\'eliminazione della proprietà');
    }
  };

  const editProprieta = (proprieta: SetStateAction<typeof newProprieta>) => {
    setNewProprieta(proprieta);
    setEditingId(proprieta._id);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const resetForm = () => {
    setNewProprieta({
      nome: '',
      cognome: '',
      edificio: '',
      scala: '',
      piano: '',
      balcone: '',
      garage: '',
      postoAuto: '',
      numeroCatastale: '',
      descrizione: '',
      superficie: '',
      numeroVani: '',
      raffreddamento: '',
      statoManutenzione: '',
      allaccioGas: '',
      induzione: '',
      sky: '',
      allaccioInternet: '',
      numeroBagni: '',
      inAffitto: '',
      dataInizioProprieta: '',
      fineProprieta: '',
      giardino: '',
      inVendita: '',
      millesimi: ''
    });
    setEditingId(null);
  };

  // Filtro per la ricerca
  const filteredProprietas = proprietas.filter((proprieta) => 
    Object.values(proprieta).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Dashboard>
      <style jsx>{`
        /* Personalizzazione dello scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #ffffff;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #2D3748;
        }
      `}</style>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {editingId ? 'Modifica Proprietà' : 'Aggiungi Proprietà'}
            </h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isExpanded ? 'Riduci' : 'Espandi'}
            </button>
          </div>
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={newProprieta.nome}
                onChange={(e) => setNewProprieta({ ...newProprieta, nome: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Nome"
              />
              <input
                type="text"
                value={newProprieta.cognome}
                onChange={(e) => setNewProprieta({ ...newProprieta, cognome: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Cognome"
              />
              <input
                type="text"
                value={newProprieta.edificio}
                onChange={(e) => setNewProprieta({ ...newProprieta, edificio: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Edificio"
              />
              <input
                type="text"
                value={newProprieta.scala}
                onChange={(e) => setNewProprieta({ ...newProprieta, scala: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Scala"
              />
              <input
                type="text"
                value={newProprieta.piano}
                onChange={(e) => setNewProprieta({ ...newProprieta, piano: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Piano"
              />
              <input
                type="text"
                value={newProprieta.balcone}
                onChange={(e) => setNewProprieta({ ...newProprieta, balcone: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Balcone"
              />
              <input
                type="text"
                value={newProprieta.numeroBagni}
                onChange={(e) => setNewProprieta({ ...newProprieta, numeroBagni: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Numero Bagni"
              />
              <input
                type="text"
                value={newProprieta.garage}
                onChange={(e) => setNewProprieta({ ...newProprieta, garage: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Garage"
              />
              <input
                type="text"
                value={newProprieta.postoAuto}
                onChange={(e) => setNewProprieta({ ...newProprieta, postoAuto: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Posto Auto"
              />
              <input
                type="number"
                value={newProprieta.numeroCatastale}
                onChange={(e) => setNewProprieta({ ...newProprieta, numeroCatastale: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Numero Catastale"
              />
              <input
                type="text"
                value={newProprieta.descrizione}
                onChange={(e) => setNewProprieta({ ...newProprieta, descrizione: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Descrizione"
              />
              <input
                type="number"
                value={newProprieta.superficie}
                onChange={(e) => setNewProprieta({ ...newProprieta, superficie: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Superficie Mq"
              />
              <input
                type="number"
                value={newProprieta.numeroVani}
                onChange={(e) => setNewProprieta({ ...newProprieta, numeroVani: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Numero Vani"
              />
              <input
                type="date"
                value={newProprieta.dataInizioProprieta}
                onChange={(e) => setNewProprieta({ ...newProprieta, dataInizioProprieta: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Data Inizio Proprietà"
              />
              <input
                type="date"
                value={newProprieta.fineProprieta}
                onChange={(e) => setNewProprieta({ ...newProprieta, fineProprieta: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Data Fine Proprietà"
              />
              <input
                type="text"
                value={newProprieta.raffreddamento}
                onChange={(e) => setNewProprieta({ ...newProprieta, raffreddamento: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Raffreddamento"
              />
              <input
                type="text"
                value={newProprieta.giardino}
                onChange={(e) => setNewProprieta({ ...newProprieta, giardino: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Giardino"
              />
              <input
                type="text"
                value={newProprieta.inVendita}
                onChange={(e) => setNewProprieta({ ...newProprieta, inVendita: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="In Vendita"
              />
              <input
                type="number"
                value={newProprieta.millesimi}
                onChange={(e) => setNewProprieta({ ...newProprieta, millesimi: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Millesimi"
              />
              <input
                type="text"
                value={newProprieta.statoManutenzione}
                onChange={(e) => setNewProprieta({ ...newProprieta, statoManutenzione: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Stato di Manutenzione"
              />
              <input
                type="text"
                value={newProprieta.allaccioGas}
                onChange={(e) => setNewProprieta({ ...newProprieta, allaccioGas: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Allaccio Gas"
              />
              <input
                type="text"
                value={newProprieta.allaccioInternet}
                onChange={(e) => setNewProprieta({ ...newProprieta, allaccioInternet: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Internet"
              />
              <input
                type="text"
                value={newProprieta.induzione}
                onChange={(e) => setNewProprieta({ ...newProprieta, induzione: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Induzione"
              />
              <input
                type="text"
                value={newProprieta.sky}
                onChange={(e) => setNewProprieta({ ...newProprieta, sky: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Sky"
              />
              <input
                type="text"
                value={newProprieta.inAffitto}
                onChange={(e) => setNewProprieta({ ...newProprieta, inAffitto: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="In Affitto"
              />
              
              {/* Aggiungi tutti gli altri campi di input qui */}
            </div>
          )}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={addOrUpdateProprieta}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingId ? 'Salva Modifiche' : 'Aggiungi Proprietà'}
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

          {/* Campo di ricerca */}
          <div className="my-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Cerca nella tabella..."
            />
          </div>

          <h2 className="text-2xl font-bold mt-6">Lista Proprietà</h2>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full bg-[#2D3748] text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cognome</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Edificio</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Scala</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Piano</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Balcone</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Numero Bagni</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Garage</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Posto Auto</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Numero Catastale</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Descrizione</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Superficie Mq</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Numero Vani</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Data Inizio Proprietà</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Fine Proprietà</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Raffreddamento</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Giardino</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">In Vendita</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Millesimi</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Stato di Manutenzione</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Allaccio Gas</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Allaccio Internet</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cucina ad Induzione</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Sky</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">In Affitto</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredProprietas.map((proprieta, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.cognome}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.edificio}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.scala}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.piano}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.balcone}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.numeroBagni}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.garage}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.postoAuto}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.numeroCatastale}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.descrizione}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.superficie}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.numeroVani}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.dataInizioProprieta}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.fineProprieta}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.raffreddamento}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.giardino}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.inVendita}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.millesimi}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.statoManutenzione}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.allaccioGas}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.allaccioInternet}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.induzione}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.sky}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{proprieta.inAffitto}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      <button
                        onClick={() => editProprieta(proprieta)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => deleteProprieta(proprieta._id)}
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

export default ProprietaAnagrafica;
