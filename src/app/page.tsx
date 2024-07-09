'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import { FaUserFriends, FaChartBar, FaProjectDiagram, FaConnectdevelop } from 'react-icons/fa';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-center bg-[#1A202C] p-10">
          <h1 className="text-6xl font-bold text-gray-200 mb-4">
            Rendi la Gestione dei Tuoi Progetti Semplice e Intuitiva
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Un software di gestione dei task pensato per semplificare la tua giornata lavorativa, migliorare la collaborazione e aumentare la produttività.
          </p>
          <p className="text-md text-gray-400 mb-8">
            You4Task è il tuo nuovo alleato nella gestione dei progetti. Con un'interfaccia intuitiva e funzionalità avanzate, ti aiuta a rimanere organizzato e concentrato sui tuoi obiettivi. Che tu lavori da solo o in team, You4Task è la soluzione perfetta per ottimizzare il tuo tempo e migliorare l'efficienza.
          </p>
          <div className="flex space-x-4">
            <Link href="/auth/register">
              <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-gray-200 py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
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
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center relative">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative w-3/4 h-3/4 mt-20">
              <img src="/images/due.png" className="absolute top-0 left-0 w-3/4 h-auto rounded-lg shadow-white" alt="Immagine 1" />
              <img src="/images/uno.png" className="absolute top-20 left-20 w-3/4 h-auto rounded-lg shadow-white" alt="Immagine 2" />
              <img src="/images/tre.png" className="absolute top-40 left-40 w-3/4 h-auto rounded-lg shadow-white" alt="Immagine 3" />
            </div>
          </div>
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
              <h3 className="text-2xl font-bold mb-4 text-gray-200">Interfaccia User-Friendly</h3>
              <p className="text-gray-300">
                Naviga facilmente tra i tuoi task con un design semplice e intuitivo. Il nostro software è stato progettato per essere utilizzato da chiunque, indipendentemente dal livello di competenza tecnica.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FaProjectDiagram className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-200">Collaborazione in Tempo Reale</h3>
              <p className="text-gray-300">
                Lavora insieme al tuo team ovunque tu sia, con aggiornamenti in tempo reale. La nostra piattaforma consente una comunicazione fluida e una condivisione immediata delle informazioni.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FaChartBar className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-200">Reportistica Avanzata</h3>
              <p className="text-gray-300">
                Monitora l'avanzamento dei tuoi progetti con report dettagliati e personalizzabili. Ottieni una panoramica chiara e approfondita delle tue attività e dei risultati raggiunti.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <FaConnectdevelop className="h-12 w-12 text-gray-200" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-200">Integrazioni Versatili</h3>
              <p className="text-gray-300">
                Connetti TaskManager con le tue app preferite per una gestione centralizzata dei tuoi progetti. Sfrutta al massimo gli strumenti che già utilizzi nel tuo flusso di lavoro quotidiano.
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
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">D</span>
              </div>
              <p className="mb-4 text-gray-300">"Grazie a You4Task, il nostro team ha migliorato la collaborazione e ridotto i tempi di consegna dei progetti."</p>
              <p className="font-semibold text-gray-200">- Diego</p>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <p className="mb-4 text-gray-300">"Finalmente ho trovato uno strumento che mi aiuta a rimanere organizzato e a raggiungere i miei obiettivi."</p>
              <p className="font-semibold text-gray-200">- Pietro</p>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-700 flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <p className="mb-4 text-gray-300">"Grazie a You4Task, il nostro team ha migliorato la collaborazione e ridotto i tempi di consegna dei progetti."</p>
              <p className="font-semibold text-gray-200">- Michele</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Inizia Ora Gratuitamente e Scopri Come Possiamo Trasformare la Tua Produttività!</h2>
          <p className="text-xl mb-8">Iscriviti Subito e Gestisci i Tuoi Task con Facilità!</p>
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
