'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavbarIn from '../../components/NavbarIn';

const EditUserPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [fiscalCode, setFiscalCode] = useState('');
  const [image, setImage] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session && session.user) {
      setName(session.user.name || '');
      setSurname(session.user.surname || '');
      setPhone(session.user.phone || '');
      setEmail(session.user.email || '');
      setAddress(session.user.address || '');
      setCity(session.user.city || '');
      setPostalCode(session.user.postalCode || '');
      setFiscalCode(session.user.fiscalCode || '');
      setImage(session.user.image || '');
      setBirthdate(session.user.birthdate || '');
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !surname || !phone || !email || !address || !city || !postalCode || !fiscalCode || !birthdate) {
      setMessage('Tutti i campi sono obbligatori');
      return;
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, phone, email, address, city, postalCode, fiscalCode, image, birthdate }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Utente aggiornato con successo');
      } else {
        setMessage(data.message || 'Errore nell\'aggiornamento dell\'utente');
      }
    } catch (error) {
      setMessage('Errore durante l\'aggiornamento');
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <NavbarIn />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full px-8 md:px-16 lg:px-32 xl:px-64 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Modifica Profilo
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                  Cognome
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Numero di Telefono
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Indirizzo
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  Città
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postalCode">
                  CAP
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fiscalCode">
                  Codice Fiscale
                </label>
                <input
                  type="text"
                  id="fiscalCode"
                  name="fiscalCode"
                  value={fiscalCode}
                  onChange={(e) => setFiscalCode(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Immagine
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthdate">
                  Data di Nascita
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            {message && <p className="text-red-500 text-xs italic">{message}</p>}
            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300"
              >
                Aggiorna
              </button>
            </div>
          </form>
          <div className="flex space-x-4 mt-6 justify-center">
            <Link href="/auth/dashboard">
              <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
                Vai alla Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
