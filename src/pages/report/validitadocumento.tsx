'use client';

import Dashboard from './index';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Documenti Caricati',
      data: [5, 10, 15, 20, 25, 30, 35],
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1,
    },
  ],
};

const Section1 = () => {
  return (
    <Dashboard>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Documenti Caricati</h2>
          <p className="text-lg">Numero Totale</p>
          <p className="text-4xl font-bold">75</p>
          <p className="text-sm text-green-500">+10% rispetto al mese scorso</p>
        </div>
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Documenti in Revisione</h2>
          <p className="text-lg">Numero Totale</p>
          <p className="text-4xl font-bold">20</p>
          <p className="text-sm text-blue-500">+5% rispetto al mese scorso</p>
        </div>
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Nuovi Documenti</h2>
          <p className="text-lg">Numero Totale</p>
          <p className="text-4xl font-bold">10</p>
          <p className="text-sm text-blue-500">+3% rispetto al mese scorso</p>
        </div>
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-2xl font-bold mb-4">Progresso dei Documenti</h2>
          <Line data={data} />
        </div>
        <div className="bg-[#2D3748] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Documenti Approvati</h2>
          <p className="text-4xl font-bold">40</p>
          <p className="text-sm text-yellow-500">+20% rispetto al mese scorso</p>
        </div>
      </div>
    </Dashboard>
  );
};

export default Section1;
