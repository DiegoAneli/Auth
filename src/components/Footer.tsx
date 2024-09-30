'use client';

import { FaFacebookF, FaTwitter, FaSnapchatGhost, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1A202C] text-gray-400 py-8">
      <div className="container mx-auto px-6 flex flex-wrap justify-between">
        {/* Services Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">Services</h2>
          <ul>
            <li className="mb-2"><a href="#">Pianificare un progetto</a></li>
            <li className="mb-2"><a href="#">Sviluppo di un attività</a></li>
            <li className="mb-2"><a href="#">Chat in tempo reale</a></li>
            <li className="mb-2"><a href="#">Organizzare i propri documenti</a></li>
            <li className="mb-2"><a href="#">Videoconferenza</a></li>
            <li className="mb-2"><a href="#">Appuntamenti calendario</a></li>
          </ul>
        </div>
        {/* About Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">About</h2>
          <ul>
            <li className="mb-2"><a href="#">Company</a></li>
            <li className="mb-2"><a href="#">Team</a></li>
            <li className="mb-2"><a href="#">Careers</a></li>
          </ul>
        </div>
        {/* Company Name Section */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">You4Condo</h2>
          <p className="mb-4">
          Un software di gestione dei task pensato per semplificare la tua giornata lavorativa, migliorare la collaborazione e aumentare la produttività.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-200"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-gray-200"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-gray-200"><FaSnapchatGhost /></a>
            <a href="#" className="text-gray-400 hover:text-gray-200"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-200">
        <p>You4Condo © 2024</p>
      </div>
    </footer>
  );
}
