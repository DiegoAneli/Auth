'use client';

import { useState } from 'react';
import Dashboard from './index';

const ImageUploadPage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [details, setDetails] = useState({});
  const [newDetail, setNewDetail] = useState({ label: '', value: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDetail = () => {
    if (newDetail.label.trim() !== '' && newDetail.value.trim() !== '') {
      setDetails({ ...details, [newDetail.label]: newDetail.value });
      setNewDetail({ label: '', value: '' });
    }
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Carica e Gestisci Immagine</h2>

        {/* Caricamento Immagine */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4">Carica un'Immagine</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>

        {/* Visualizzazione Immagine */}
        {image && (
          <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Immagine Caricata</h3>
            <div className="mb-4">
              <img src={imageUrl} alt="Caricata" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        )}

        {/* Aggiunta Dettagli Relativi all'Immagine */}
        {image && (
          <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Aggiungi Dettagli Relativi all'Immagine</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={newDetail.label}
                onChange={(e) => setNewDetail({ ...newDetail, label: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Titolo del Dettaglio"
              />
              <input
                type="text"
                value={newDetail.value}
                onChange={(e) => setNewDetail({ ...newDetail, value: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Descrizione del Dettaglio"
              />
            </div>
            <button
              onClick={addDetail}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Aggiungi Dettaglio
            </button>
          </div>
        )}

        {/* Visualizzazione Dettagli Aggiunti */}
        {Object.keys(details).length > 0 && (
          <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Dettagli Relativi all'Immagine</h3>
            <div className="space-y-4">
              {Object.keys(details).map((key, index) => (
                <div key={index} className="p-4 bg-gray-700 rounded">
                  <strong>{key}:</strong> {details[key]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default ImageUploadPage;
