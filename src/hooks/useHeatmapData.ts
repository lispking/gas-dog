import { GasTransaction } from '../types';
import { format } from 'date-fns';

export type HeatmapDataPoint = {
  date: string;
  count: number;
};

export const useHeatmapData = (transactions: GasTransaction[] | null, getDataFn: (tx: GasTransaction) => number) => {
  if (!transactions) return [];
  
  const heatmapData = transactions.reduce((acc: { [key: string]: number }, tx) => {
    // Convert string timestamp to Date object
    const timestamp = new Date(tx.block_timestamp);
    if (isNaN(timestamp.getTime())) {
        console.warn('Invalid timestamp:', tx.block_timestamp);
        return acc;
    }

    const date = format(timestamp, 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + getDataFn(tx);
    return acc;
  }, {});

  return Object.entries(heatmapData).map(([date, count]) => ({
    date,
    count,
  }));
};
