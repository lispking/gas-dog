import React from 'react';
import { Pie } from 'react-chartjs-2';
import { GasTransaction } from '../types';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface TransactionTypeChartProps {
  transactions: GasTransaction[];
  loading: boolean;
  error: string | null;
}

const TransactionTypeChart: React.FC<TransactionTypeChartProps> = ({ transactions, loading, error }) => {
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

  // 按交易类型分组
  const typeDistribution = transactions.reduce((acc, tx) => {
    const type = tx.origin_function_signature || 'Transfer';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)'
  ];

  const data = {
    labels: Object.keys(typeDistribution),
    datasets: [
      {
        data: Object.values(typeDistribution),
        backgroundColor: colors.slice(0, Object.keys(typeDistribution).length),
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: t('transaction_type.tx_count')
      }
    }
  };

  return (
    <div className="w-full h-[400px]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default TransactionTypeChart;