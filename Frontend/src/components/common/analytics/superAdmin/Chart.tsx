import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [28, 48, 40, 19, 86, 27, 90],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const, // 'as const' ensures TypeScript recognizes this as a specific string
    },
    title: {
      display: true,
      text: 'Bar Chart Example',
    },
  },
};

const Chart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;
