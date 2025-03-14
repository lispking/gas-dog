import React from 'react';
import { GasTransaction } from '../types';
import { format } from 'date-fns';
import DataHeatmap from './DataHeatmap';

interface GasUsageHeatmapProps {
  title: string;
  transactions: GasTransaction[];
  loading?: boolean;
  error?: Error | null;
  tips: string;
}

const GasUsageHeatmap: React.FC<GasUsageHeatmapProps> = ({ title, transactions, loading, error, tips }) => {
  const getHeatmapData = () => {
    const txCountByDate = transactions.reduce((acc: { [key: string]: number }, tx) => {
      try {
        const timestamp = new Date(tx.block_timestamp);
        if (isNaN(timestamp.getTime())) {
          console.warn('Invalid timestamp:', tx.block_timestamp);
          return acc;
        }
        const date = format(timestamp, 'yyyy-MM-dd');
        acc[date] = (acc[date] || 0) + tx.monad_spent;
      } catch (error) {
        console.warn('Error processing transaction:', error);
      }
      return acc;
    }, {});

    return Object.entries(txCountByDate).map(([date, spent]) => ({
      date,
      count: spent,
    }));
  };

  return (
    <DataHeatmap
      title={title}
      data={getHeatmapData()}
      loading={loading}
      isFormat={true}
      error={error}
      tips={tips}
    />
  );
};

export default GasUsageHeatmap;
