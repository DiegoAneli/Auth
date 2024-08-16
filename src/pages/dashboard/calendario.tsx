'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa lo stile di base del calendario

import Dashboard from './index';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: new Date(2024, 7, 16).toDateString(),
      time: '10:00',
      text: "Riunione importante",
      description: "Discutere delle nuove politiche aziendali",
      link: "https://www.example.com"
    }, // Esempio di appuntamento
  ]);
  const [newAppointment, setNewAppointment] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentDescription, setAppointmentDescription] = useState('');
  const [appointmentLink, setAppointmentLink] = useState('');

  const addAppointment = () => {
    if (newAppointment.trim() !== '' && appointmentTime.trim() !== '') {
      const appointment = {
        id: appointments.length + 1, // Genera un ID semplice
        date: date.toDateString(),
        time: appointmentTime,
        text: newAppointment,
        description: appointmentDescription,
        link: appointmentLink,
      };
      setAppointments([...appointments, appointment]);
      setNewAppointment('');
      setAppointmentTime('');
      setAppointmentDescription('');
      setAppointmentLink('');
    }
  };

  const deleteAppointment = (id) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(updatedAppointments);
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(appointment => appointment.date === date.toDateString());
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const hasAppointments = getAppointmentsForDate(date).length > 0;
      if (hasAppointments) {
        return <div className="dot"></div>; // Aggiunge un segno di evidenza sotto la data
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const hasAppointments = getAppointmentsForDate(date).length > 0;
      const isToday = new Date().toDateString() === date.toDateString();

      if (hasAppointments) {
        return 'highlight'; // Classe per evidenziare il giorno con appuntamenti
      }

      if (isToday) {
        return 'today'; // Classe per la data odierna
      }
    }
    return null;
  };

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Calendario Appuntamenti</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sezione Calendario */}
          <div className="flex-shrink-0">
            <style>
              {`
                .react-calendar {
                  background-color: #2D3748; /* Sfondo scuro */
                  border: none; /* Rimuove il bordo */
                  border-radius: 8px;
                  color: #FFFFFF; /* Testo bianco */
                }

                .react-calendar__tile {
                  background: none;
                  color: #FFFFFF; /* Testo bianco per le date */
                }

                .react-calendar__tile:disabled {
                  background: none;
                  color: #666666; /* Colore per le date disabilitate */
                }

                .react-calendar__tile--now {
                  background: white; /* Sfondo bianco per la data odierna */
                  color: #000000; /* Testo nero per la data odierna */
                  border-radius: 50%; /* Arrotonda i bordi della data odierna */
                }

                .react-calendar__tile--now:enabled:hover,
                .react-calendar__tile--now:enabled:focus {
                  background: #63b3ed; /* Colore più chiaro al passaggio del mouse */
                  color: white;
                }

                .react-calendar__tile--active {
                  background: #3182CE; /* Sfondo blu per la data selezionata */
                  color: white;
                }

                .highlight {
                  background: #3182CE; /* Sfondo blu per giorni con appuntamenti */
                  color: white;
                  border-radius: 50%;
                }

                .dot {
                  height: 6px;
                  width: 6px;
                  background-color: #3182CE;
                  border-radius: 50%;
                  display: inline-block;
                  position: absolute;
                  bottom: 8px;
                  left: 50%;
                  transform: translateX(-50%);
                }
              `}
            </style>
            <Calendar
              onChange={setDate}
              value={date}
              className="bg-white rounded-lg shadow-md p-4"
              tileContent={tileContent}
              tileClassName={tileClassName}
            />
          </div>

          {/* Sezione Dettagli e Aggiunta Appuntamento */}
          <div className="flex-1 bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Appuntamenti per {date.toDateString()}</h3>
            
            <ul className="space-y-2 mb-4">
              {getAppointmentsForDate(date).map((appointment) => (
                <li key={appointment.id} className="p-2 bg-gray-700 rounded flex justify-between items-center">
                  {appointment.time} - {appointment.text}
                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Elimina
                  </button>
                </li>
              ))}
              {getAppointmentsForDate(date).length === 0 && (
                <li className="p-2 bg-gray-700 rounded text-gray-400">
                  Nessun appuntamento per oggi.
                </li>
              )}
            </ul>
            
            
            <input
              type="text"
              value={newAppointment}
              onChange={(e) => setNewAppointment(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Inserisci un nuovo appuntamento"
            />
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Seleziona l'orario"
            />
            <textarea
              value={appointmentDescription}
              onChange={(e) => setAppointmentDescription(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Descrizione dell'appuntamento"
            />
            <input
              type="text"
              value={appointmentLink}
              onChange={(e) => setAppointmentLink(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              placeholder="Link (facoltativo)"
            />
            <button
              onClick={addAppointment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Aggiungi Appuntamento
            </button>
          </div>
        </div>

        {/* Lista Completa degli Appuntamenti */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Tutti gli Appuntamenti</h3>
          <ul className="space-y-2">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="p-4 bg-gray-700 rounded flex justify-between items-center">
                <div>
                  <strong>Data:</strong> {appointment.date} <br />
                  <strong>Orario:</strong> {appointment.time} <br />
                  <strong>Dettagli:</strong> {appointment.text} <br />
                  {appointment.description && (
                    <>
                      <strong>Descrizione:</strong> {appointment.description} <br />
                    </>
                  )}
                  {appointment.link && (
                    <>
                      <strong>Link:</strong> <a href={appointment.link} className="text-blue-400 hover:text-blue-600" target="_blank" rel="noopener noreferrer">{appointment.link}</a>
                    </>
                  )}
                </div>
                <button
                  onClick={() => deleteAppointment(appointment.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Elimina
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
};

export default CalendarPage;
