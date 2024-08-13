'use client';

import { useState, useEffect } from 'react';
import Dashboard from './index';

const Section1 = () => {
  const [documents, setDocuments] = useState([]);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await fetch('/api/documents/list');
      const docs = await response.json();
      setDocuments(docs);
    };

    fetchDocuments();
  }, []);

  const addDocument = async () => {
    if (newDocumentName.trim() !== '' && selectedFile) {
      const formData = new FormData();
      formData.append('documentName', newDocumentName);
      formData.append('file', selectedFile);

      const response = await fetch('/api/documents/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newDocument = await response.json();
        setDocuments([...documents, newDocument]);
        setNewDocumentName('');
        setSelectedFile(null);
      } else {
        console.error('Errore nella creazione del documento');
      }
    }
  };

  const deleteDocument = async (id) => {
    const response = await fetch(`/api/documents/delete?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDocuments(documents.filter((doc) => doc._id !== id));
    } else {
      console.error('Errore durante l\'eliminazione del documento');
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
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          />
          <button
            onClick={addDocument}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Documento
          </button>
          <h2 className="text-2xl font-bold mt-6">Documenti Attuali</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#2D3748] text-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nome Documento
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nome File
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estensione
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      <a
                        href={`/api/documents/download?id=${document._id}`}
                        className="text-blue-400 hover:text-blue-600"
                        download={document.originalFilename}
                      >
                        {document.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {document.originalFilename}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      {document.extension}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                      <button
                        onClick={() => deleteDocument(document._id)}
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

export default Section1;
