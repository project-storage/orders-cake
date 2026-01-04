import React, { useState } from 'react';
import { 
  Bar, 
  Line,
  Pie
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
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

  // Cake types data for pie chart
  const cakeTypesData = {
    labels: ['เค้กช็อกโกแลต', 'เค้กครีมสด', 'เค้กวานิลา', 'เค้กผลไม้', 'เค้กชีส'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
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
        text: chartType === 'bar' ? 'สรุปยอดขายรายเดือน' : 
              chartType === 'line' ? 'เปรียบเทียบคำสั่งซื้อและผู้ใช้งานใหม่' : 
              'สัดส่วนประเภทเค้ก',
        font: {
          size: 16
        }
      },
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (value >= 1000) {
              return value/1000 + 'K';
            }
            return value;
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    } : {},
  };

  const renderChart = () => {
    switch(chartType) {
      case 'bar':
        return <Bar data={salesData} options={options} />;
      case 'line':
        return <Line data={ordersUsersData} options={options} />;
      case 'pie':
        return <Pie data={cakeTypesData} options={options} />;
      default:
        return <Bar data={salesData} options={options} />;
    }
  };

  return (
    <div>
      <div style={{ height: '350px' }}>
        {renderChart()}
      </div>
      <div style={{ textAlign: 'center', marginTop: '15px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <button 
          onClick={() => setChartType('bar')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: chartType === 'bar' ? '#1976d2' : '#e0e0e0',
            color: chartType === 'bar' ? 'white' : '#333',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          แผนภูมิแท่ง
        </button>
        <button 
          onClick={() => setChartType('line')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: chartType === 'line' ? '#1976d2' : '#e0e0e0',
            color: chartType === 'line' ? 'white' : '#333',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          แผนภูมิเส้น
        </button>
        <button 
          onClick={() => setChartType('pie')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: chartType === 'pie' ? '#1976d2' : '#e0e0e0',
            color: chartType === 'pie' ? 'white' : '#333',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          แผนภูมิวงกลม
        </button>
      </div>
    </div>
  );
}

export default DashboardChart;