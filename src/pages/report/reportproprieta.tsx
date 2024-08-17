'use client';

import { useState, useEffect } from 'react';
import Dashboard from './index';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registrazione delle componenti necessarie
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const ProprietaReport = () => {
  const [proprietas, setProprietas] = useState([]);

  useEffect(() => {
    const fetchProprietas = async () => {
      const response = await fetch('/api/proprietas/list');
      const data = await response.json();
      setProprietas(data);
    };

    fetchProprietas();
  }, []);

  // Calcolo dei dati aggregati
  const totaleProprietas = proprietas.length;

  const proprietasPerEdificio = proprietas.reduce((acc, curr) => {
    acc[curr.edificio] = (acc[curr.edificio] || 0) + 1;
    return acc;
  }, {});

  const contaSi = (data, campo) => data.filter(item => item[campo] === 'SI').length;

  const numeroGarageSi = contaSi(proprietas, 'garage');
  const numeroBalconeSi = contaSi(proprietas, 'balcone');
  const numeroPostoAutoSi = contaSi(proprietas, 'postoAuto');
  const numeroGiardinoSi = contaSi(proprietas, 'giardino');

  // Dati per il grafico della panoramica generale
  const chartDataPanoramica = {
    labels: ['Totale Proprietà', 'Garage', 'Balcone', 'Posto Auto', 'Giardino'],
    datasets: [
      {
        label: 'Numero',
        data: [totaleProprietas, numeroGarageSi, numeroBalconeSi, numeroPostoAutoSi, numeroGiardinoSi],
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // Dati per il grafico delle proprietà per edificio
  const chartDataProprietasPerEdificio = {
    labels: Object.keys(proprietasPerEdificio),
    datasets: [
      {
        label: 'Numero di Proprietà per Edificio',
        data: Object.values(proprietasPerEdificio),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  // Opzioni responsive per i grafici
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Dashboard>
      <div className="p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Panoramica Generale</h2>
          <div className="h-64">
            <Bar data={chartDataPanoramica} options={chartOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Numero di Proprietà per Edificio</h2>
            <div className="h-64">
              <Bar data={chartDataProprietasPerEdificio} options={chartOptions} />
            </div>
          </div>

          <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Distribuzione delle Proprietà (Pie Chart)</h2>
            <div className="h-64">
              <Pie data={chartDataPanoramica} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default ProprietaReport;
