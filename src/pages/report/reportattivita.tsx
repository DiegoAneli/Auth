'use client';

import Dashboard from './index';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, LinearScale, CategoryScale, Title } from 'chart.js';

Chart.register(BarElement, LinearScale, CategoryScale, Title);

const Section1 = () => {
  const [interventi, setInterventi] = useState([]);

  useEffect(() => {
    const fetchInterventi = async () => {
      const response = await fetch('/api/interventi/list');
      const data = await response.json();
      setInterventi(data);
    };

    fetchInterventi();
  }, []);

  const totalCost = interventi.reduce((sum, intervento) => sum + parseFloat(intervento.costo || 0), 0);

  const tipologie = [...new Set(interventi.map(intervento => intervento.tipologia))];
  const aziende = [...new Set(interventi.map(intervento => intervento.azienda))];

  const years = [...new Set(interventi.map(intervento => new Date(intervento.dataInizio).getFullYear()))];

  const chartDataByType = {
    labels: tipologie,
    datasets: [
      {
        label: 'Numero di Interventi per Tipologia',
        data: tipologie.map(tipologia => interventi.filter(intervento => intervento.tipologia === tipologia).length),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartDataByCompany = {
    labels: aziende,
    datasets: [
      {
        label: 'Costo Totale per Azienda',
        data: aziende.map(azienda => interventi.filter(intervento => intervento.azienda === azienda).reduce((acc, intervento) => acc + parseFloat(intervento.costo || 0), 0)),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartDataByYear = {
    labels: years,
    datasets: [
      {
        label: 'Spese Annuali',
        data: years.map(year => interventi.filter(intervento => new Date(intervento.dataInizio).getFullYear() === year).reduce((acc, intervento) => acc + parseFloat(intervento.costo || 0), 0)),
        backgroundColor: 'rgba(255,159,64,0.6)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Dashboard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Costo Totale degli Interventi</h2>
          <p className="text-lg">Costo Totale:</p>
          <p className="text-4xl font-bold">{totalCost.toFixed(2)} €</p>
        </div>
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Numero di Interventi per Tipologia</h2>
          <Bar data={chartDataByType} />
        </div>
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Costo Totale per Azienda</h2>
          <Bar data={chartDataByCompany} />
        </div>
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Spese Annuali</h2>
          <Bar data={chartDataByYear} />
        </div>
      </div>
    </Dashboard>
  );
};

export default Section1;
