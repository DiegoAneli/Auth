'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import { FaUserFriends, FaChartBar, FaBuilding, FaConnectdevelop } from 'react-icons/fa';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* ///Left section */}
        <div className="flex-1 flex flex-col justify-center bg-[#1A202C] p-10">
          <h1 className="text-6xl font-bold text-gray-200 mb-4">
            Rendi la Gestione del Tuo Condominio Semplice e Intuitiva
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Un software gestionale pensato per semplificare la gestione del tuo condominio, migliorare la comunicazione tra gli inquilini e facilitare l'amministrazione.
          </p>
          <p className="text-md text-gray-400 mb-8 text-2xl font-semibold ">
            You4Condo è il tuo nuovo alleato nella gestione del condominio. Con un'interfaccia intuitiva e funzionalità avanzate, ti aiuta a rimanere organizzato e concentrato sui compiti amministrativi. Che tu sia un amministratore di condominio o un inquilino, You4Condo è la soluzione perfetta per ottimizzare la gestione e migliorare l'efficienza.
          </p>
          <div className="flex space-x-4">
            <Link href="/auth/register">
              <button className="bg-gradient-to-r from-blue-400 via-violet-500 to-orange-500 text-gray-200 py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
                Registrati
              </button>
            </Link>
            <Link href="/api/auth/signin?csrf=true">
              <button className="bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-gray-200 py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
                Accedi
              </button>
            </Link>
          </div>
        </div>
        
       {/* Right section */}
       <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full md:w-3/4 md:h-3/4">
              <img src="/images/due.png" className="absolute top-0 left-0 w-full h-auto md:w-3/4 rounded-lg shadow-white" alt="Immagine 1" />
              <img src="/images/uno.png" className="absolute top-20 left-0 w-full h-auto md:w-3/4 md:left-20 rounded-lg shadow-white" alt="Immagine 2" />
              <img src="/images/tre.png" className="absolute top-40 left-0 w-full h-auto md:w-3/4 md:left-40 rounded-lg shadow-white" alt="Immagine 3" />
            </div>
          </div>
          {/* Modifica questa sezione per cambiare la sfumatura */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1A202C] pointer-events-none"></div>
          {/* Fine della sezione di modifica */}
          <div className="text-white text-6xl font-bold"></div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#1A202C]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">Caratteristiche Principali</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FaUserFriends className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-teal-500">Comunicazione Efficace</h3>
              <p className="text-gray-400">
                Facilita la comunicazione tra inquilini e amministratori con una piattaforma centralizzata, semplice e intuitiva.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FaBuilding className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-teal-500">Gestione Condominio</h3>
              <p className="text-gray-400">
                Monitora e gestisci tutte le attività del condominio, dagli interventi di manutenzione alle assemblee condominiali.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FaChartBar className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-teal-500">Reportistica e Contabilità</h3>
              <p className="text-gray-400">
                Ottieni report dettagliati sulla contabilità condominiale, verifica il budget e mantieni sotto controllo le spese.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FaConnectdevelop className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-teal-500">Integrazioni Versatili</h3>
              <p className="text-gray-400">
                Connetti il gestionale condominiale con le tue app preferite per una gestione centralizzata e fluida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-[#1A202C] py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-200">Cosa Dicono i Nostri Utenti</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 px-4 py-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-800 text-2xl font-bold">D</span>
              </div>
              <p className="mb-4 text-gray-400">"Grazie a You4Condo, la gestione del nostro condominio è diventata molto più semplice e trasparente."</p>
              <p className="font-semibold text-gray-200">- Diego</p>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-800 text-2xl font-bold">P</span>
              </div>
              <p className="mb-4 text-gray-400">"Finalmente un gestionale che mi permette di mantenere tutto sotto controllo senza fatica."</p>
              <p className="font-semibold text-gray-200">- Pietro</p>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-800 text-2xl font-bold">M</span>
              </div>
              <p className="mb-4 text-gray-400">"You4Condo ha semplificato la gestione dei conti e ha migliorato la trasparenza delle spese."</p>
              <p className="font-semibold text-gray-200">- Michele</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Inizia Ora Gratuitamente e Scopri Come Possiamo Trasformare la Gestione del Tuo Condominio!</h2>
          <p className="text-xl mb-8">Iscriviti Subito e Gestisci il Tuo Condominio con Facilità!</p>
          <Link href="/api/auth/signin?csrf=true">
            <button className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
              Inizia Ora
            </button>
          </Link>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
