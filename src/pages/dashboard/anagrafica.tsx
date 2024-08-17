'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Dashboard from './index';

const CondominiAnagrafica = () => {
  const [condomini, setCondomini] = useState([]);
  const [affittuari, setAffittuari] = useState([]);
  const [amministratori, setAmministratori] = useState([]);
  const [condominii, setCondominii] = useState([]);
  
  // Stati per le query di ricerca
  const [searchQueryCondomini, setSearchQueryCondomini] = useState('');
  const [searchQueryAffittuari, setSearchQueryAffittuari] = useState('');
  const [searchQueryAmministratori, setSearchQueryAmministratori] = useState('');
  const [searchQueryCondominii, setSearchQueryCondominii] = useState('');

  const [newCondomino, setNewCondomino] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    edificio: '',
    scala:'',
    garage:'',
    postoAuto:'',
    animaliDomestici:'',
    allarmi:'',
    proprietario:'',
    affittuario:'',
    dataInizioProprieta: '',
    fineProprieta: '',
    giardino: '',
  });

  const [newAffittuario, setNewAffittuario] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    edificio: '',
    scala: '',
    codiceFiscale:'',
    garage:'', 
    postoAuto:'', 
    canoneMensile:'',
    dataInizioContratto:'', 
    dataFineContratto:'', 
    depositoCauzionale:'',
  });

  const [newAmministratore, setNewAmministratore] = useState({
    name:'', 
    surname:'', 
    phone:'', 
    email:'', 
    ragioneSociale:'', 
    partitaIva:'', 
    codiceFiscale:'', 
    recapiti:'', 
    numeroIscrizioneAlbo:'', 
    assicurazione:'', 
    specializzazioni:'', 
    esperienza:'',
    dataInizioIncarico:'',
  });

  const [newCondominio, setNewCondominio] = useState({
    name: '',
    indirizzo: '',
    numeroUnita: '',
    referente:'', 
    phone:'', 
    email:'', 
    tipologiaComplessoResidenziale:'',
  });

  const [editingId, setEditingId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('condomini');

  useEffect(() => {
    const fetchCondomini = async () => {
      const response = await fetch('/api/condomini/list');
      const data = await response.json();
      setCondomini(data);
    };

    const fetchAffittuari = async () => {
      const response = await fetch('/api/affittuari/list');
      const data = await response.json();
      setAffittuari(data);
    };

    const fetchAmministratori = async () => {
      const response = await fetch('/api/amministratori/list');
      const data = await response.json();
      setAmministratori(data);
    };

    const fetchCondominii = async () => {
      const response = await fetch('/api/condominii/list');
      const data = await response.json();
      setCondominii(data);
    };

    fetchCondomini();
    fetchAffittuari();
    fetchAmministratori();
    fetchCondominii();
  }, []);

  const addOrUpdateEntity = async () => {
    let url = '';
    let method = 'POST';
    let body = {};

    switch (activeTab) {
      case 'condomini':
        url = editingId ? `/api/condomini/edit?id=${editingId}` : '/api/condomini/add';
        body = newCondomino;
        break;
      case 'affittuari':
        url = editingId ? `/api/affittuari/edit?id=${editingId}` : '/api/affittuari/add';
        body = newAffittuario;
        break;
      case 'amministratori':
        url = editingId ? `/api/amministratori/edit?id=${editingId}` : '/api/amministratori/add';
        body = newAmministratore;
        break;
      case 'condominii':
        url = editingId ? `/api/condominii/edit?id=${editingId}` : '/api/condominii/add';
        body = newCondominio;
        break;
      default:
        return;
    }

    if (editingId) {
      method = 'PUT';
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const savedEntity = await response.json();

      switch (activeTab) {
        case 'condomini':
          if (editingId) {
            setCondomini(condomini.map(condomino => (condomino._id === editingId ? savedEntity : condomino)));
          } else {
            setCondomini([...condomini, savedEntity]);
          }
          break;
        case 'affittuari':
          if (editingId) {
            setAffittuari(affittuari.map(affittuario => (affittuario._id === editingId ? savedEntity : affittuario)));
          } else {
            setAffittuari([...affittuari, savedEntity]);
          }
          break;
        case 'amministratori':
          if (editingId) {
            setAmministratori(amministratori.map(amministratore => (amministratore._id === editingId ? savedEntity : amministratore)));
          } else {
            setAmministratori([...amministratori, savedEntity]);
          }
          break;
        case 'condominii':
          if (editingId) {
            setCondominii(condominii.map(condominio => (condominio._id === editingId ? savedEntity : condominio)));
          } else {
            setCondominii([...condominii, savedEntity]);
          }
          break;
        default:
          break;
      }

      resetForm();
    } else {
      console.error('Errore nella creazione o modifica dell\'entità');
    }
  };

  const deleteEntity = async (id: any) => {
    let url = '';

    switch (activeTab) {
      case 'condomini':
        url = `/api/condomini/delete?id=${id}`;
        break;
      case 'affittuari':
        url = `/api/affittuari/delete?id=${id}`;
        break;
      case 'amministratori':
        url = `/api/amministratori/delete?id=${id}`;
        break;
      case 'condominii':
        url = `/api/condominii/delete?id=${id}`;
        break;
      default:
        return;
    }

    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (response.ok) {
      switch (activeTab) {
        case 'condomini':
          setCondomini(condomini.filter((condomino) => condomino._id !== id));
          break;
        case 'affittuari':
          setAffittuari(affittuari.filter((affittuario) => affittuario._id !== id));
          break;
        case 'amministratori':
          setAmministratori(amministratori.filter((amministratore) => amministratore._id !== id));
          break;
        case 'condominii':
          setCondominii(condominii.filter((condominio) => condominio._id !== id));
          break;
        default:
          break;
      }
    } else {
      console.error('Errore durante l\'eliminazione dell\'entità');
    }
  };

  const editEntity = (entity: any) => {
    switch (activeTab) {
      case 'condomini':
        setNewCondomino(entity);
        break;
      case 'affittuari':
        setNewAffittuario(entity);
        break;
      case 'amministratori':
        setNewAmministratore(entity);
        break;
      case 'condominii':
        setNewCondominio(entity);
        break;
      default:
        return;
    }
    setEditingId(entity._id);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const resetForm = () => {
    setNewCondomino({
      name: '',
      surname: '',
      phone: '',
      email: '',
      edificio: '',
      scala:'',
      garage:'',
      postoAuto:'',
      animaliDomestici:'',
      allarmi:'',
      proprietario:'',
      affittuario:'',
      dataInizioProprieta: '',
      fineProprieta: '',
      giardino: '',
    });

    setNewAffittuario({
      name: '',
      surname: '',
      phone: '',
      email: '',
      edificio: '',
      scala: '',
      codiceFiscale:'',
      garage:'', 
      postoAuto:'', 
      canoneMensile:'',
      dataInizioContratto:'', 
      dataFineContratto:'', 
      depositoCauzionale:'',
    });

    setNewAmministratore({
      name:'', 
      surname:'', 
      phone:'', 
      email:'', 
      ragioneSociale:'', 
      partitaIva:'', 
      codiceFiscale:'', 
      recapiti:'', 
      numeroIscrizioneAlbo:'', 
      assicurazione:'', 
      specializzazioni:'', 
      esperienza:'',
      dataInizioIncarico:''
    });

    setNewCondominio({
      name: '',
      indirizzo: '',
      numeroUnita: '',
      referente:'', 
      phone:'', 
      email:'', 
      tipologiaComplessoResidenziale:'',
    });

    setEditingId(null);
  };

  // Funzione di filtro basata sulla query di ricerca per ciascuna tabella
  const filterData = (data, query) => {
    return data.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'condomini':
        return (
          <>
            <input
              type="text"
              value={newCondomino.name}
              onChange={(e) => setNewCondomino({ ...newCondomino, name: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Nome"
            />
            <input
              type="text"
              value={newCondomino.surname}
              onChange={(e) => setNewCondomino({ ...newCondomino, surname: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Cognome"
            />
            <input
              type="text"
              value={newCondomino.phone}
              onChange={(e) => setNewCondomino({ ...newCondomino, phone: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Telefono"
            />
            <input
              type="email"
              value={newCondomino.email}
              onChange={(e) => setNewCondomino({ ...newCondomino, email: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={newCondomino.edificio}
              onChange={(e) => setNewCondomino({ ...newCondomino, edificio: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Edificio"
            />
            <input
              type="text"
              value={newCondomino.scala}
              onChange={(e) => setNewCondomino({ ...newCondomino, scala: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Scala"
            />
            <input
              type="text"
              value={newCondomino.garage}
              onChange={(e) => setNewCondomino({ ...newCondomino, garage: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Garage"
            />
            <input
              type="text"
              value={newCondomino.giardino}
              onChange={(e) => setNewCondomino({ ...newCondomino, giardino: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Giardino"
            />
            <input
              type="text"
              value={newCondomino.postoAuto}
              onChange={(e) => setNewCondomino({ ...newCondomino, postoAuto: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Posto Auto"
            />
            <input
              type="text"
              value={newCondomino.animaliDomestici}
              onChange={(e) => setNewCondomino({ ...newCondomino, animaliDomestici: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Animali Domestici"
            />
            <input
              type="text"
              value={newCondomino.allarmi}
              onChange={(e) => setNewCondomino({ ...newCondomino, allarmi: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Allarmi"
            />
            <input
              type="text"
              value={newCondomino.proprietario}
              onChange={(e) => setNewCondomino({ ...newCondomino, proprietario: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Proprietario"
            />
            <input
              type="text"
              value={newCondomino.affittuario}
              onChange={(e) => setNewCondomino({ ...newCondomino, affittuario: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Affittuario"
            />
            <input
              type="date"
              value={newCondomino.dataInizioProprieta}
              onChange={(e) => setNewCondomino({ ...newCondomino, dataInizioProprieta: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Data Inizio Proprietà"
            />
            <input
              type="date"
              value={newCondomino.fineProprieta}
              onChange={(e) => setNewCondomino({ ...newCondomino, fineProprieta: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Fine Proprietà"
            />
          </>
        );
      case 'affittuari':
        return (
          <>
            <input
              type="text"
              value={newAffittuario.name}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, name: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Nome"
            />
            <input
              type="text"
              value={newAffittuario.surname}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, surname: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Cognome"
            />
            <input
              type="text"
              value={newAffittuario.phone}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, phone: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Telefono"
            />
            <input
              type="email"
              value={newAffittuario.email}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, email: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={newAffittuario.edificio}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, edificio: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Edificio"
            />
            <input
              type="text"
              value={newAffittuario.scala}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, scala: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Scala"
            />
            <input
              type="text"
              value={newAffittuario.codiceFiscale}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, codiceFiscale: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Codice Fiscale"
            />
            <input
              type="text"
              value={newAffittuario.garage}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, garage: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Garage"
            />
                 <input
              type="text"
              value={newAffittuario.postoAuto}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, postoAuto: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Posto Auto"
            />
                 <input
              type="number"
              value={newAffittuario.canoneMensile}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, canoneMensile: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Canone Mensile"
            />
                 <input
              type="date"
              value={newAffittuario.dataInizioContratto}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, dataInizioContratto: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Data Inizio Contratto"
            />
                 <input
              type="date"
              value={newAffittuario.dataFineContratto}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, dataFineContratto: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Data Fine Contratto"
            />
                 <input
              type="number"
              value={newAffittuario.depositoCauzionale}
              onChange={(e) => setNewAffittuario({ ...newAffittuario, depositoCauzionale: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Deposito Cauzionale"
            />
          </>
        );
      case 'amministratori':
        return (
          <>
            <input
              type="text"
              value={newAmministratore.name}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, name: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Nome"
            />
            <input
              type="text"
              value={newAmministratore.surname}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, surname: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Cognome"
            />
            <input
              type="text"
              value={newAmministratore.phone}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, phone: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Telefono"
            />
            <input
              type="email"
              value={newAmministratore.email}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, email: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={newAmministratore.ragioneSociale}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, ragioneSociale: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Ragione Sociale"
            />
            <input
              type="text"
              value={newAmministratore.partitaIva}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, partitaIva: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Partita Iva"
            />
            <input
              type="text"
              value={newAmministratore.codiceFiscale}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, codiceFiscale: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Codice Fiscale"
            />
            <input
              type="text"
              value={newAmministratore.recapiti}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, recapiti: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Recapiti"
            />
            <input
              type="number"
              value={newAmministratore.numeroIscrizioneAlbo}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, numeroIscrizioneAlbo: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Numero Iscrizione Albo"
            />
            <input
              type="text"
              value={newAmministratore.assicurazione}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, assicurazione: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Assicurazione"
            />
            <input
              type="text"
              value={newAmministratore.specializzazioni}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, specializzazioni: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Specializzazioni"
            />
            <input
              type="text"
              value={newAmministratore.esperienza}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, esperienza: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Esperienza"
            />
            <input
              type="date"
              value={newAmministratore.dataInizioIncarico}
              onChange={(e) => setNewAmministratore({ ...newAmministratore, dataInizioIncarico: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Data Inizio Incarico"
            />
          </>
        );
      case 'condominii':
        return (
          <>
            <input
              type="text"
              value={newCondominio.name}
              onChange={(e) => setNewCondominio({ ...newCondominio, name: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Nome Condominio"
            />
            <input
              type="text"
              value={newCondominio.indirizzo}
              onChange={(e) => setNewCondominio({ ...newCondominio, indirizzo: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Indirizzo"
            />
            <input
              type="text"
              value={newCondominio.numeroUnita}
              onChange={(e) => setNewCondominio({ ...newCondominio, numeroUnita: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Numero Unità"
            />
            <input
              type="text"
              value={newCondominio.referente}
              onChange={(e) => setNewCondominio({ ...newCondominio, referente: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Referente"
            />
            <input
              type="number"
              value={newCondominio.phone}
              onChange={(e) => setNewCondominio({ ...newCondominio, phone: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Telefono"
            />
            <input
              type="email"
              value={newCondominio.email}
              onChange={(e) => setNewCondominio({ ...newCondominio, email: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={newCondominio.tipologiaComplessoResidenziale}
              onChange={(e) => setNewCondominio({ ...newCondominio, tipologiaComplessoResidenziale: e.target.value })}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Tipologia Complesso Residenziale"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dashboard>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #ffffff;
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #2D3748;
        }
      `}</style>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {editingId ? 'Modifica' : 'Aggiungi'} {activeTab.slice(0)}
            </h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isExpanded ? 'Riduci' : 'Espandi'}
            </button>
          </div>
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderForm()}
            </div>
          )}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={addOrUpdateEntity}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {editingId ? 'Salva Modifiche' : 'Aggiungi'}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Annulla
              </button>
            )}
          </div>

          {/* Navigazione a schede */}
          <div className="mt-6">
            <nav className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('condomini')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'condomini' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Condomini
              </button>
              <button
                onClick={() => setActiveTab('affittuari')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'affittuari' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Affittuari
              </button>
              <button
                onClick={() => setActiveTab('amministratori')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'amministratori' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Amministratori
              </button>
              <button
                onClick={() => setActiveTab('condominii')}
                className={`py-2 px-4 rounded-t-lg ${activeTab === 'condominii' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                Condominii
              </button>
            </nav>
          </div>

          {/* Contenuto della scheda attiva */}
          <div className="mt-4">
            {activeTab === 'condomini' && (
              <div className="overflow-x-auto custom-scrollbar">
                <h2 className="text-2xl font-bold mt-6">Lista Condomini</h2>
                <input
                  type="text"
                  value={searchQueryCondomini}
                  onChange={(e) => setSearchQueryCondomini(e.target.value)}
                  className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                  placeholder="Cerca Condomini..."
                />
                <table className="min-w-full bg-[#2D3748] text-white">
                  <thead>
                    <tr>
                      {/* Intestazione della tabella condomini */}
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cognome</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Telefono</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Edificio</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Scala</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Garage</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Posto Auto</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Giardino</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Animali Domestici</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Allarmi</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Proprietario</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Affittuario</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Data Inizio Proprietà</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Fine Proprietà</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(condomini, searchQueryCondomini).map((condomino, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.surname}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.edificio}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.scala}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.garage}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.postoAuto}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.giardino}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.animaliDomestici}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.allarmi}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.proprietario}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.affittuario}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.dataInizioProprieta}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condomino.fineProprieta}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                          <button
                            onClick={() => editEntity(condomino)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => deleteEntity(condomino._id)}
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
            )}

            {activeTab === 'affittuari' && (
              <div className="overflow-x-auto custom-scrollbar">
                <h2 className="text-2xl font-bold mt-6">Lista Affittuari</h2>
                <input
                  type="text"
                  value={searchQueryAffittuari}
                  onChange={(e) => setSearchQueryAffittuari(e.target.value)}
                  className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                  placeholder="Cerca Affittuari..."
                />
                <table className="min-w-full bg-[#2D3748] text-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cognome</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Telefono</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Edificio</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Scala</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Codice Fiscale</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Garage</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Posto Auto</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Canone Mensile</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Data Inizio Contratto</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Data Fine Contratto</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Deposito Cauzionale</th> 
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(affittuari, searchQueryAffittuari).map((affittuario, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.surname}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.edificio}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.scala}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.codiceFiscale}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.garage}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.postoAuto}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.canoneMensile}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.dataInizioContratto}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.dataFineContratto}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{affittuario.depositoCauzionale}</td>

                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                          <button
                            onClick={() => editEntity(affittuario)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => deleteEntity(affittuario._id)}
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
            )}

            {activeTab === 'amministratori' && (
              <div className="overflow-x-auto custom-scrollbar">
                <h2 className="text-2xl font-bold mt-6">Lista Amministratori</h2>
                <input
                  type="text"
                  value={searchQueryAmministratori}
                  onChange={(e) => setSearchQueryAmministratori(e.target.value)}
                  className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                  placeholder="Cerca Amministratori..."
                />
                <table className="min-w-full bg-[#2D3748] text-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Cognome</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Telefono</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Ragione Sociale</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Partita Iva</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Codice Fiscale</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Recapiti</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Numero Iscrizione Albo</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Assicurazione</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Specializzazioni</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Esperienza</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Data Inizio Incarico</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(amministratori, searchQueryAmministratori).map((amministratore, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.surname}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.ragioneSociale}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.partitaIva}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.codiceFiscale}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.recapiti}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.numeroIscrizioneAlbo}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.assicurazione}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.specializzazioni}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.esperienza}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{amministratore.dataInizioIncarico}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                          <button
                            onClick={() => editEntity(amministratore)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => deleteEntity(amministratore._id)}
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
            )}

            {activeTab === 'condominii' && (
              <div className="overflow-x-auto custom-scrollbar">
                <h2 className="text-2xl font-bold mt-6">Lista Condominii</h2>
                <input
                  type="text"
                  value={searchQueryCondominii}
                  onChange={(e) => setSearchQueryCondominii(e.target.value)}
                  className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                  placeholder="Cerca Condominii..."
                />
                <table className="min-w-full bg-[#2D3748] text-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Indirizzo</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Numero Unità</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Referente</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Telefono</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Tipologia Complesso Residenziale</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(condominii, searchQueryCondominii).map((condominio, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condominio.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condominio.indirizzo}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condominio.numeroUnita}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condominio.referente}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condominio.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condominio.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">{condominio.tipologiaComplessoResidenziale}</td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-500">
                          <button
                            onClick={() => editEntity(condominio)}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Modifica
                          </button>
                          <button
                            onClick={() => deleteEntity(condominio._id)}
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
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CondominiAnagrafica;
