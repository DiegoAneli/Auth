'use client';

import { useState } from 'react';
import Dashboard from './index';

const Section1 = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');

  const addProject = async () => {
    if (newProjectName.trim() !== '') {
      const response = await fetch('/api/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName: newProjectName }),
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects([...projects, newProject]);
        setNewProjectName('');
      } else {
        console.error('Errore nella creazione del progetto');
      }
    }
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Crea Nuovo Progetto</h2>
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Nome del Progetto"
          />
          <button
            onClick={addProject}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Aggiungi Progetto
          </button>
          <h2 className="text-2xl font-bold mt-6">Progetti Attuali</h2>
          <ul className="list-disc list-inside">
            {projects.map((project, index) => (
              <li key={index} className="text-lg mt-2">
                {project.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default Section1;
