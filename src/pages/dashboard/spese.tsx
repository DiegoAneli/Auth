'use client';

import { useState } from 'react';
import Dashboard from './index';

const CondoExpensesPage = () => {
  const [activeTab, setActiveTab] = useState('condo'); // Stato per la scheda attiva
  const [condoExpenses, setCondoExpenses] = useState([
    {
      id: 1,
      type: 'Manutenzione',
      description: 'Riparazione ascensore',
      amount: 250.0,
      date: new Date(2024, 7, 16).toDateString(),
    },
  ]);

  const [personalExpenses, setPersonalExpenses] = useState([]);

  const [newCondoExpense, setNewCondoExpense] = useState({
    type: '',
    description: '',
    amount: '',
    date: '',
  });

  const [newPersonalExpense, setNewPersonalExpense] = useState({
    type: '',
    description: '',
    amount: '',
    date: '',
  });

  const addCondoExpense = () => {
    if (
      newCondoExpense.type &&
      newCondoExpense.description &&
      newCondoExpense.amount &&
      newCondoExpense.date
    ) {
      const expense = {
        id: condoExpenses.length + 1, 
        ...newCondoExpense,
      };
      setCondoExpenses([...condoExpenses, expense]);
      setNewCondoExpense({ type: '', description: '', amount: '', date: '' });
    }
  };

  const addPersonalExpense = () => {
    if (
      newPersonalExpense.type &&
      newPersonalExpense.description &&
      newPersonalExpense.amount &&
      newPersonalExpense.date
    ) {
      const expense = {
        id: personalExpenses.length + 1, 
        ...newPersonalExpense,
      };
      setPersonalExpenses([...personalExpenses, expense]);
      setNewPersonalExpense({ type: '', description: '', amount: '', date: '' });
    }
  };

  const deleteCondoExpense = (id) => {
    const updatedExpenses = condoExpenses.filter((expense) => expense.id !== id);
    setCondoExpenses(updatedExpenses);
  };

  const deletePersonalExpense = (id) => {
    const updatedExpenses = personalExpenses.filter((expense) => expense.id !== id);
    setPersonalExpenses(updatedExpenses);
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Gestione Spese</h2>
        
        {/* Tab selezionabili */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`py-2 px-4 rounded ${activeTab === 'condo' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => setActiveTab('condo')}
          >
            Spese Condominiali
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => setActiveTab('personal')}
          >
            Spese Personali
          </button>
        </div>
        
        {/* Sezione per le spese condominiali */}
        {activeTab === 'condo' && (
          <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Spese Condominiali</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={newCondoExpense.type}
                onChange={(e) => setNewCondoExpense({ ...newCondoExpense, type: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Tipo di Spesa"
              />
              <input
                type="date"
                value={newCondoExpense.date}
                onChange={(e) => setNewCondoExpense({ ...newCondoExpense, date: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Data"
              />
              <input
                type="text"
                value={newCondoExpense.description}
                onChange={(e) => setNewCondoExpense({ ...newCondoExpense, description: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Descrizione"
              />
              <input
                type="number"
                value={newCondoExpense.amount}
                onChange={(e) => setNewCondoExpense({ ...newCondoExpense, amount: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Importo"
              />
            </div>
            <button
              onClick={addCondoExpense}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Aggiungi Spesa Condominiale
            </button>

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-4">Lista Spese Condominiali</h4>
              <ul className="space-y-2">
                {condoExpenses.map((expense) => (
                  <li key={expense.id} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                    <div>
                      <strong>Tipo:</strong> {expense.type} <br />
                      <strong>Data:</strong> {expense.date} <br />
                      <strong>Descrizione:</strong> {expense.description} <br />
                      <strong>Importo:</strong> €{expense.amount.toFixed(2)}
                    </div>
                    <button
                      onClick={() => deleteCondoExpense(expense.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Elimina
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Sezione per le spese personali */}
        {activeTab === 'personal' && (
          <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Spese Personali</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={newPersonalExpense.type}
                onChange={(e) => setNewPersonalExpense({ ...newPersonalExpense, type: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Tipo di Spesa"
              />
              <input
                type="date"
                value={newPersonalExpense.date}
                onChange={(e) => setNewPersonalExpense({ ...newPersonalExpense, date: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Data"
              />
              <input
                type="text"
                value={newPersonalExpense.description}
                onChange={(e) => setNewPersonalExpense({ ...newPersonalExpense, description: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Descrizione"
              />
              <input
                type="number"
                value={newPersonalExpense.amount}
                onChange={(e) => setNewPersonalExpense({ ...newPersonalExpense, amount: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Importo"
              />
            </div>
            <button
              onClick={addPersonalExpense}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Aggiungi Spesa Personale
            </button>

            <div className="mt-6">
              <h4 className="text-lg font-bold mb-4">Lista Spese Personali</h4>
              <ul className="space-y-2">
                {personalExpenses.map((expense) => (
                  <li key={expense.id} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                    <div>
                      <strong>Tipo:</strong> {expense.type} <br />
                      <strong>Data:</strong> {expense.date} <br />
                      <strong>Descrizione:</strong> {expense.description} <br />
                      <strong>Importo:</strong> €{expense.amount.toFixed(2)}
                    </div>
                    <button
                      onClick={() => deletePersonalExpense(expense.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Elimina
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default CondoExpensesPage;
