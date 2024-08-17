'use client';

import { useState, useEffect } from 'react';
import Dashboard from './index';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const CondominiAnagrafica = () => {
  const [condomini, setCondomini] = useState([]);
  const [affittuari, setAffittuari] = useState([]);
  const [amministratori, setAmministratori] = useState([]);
  const [condominii, setCondominii] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      const response = await fetch(url);
      const data = await response.json();
      setter(data);
    };

    fetchData('/api/condomini/list', setCondomini);
    fetchData('/api/affittuari/list', setAffittuari);
    fetchData('/api/amministratori/list', setAmministratori);
    fetchData('/api/condominii/list', setCondominii);
  }, []);

  // Calcoli per i grafici
  const totaleCondomini = condomini.length;
  const totaleAffittuari = affittuari.length;

  const condominiPerEdificio = condomini.reduce((acc, curr) => {
    acc[curr.edificio] = (acc[curr.edificio] || 0) + 1;
    return acc;
  }, {});

  const affittuariPerEdificio = affittuari.reduce((acc, curr) => {
    acc[curr.edificio] = (acc[curr.edificio] || 0) + 1;
    return acc;
  }, {});

  const contaSi = (data, campo) => data.filter(item => item[campo] === 'SI').length;

  const numeroGarageSi = contaSi(condomini, 'garage');
  const numeroPostoAutoSi = contaSi(condomini, 'postoAuto');
  const numeroAnimaliDomesticiSi = contaSi(condomini, 'animaliDomestici');
  const numeroAllarmiSi = contaSi(condomini, 'allarmi');
  const numeroGiardiniSi = contaSi(condomini, 'giardino');

  // Generazione dei dati per i grafici
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const chartDataPanoramica = {
    labels: ['Totale Condomini', 'Totale Affittuari', 'Garage', 'Posto Auto', 'Animali Domestici', 'Allarmi', 'Giardini'],
    datasets: [
      {
        label: 'Numero',
        data: [totaleCondomini, totaleAffittuari, numeroGarageSi, numeroPostoAutoSi, numeroAnimaliDomesticiSi, numeroAllarmiSi, numeroGiardiniSi],
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartDataCondominiPerEdificio = {
    labels: Object.keys(condominiPerEdificio),
    datasets: [
      {
        label: 'Numero di Condomini per Edificio',
        data: Object.values(condominiPerEdificio),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartDataAffittuariPerEdificio = {
    labels: Object.keys(affittuariPerEdificio),
    datasets: [
      {
        label: 'Numero di Affittuari per Edificio',
        data: Object.values(affittuariPerEdificio),
        backgroundColor: 'rgba(255,159,64,0.6)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Dashboard>
      {/* Container separato per la Panoramica Generale */}
      <div className="p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Panoramica Generale</h2>
          <p className="text-lg">Totale Condomini: {totaleCondomini}</p>
          <p className="text-lg">Totale Affittuari: {totaleAffittuari}</p>
          <div className="h-64">
            <Bar data={chartDataPanoramica} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Container per le altre chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Numero di Condomini per Edificio</h2>
          <div className="h-64">
            <Bar data={chartDataCondominiPerEdificio} options={chartOptions} />
          </div>
        </div>

        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Numero di Affittuari per Edificio</h2>
          <div className="h-64">
            <Bar data={chartDataAffittuariPerEdificio} options={chartOptions} />
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default CondominiAnagrafica;
