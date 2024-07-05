'use client';

import Dashboard from './index';

const Section1 = () => {
  return (
    <Dashboard>
      <div>
        <h2 className="text-2xl font-bold text-gray-400 mt-8">Carica Documento</h2>
        <p className="text-white mt-4 mb-4">
          Questa è una breve descrizione della prima sezione della tua dashboard.
        </p>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300"
        >
          Aggiungi documento
        </button>
      </div>
    </Dashboard>
  );
};

export default Section1;
