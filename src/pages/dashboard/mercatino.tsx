'use client';

import { useState } from 'react';
import Dashboard from './index';

const MercatinoPage = () => {
  const [annunci, setAnnunci] = useState([
    { 
      id: 1, 
      title: 'Vendita Bicicletta', 
      description: 'Bicicletta in ottime condizioni, poco usata.', 
      type: 'Vendita', 
      price: '€100', 
      author: 'Mario Rossi', 
      date: new Date(2024, 7, 16).toDateString(),
      imageUrl: ''
    },
    { 
      id: 2, 
      title: 'Affitto Appartamento', 
      description: 'Appartamento luminoso al secondo piano, con tre stanze da letto.', 
      type: 'Affitto', 
      price: '€600 al mese', 
      author: 'Luigi Bianchi', 
      date: new Date(2024, 7, 18).toDateString(),
      imageUrl: ''
    },
  ]);
  const [newAnnuncio, setNewAnnuncio] = useState({
    title: '',
    description: '',
    type: 'Vendita',
    price: '',
    author: 'Nome Cognome',
    date: new Date().toDateString(),
    imageUrl: ''
  });

  const addAnnuncio = () => {
    if (newAnnuncio.title && newAnnuncio.description && newAnnuncio.price) {
      const annuncio = {
        id: annunci.length + 1, // Genera un ID semplice
        ...newAnnuncio,
      };
      setAnnunci([...annunci, annuncio]);
      setNewAnnuncio({
        title: '',
        description: '',
        type: 'Vendita',
        price: '',
        author: 'Nome Cognome',
        date: new Date().toDateString(),
        imageUrl: ''
      });
    }
  };

  const deleteAnnuncio = (id) => {
    const updatedAnnunci = annunci.filter(annuncio => annuncio.id !== id);
    setAnnunci(updatedAnnunci);
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Mercatino del Condominio</h2>

        {/* Modulo Aggiunta Annuncio */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Crea Nuovo Annuncio</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={newAnnuncio.title}
              onChange={(e) => setNewAnnuncio({ ...newAnnuncio, title: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Titolo Annuncio"
            />
            <select
              value={newAnnuncio.type}
              onChange={(e) => setNewAnnuncio({ ...newAnnuncio, type: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
            >
              <option value="Vendita">Vendita</option>
              <option value="Affitto">Affitto</option>
            </select>
            <input
              type="text"
              value={newAnnuncio.price}
              onChange={(e) => setNewAnnuncio({ ...newAnnuncio, price: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Prezzo"
            />
            <input
              type="text"
              value={newAnnuncio.author}
              onChange={(e) => setNewAnnuncio({ ...newAnnuncio, author: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Autore"
            />
            <input
              type="date"
              value={new Date(newAnnuncio.date).toISOString().split('T')[0]}
              onChange={(e) => setNewAnnuncio({ ...newAnnuncio, date: new Date(e.target.value).toDateString() })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Data"
            />
            <textarea
              value={newAnnuncio.description}
              onChange={(e) => setNewAnnuncio({ ...newAnnuncio, description: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="Descrizione"
              rows="3"
            />
            <input
              type="text"
              value={newAnnuncio.imageUrl}
              onChange={(e) => setNewAnnuncio({ ...newAnnuncio, imageUrl: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded"
              placeholder="URL Immagine (opzionale)"
            />
          </div>
          <button
            onClick={addAnnuncio}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Annuncio
          </button>
        </div>

        {/* Lista Annunci */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Lista Annunci</h3>
          
          <ul className="space-y-4">
            {annunci.map((annuncio) => (
              <li key={annuncio.id} className="p-4 bg-gray-700 rounded">
                <div className="flex justify-between">
                  <div>
                    <strong>{annuncio.title}</strong> <br />
                    <strong>Tipo:</strong> {annuncio.type} <br />
                    <strong>Prezzo:</strong> {annuncio.price} <br />
                    <strong>Descrizione:</strong> {annuncio.description} <br />
                    <strong>Autore:</strong> {annuncio.author} <br />
                    <strong>Data:</strong> {annuncio.date} <br />
                    {annuncio.imageUrl && (
                      <img src={annuncio.imageUrl} alt="Annuncio" className="mt-2 w-32 h-32 object-cover rounded" />
                    )}
                  </div>
                  <button
                    onClick={() => deleteAnnuncio(annuncio.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Elimina
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

export default MercatinoPage;
