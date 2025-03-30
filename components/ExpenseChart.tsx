import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Transaction } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ExpenseChartProps {
  transactions: Transaction[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  const processData = () => {
    const dates = [...new Set(transactions.map(t => t.date))].sort();
    const incomeData = new Array(dates.length).fill(0);
    const expenseData = new Array(dates.length).fill(0);

    transactions.forEach(t => {
      const index = dates.indexOf(t.date);
      if (t.amount > 0) {
        incomeData[index] += t.amount;
      } else {
        expenseData[index] += Math.abs(t.amount);
      }
    });

    return { dates, incomeData, expenseData };
  };

  const { dates, incomeData, expenseData } = processData();

  const lineChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: dates,
    datasets: [
      {
        label: 'Net',
        data: incomeData.map((inc, i) => inc - expenseData[i]),
        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          return value >= 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(239, 68, 68, 0.5)';
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Income vs Expenses</h2>
        <Line data={lineChartData} options={options} />
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Net Cash Flow</h2>
        <Bar data={barChartData} options={options} />
      </div>
    </div>
  );
};