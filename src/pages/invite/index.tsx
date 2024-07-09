'use client';

import { useState, useEffect } from 'react';
import NavbarIn from '@/components/NavbarIn'; // Assicurati che il percorso sia corretto

export default function InviteCollaborator() {
  const [form, setForm] = useState({ email: '', role: 'Guest', projectId: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects/get');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/invite/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Invitation sent successfully');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while sending the invitation');
    }
  };

  return (
    <div>
      <NavbarIn />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-800 p-10">
          <h1 className="text-4xl font-bold text-gray-200 mb-6">Invita Collaboratore</h1>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          {success && <p className="text-green-500 mb-6">{success}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-200 mb-2">Ruolo</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              >
                <option value="Guest">Guest</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="projectId" className="block text-gray-200 mb-2">ID Progetto</label>
              <select
                id="projectId"
                name="projectId"
                value={form.projectId}
                onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              >
                <option value="">Seleziona un progetto</option>
                {projects.map((project: any) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300"
            >
              Invita
            </button>
          </form>
        </div>
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          {/* Placeholder for background image or gradient */}
        </div>
      </div>
    </div>
  );
}
