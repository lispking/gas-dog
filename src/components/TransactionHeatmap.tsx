import React from 'react';
import { GasTransaction } from '../types';
import { format } from 'date-fns';
import DataHeatmap from './DataHeatmap';

interface TransactionHeatmapProps {
  title: string;
  transactions: GasTransaction[];
  loading?: boolean;
  error?: Error | null;
  tips: string;
}

const TransactionHeatmap: React.FC<TransactionHeatmapProps> = ({ title, transactions, loading, error, tips }) => {
  const getHeatmapData = () => {
    const txCountByDate = transactions.reduce((acc: { [key: string]: number }, tx) => {
      try {
        const timestamp = new Date(tx.block_timestamp);
        if (isNaN(timestamp.getTime())) {
          console.warn('Invalid timestamp:', tx.block_timestamp);
          return acc;
        }
        const date = format(timestamp, 'yyyy-MM-dd');
        acc[date] = (acc[date] || 0) + 1;
      } catch (error) {
        console.warn('Error processing transaction:', error);
      }
      return acc;
    }, {});

    return Object.entries(txCountByDate).map(([date, count]) => ({
      date,
      count,
    }));
  };

  return (
    <DataHeatmap
      title={title}
      data={getHeatmapData()}
      loading={loading}
      error={error}
      tips={tips}
    />
  );
};

export default TransactionHeatmap;
