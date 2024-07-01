'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-center bg-white p-10">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Rendi la Gestione dei Tuoi Progetti Semplice e Intuitiva
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Un software di gestione dei task pensato per semplificare la tua giornata lavorativa, migliorare la collaborazione e aumentare la produttività.
          </p>
          <p className="text-md text-gray-600 mb-8">
            You4Task è il tuo nuovo alleato nella gestione dei progetti. Con un'interfaccia intuitiva e funzionalità avanzate, ti aiuta a rimanere organizzato e concentrato sui tuoi obiettivi. Che tu lavori da solo o in team, You4Task è la soluzione perfetta per ottimizzare il tuo tempo e migliorare l'efficienza.
          </p>
          <div className="flex space-x-4">
            <Link href="/auth/register">
              <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
                Registrati
              </button>
            </Link>
            <Link href="/api/auth/signin?csrf=true">
              <button className="bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
                Accedi
              </button>
            </Link>
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="text-white text-6xl font-bold"></div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-400">Caratteristiche Principali</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Interfaccia User-Friendly</h3>
                <p>Naviga facilmente tra i tuoi task con un design semplice e intuitivo.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Collaborazione in Tempo Reale</h3>
                <p>Lavora insieme al tuo team ovunque tu sia, con aggiornamenti in tempo reale.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Reportistica Avanzata</h3>
                <p>Monitora l'avanzamento dei tuoi progetti con report dettagliati e personalizzabili.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Integrazioni Versatili</h3>
                <p>Connetti TaskManager con le tue app preferite per una gestione centralizzata dei tuoi progetti.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Collaborazione in Tempo Reale</h3>
                <p>Lavora insieme al tuo team ovunque tu sia, con aggiornamenti in tempo reale.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Reportistica Avanzata</h3>
                <p>Monitora l'avanzamento dei tuoi progetti con report dettagliati e personalizzabili.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Cosa Dicono i Nostri Utenti</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4 text-gray-800">"Grazie a You4Task, il nostro team ha migliorato la collaborazione e ridotto i tempi di consegna dei progetti."</p>
                <p className="font-semibold">- [Nome Cliente]</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4 text-gray-800">"Finalmente ho trovato uno strumento che mi aiuta a rimanere organizzato e a raggiungere i miei obiettivi."</p>
                <p className="font-semibold">- [Nome Cliente]</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="mb-4 text-gray-800">"Grazie a You4Task, il nostro team ha migliorato la collaborazione e ridotto i tempi di consegna dei progetti."</p>
                <p className="font-semibold">- [Nome Cliente]</p>
              </div>
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
    </div>
  );
}
