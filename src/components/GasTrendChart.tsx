import React from 'react';
import { Line } from 'react-chartjs-2';
import { GasTransaction } from '../types';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GasTrendChartProps {
  transactions: GasTransaction[];
  loading: boolean;
  error: string | null;
}

const GasTrendChart: React.FC<GasTrendChartProps> = ({ transactions, loading, error }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">{t('common.error')}</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{t('transaction_table.no_transactions')}</span>
      </div>
    );
  }

  // 按日期分组并计算每天的总Gas消耗
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const dailyGasUsage = transactions
    .filter(tx => new Date(tx.block_timestamp) >= oneMonthAgo)
    .reduce((acc, tx) => {
      const date = new Date(tx.block_timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + tx.monad_spent;
      return acc;
    }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(dailyGasUsage).reverse(),
    datasets: [
      {
        label: t('gas_trend.daily_gas_usage'),
        data: Object.values(dailyGasUsage).reverse().map(value => value / 1e9),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: t('gas_trend.title')
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'MON'
        }
      }
    }
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default GasTrendChart;