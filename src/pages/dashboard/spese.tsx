'use client';

import { useState } from 'react';
import Dashboard from './index';

const CondoExpensesPage = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      type: 'Manutenzione',
      description: 'Riparazione ascensore',
      amount: 250.00,
      date: new Date(2024, 7, 16).toDateString(),
    },
  ]);
  const [newExpense, setNewExpense] = useState({
    type: '',
    description: '',
    amount: '',
    date: '',
  });

  const addExpense = () => {
    if (newExpense.type && newExpense.description && newExpense.amount && newExpense.date) {
      const expense = {
        id: expenses.length + 1, // Genera un ID semplice
        ...newExpense,
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ type: '', description: '', amount: '', date: '' });
    }
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Gestione Spese Condominiali</h2>
        
        {/* Modulo Aggiunta Spesa */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Aggiungi Nuova Spesa</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={newExpense.type}
              onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Tipo di Spesa"
            />
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Data"
            />
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Descrizione"
            />
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Importo"
            />
          </div>
          <button
            onClick={addExpense}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Spesa
          </button>
        </div>

        {/* Lista Spese */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Lista Spese</h3>
          
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li key={expense.id} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                <div>
                  <strong>Tipo:</strong> {expense.type} <br />
                  <strong>Data:</strong> {expense.date} <br />
                  <strong>Descrizione:</strong> {expense.description} <br />
                  <strong>Importo:</strong> €{expense.amount.toFixed(2)}
                </div>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Elimina
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default CondoExpensesPage;
