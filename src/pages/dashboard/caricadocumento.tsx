'use client';

import { useState } from 'react';
import Dashboard from './index';

const Section1 = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [file, setFile] = useState(null);

  const addDocument = async () => {
    if (newDocumentName.trim() !== '' && file) {
      const formData = new FormData();
      formData.append('documentName', newDocumentName);
      formData.append('file', file);

      const response = await fetch('/api/documents/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newDocument = await response.json();
        setDocuments([...documents, newDocument]);
        setNewDocumentName('');
        setFile(null);
      } else {
        console.error('Errore nella creazione del documento');
      }
    }
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Crea Nuovo Documento</h2>
          <input
            type="text"
            value={newDocumentName}
            onChange={(e) => setNewDocumentName(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Nome del Documento"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          />
          <button
            onClick={addDocument}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Documento
          </button>
          <h2 className="text-2xl font-bold mt-6">Documenti Attuali</h2>
          <ul className="list-disc list-inside">
            {documents.map((document, index) => (
              <li key={index} className="text-lg mt-2">
                {document.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default Section1;
