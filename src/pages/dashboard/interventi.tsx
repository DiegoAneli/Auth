'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Dashboard from './index';

const InterventiForm = () => {
  const [interventi, setInterventi] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newIntervento, setNewIntervento] = useState({
    nome: '',
    dataInizio: '',
    dataFine: '',
    tipologia: '',
    azienda: '',
    costo: '',
    edificio: '',
    scala: '',
    tipoIntervento: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('tutti'); // Stato per gestire la scheda attiva

  useEffect(() => {
    const fetchInterventi = async () => {
      const response = await fetch('/api/interventi/list');
      const data = await response.json();
      setInterventi(data);
    };

    fetchInterventi();
  }, []);

  const addOrUpdateIntervento = async () => {
    const url = editingId ? `/api/interventi/edit?id=${editingId}` : '/api/interventi/add';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIntervento),
    });

    if (response.ok) {
      const savedIntervento = await response.json();
      if (editingId) {
        setInterventi(interventi.map(intervento => (intervento._id === editingId ? savedIntervento : intervento)));
        setEditingId(null);
      } else {
        setInterventi([...interventi, savedIntervento]);
      }
      resetForm();
    } else {
      console.error('Errore nella creazione o modifica dell\'intervento');
    }
  };

  const deleteIntervento = async (id: any) => {
    const response = await fetch(`/api/interventi/delete?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setInterventi(interventi.filter((intervento) => intervento._id !== id));
    } else {
      console.error('Errore durante l\'eliminazione dell\'intervento');
    }
  };

  const editIntervento = (intervento: SetStateAction<typeof newIntervento>) => {
    setNewIntervento(intervento);
    setEditingId(intervento._id);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const resetForm = () => {
    setNewIntervento({
      nome: '',
      dataInizio: '',
      dataFine: '',
      tipologia: '',
      azienda: '',
      costo: '',
      edificio: '',
      scala: '',
      tipoIntervento: '',
    });
    setEditingId(null);
  };

  const filterData = (data, query) => {
    if (!query) {
      return data;
    }
    return data.filter((intervento) =>
      Object.values(intervento).some((value) =>
        value ? value.toString().toLowerCase().includes(query.toLowerCase()) : false
      )
    );
  };

  const filterByTab = (data, tab) => {
    if (tab === 'tutti') {
      return data;
    }
    return data.filter((intervento) => intervento.tipologia === tab);
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {editingId ? 'Modifica Intervento' : 'Aggiungi Intervento'}
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
                value={newIntervento.nome}
                onChange={(e) => setNewIntervento({ ...newIntervento, nome: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Nome Intervento"
              />
              <input
                type="date"
                value={newIntervento.dataInizio}
                onChange={(e) => setNewIntervento({ ...newIntervento, dataInizio: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Data Inizio"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
              <input
                type="date"
                value={newIntervento.dataFine}
                onChange={(e) => setNewIntervento({ ...newIntervento, dataFine: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Data Fine"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
              />
              <input
                type="text"
                value={newIntervento.edificio}
                onChange={(e) => setNewIntervento({ ...newIntervento, edificio: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Edificio"
              />
              <input
                type="text"
                value={newIntervento.scala}
                onChange={(e) => setNewIntervento({ ...newIntervento, scala: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Scala"
              />
              <select
                value={newIntervento.tipoIntervento}
                onChange={(e) => setNewIntervento({ ...newIntervento, tipoIntervento: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              >
                <option value="">Seleziona Tipo Intervento</option>
                <option value="Sostituzione">Sostituzione</option>
                <option value="Riparazione">Riparazione</option>
              </select>
              <select
                value={newIntervento.tipologia}
                onChange={(e) => setNewIntervento({ ...newIntervento, tipologia: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              >
                <option value="">Seleziona Tipologia</option>
                <option value="Elettrico">Elettrico</option>
                <option value="Idraulico">Idraulico</option>
                <option value="Muratura">Muratura</option>
                <option value="Altro">Altro</option>
              </select>
              <input
                type="text"
                value={newIntervento.azienda}
                onChange={(e) => setNewIntervento({ ...newIntervento, azienda: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Azienda"
              />
              <input
                type="number"
                value={newIntervento.costo}
                onChange={(e) => setNewIntervento({ ...newIntervento, costo: e.target.value })}
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                placeholder="Costo"
              />
            </div>
          )}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={addOrUpdateIntervento}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingId ? 'Salva Modifiche' : 'Aggiungi Intervento'}
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

          {/* Navigazione a schede */}
          <div className="mt-6">
            <nav className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('tutti')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'tutti' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Tutti
              </button>
              <button
                onClick={() => setActiveTab('Elettrico')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'Elettrico' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Elettrico
              </button>
              <button
                onClick={() => setActiveTab('Idraulico')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'Idraulico' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Idraulico
              </button>
              <button
                onClick={() => setActiveTab('Muratura')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'Muratura' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Muratura
              </button>
              <button
                onClick={() => setActiveTab('Altro')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'Altro' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Altro
              </button>
            </nav>
          </div>

          <h2 className="text-2xl font-bold mt-6">Lista Interventi</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Cerca Interventi..."
          />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#2D3748] text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Nome Intervento
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Data Inizio
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Data Fine
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Edificio
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Scala
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Tipologia
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Tipo Intervento
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Azienda
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Costo
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterData(filterByTab(interventi, activeTab), searchQuery).map((intervento, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.dataInizio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.dataFine}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.edificio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.scala}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.tipologia}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.tipoIntervento}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.azienda}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {intervento.costo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      <button
                        onClick={() => editIntervento(intervento)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => deleteIntervento(intervento._id)}
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

export default InterventiForm;
