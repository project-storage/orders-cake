import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [chartType, setChartType] = useState('bar'); // Default to bar chart

  // Sales data for the past 6 months
  const salesData = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
    datasets: [
      {
        label: 'ยอดขาย (บาท)',
        data: [120000, 135000, 142000, 158000, 165000, 180000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Orders and users data
  const ordersUsersData = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
    datasets: [
      {
        label: 'คำสั่งซื้อ',
        data: [35, 42, 48, 55, 62, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'ผู้ใช้งานใหม่',
        data: [12, 18, 22, 28, 35, 42],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartType === 'bar' ? 'สรุปยอดขายรายเดือน' : 'เปรียบเทียบคำสั่งซื้อและผู้ใช้งานใหม่',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      {chartType === 'bar' ? (
        <Bar data={salesData} options={options} />
      ) : (
        <Line data={ordersUsersData} options={options} />
      )}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
          onClick={() => setChartType('bar')}
          style={{
            margin: '5px',
            padding: '8px 16px',
            backgroundColor: chartType === 'bar' ? '#1976d2' : '#e0e0e0',
            color: chartType === 'bar' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          แผนภูมิแท่ง
        </button>
        <button
          onClick={() => setChartType('line')}
          style={{
            margin: '5px',
            padding: '8px 16px',
            backgroundColor: chartType === 'line' ? '#1976d2' : '#e0e0e0',
            color: chartType === 'line' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          แผนภูมิเส้น
        </button>
      </div>
    </div>
  );
}

export default Chart;
