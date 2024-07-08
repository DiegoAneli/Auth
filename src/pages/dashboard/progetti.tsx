'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaTrashAlt, FaPlus } from 'react-icons/fa';
import Dashboard from './index';
import { Project } from '@/next-auth';
import { useSession } from 'next-auth/react';

const Section1 = () => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState('');
  const [collaborator, setCollaborator] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectName, setEditingProjectName] = useState('');
  const [originalProjectName, setOriginalProjectName] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects/get', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const projects: Project[] = await response.json();
        setProjects(projects);
      } else {
        console.error('Errore nel caricamento dei progetti');
      }
    };

    fetchProjects();
  }, []);

  const addProject = async () => {
    if (newProjectName.trim() !== '' && description.trim() !== '' && startDate.trim() !== '' && endDate.trim() !== '') {
      const response = await fetch('/api/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          projectName: newProjectName,
          description,
          startDate,
          endDate,
          image,
          collaborator
        }),
      });

      if (response.ok) {
        const newProject: Project = await response.json();
        setProjects([...projects, newProject]);
        setNewProjectName('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setImage('');
        setCollaborator('');
        setShowAddProject(false);
      } else {
        console.error('Errore nella creazione del progetto');
      }
    }
  };

  const deleteProject = async (projectId: string) => {
    const response = await fetch('/api/projects/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ projectId }),
    });

    if (response.ok) {
      setProjects(projects.filter((project) => project._id !== projectId));
    } else {
      console.error('Errore nell\'eliminazione del progetto');
    }
  };

  const startEditing = (projectId: string, projectName: string) => {
    setEditingProjectId(projectId);
    setEditingProjectName(projectName);
    setOriginalProjectName(projectName);
  };

  const cancelEditing = () => {
    setEditingProjectId(null);
    setEditingProjectName('');
  };

  const editProject = async () => {
    if (editingProjectId) {
      const response = await fetch('/api/projects/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ projectId: editingProjectId, projectName: editingProjectName }),
      });

      if (response.ok) {
        const updatedProjects = projects.map((project) =>
          project._id === editingProjectId ? { ...project, name: editingProjectName } : project
        );
        setProjects(updatedProjects);
        setEditingProjectId(null);
        setEditingProjectName('');
      } else {
        console.error('Errore nella modifica del progetto');
      }
    }
  };

  const openProjectModal = async (projectId: string) => {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const project: Project = await response.json();
      setSelectedProject(project);
    } else {
      console.error('Errore nel caricamento del progetto');
    }
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-4 gap-6 p-4">
        <div
          className="bg-[#2D3748] text-white shadow-md rounded-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => setShowAddProject(true)}
        >
          <FaPlus className="text-4xl text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-[#2D3748] text-white shadow-md rounded-lg p-4 flex flex-col justify-between">
            <div className="mb-4 flex items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white mr-2"
                style={{ background: '#4A5568' }} // Puoi usare un colore di sfondo fisso
              >
                {project.avatar}
              </div>
              {editingProjectId === project._id ? (
                <input
                  type="text"
                  value={editingProjectName}
                  onChange={(e) => setEditingProjectName(e.target.value)}
                  className="w-full p-2 mb-2 bg-gray-600 rounded"
                />
              ) : (
                <h3 className="text-xl font-semibold">{project.name}</h3>
              )}
            </div>
            <p className='text-sm p-1'>{project.description}</p>
            <div className="flex justify-between mt-4">
              {editingProjectId === project._id ? (
                <>
                  <button
                    onClick={editProject}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(project._id, project.name)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => openProjectModal(project._id)}
                    className="text-gray-500 hover:text-gray-400 text-sm p-1 rounded"
                  >
                    Dettagli
                  </button>
                </>
              )}
              <button
                onClick={() => deleteProject(project._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setShowAddProject(false)} className="text-gray-500 hover:text-gray-700 absolute top-4 right-4">
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Crea Nuovo Progetto</h2>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
              placeholder="Nome del Progetto"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
              placeholder="Descrizione del Progetto"
            ></textarea>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
              placeholder="Data di Inizio"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
              placeholder="Data di Scadenza"
            />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
              placeholder="URL Immagine (facoltativo)"
            />
            <input
              type="text"
              value={collaborator}
              onChange={(e) => setCollaborator(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
              placeholder="Aggiungi Collaboratore (facoltativo)"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAddProject(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Annulla
              </button>
              <button
                onClick={addProject}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Aggiungi Progetto
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl relative">
            <button onClick={closeProjectModal} className="text-gray-200 hover:text-gray-400 absolute top-4 right-4">
              <FaTimes />
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedProject.name}</h2>
            <p className="mb-4">{selectedProject.description}</p>
            <p className="mb-4">Data di Inizio: {selectedProject.startDate}</p>
            <p className="mb-4">Data di Scadenza: {selectedProject.endDate}</p>
            {selectedProject.image && <img src={selectedProject.image} alt={selectedProject.name} className="mb-4 rounded" />}
            <p className="mb-4">Collaboratore: {selectedProject.collaborator}</p>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Section1;
