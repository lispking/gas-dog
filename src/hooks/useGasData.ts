import { useState, useEffect } from "react";
import { executeQuery } from "../utils/flipsideApi";
import {
  getMonadTestnetGasQuery,
  getGasSummaryQuery
} from "../queries/gasQueries";
import { GasTransaction, GasSummary, TimeRange } from "../types";
import { useWallet } from "../contexts/WalletContext";

export const useGasData = (chainId: number, timeRange: TimeRange = TimeRange.MONTH) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GasTransaction[]>([]);
  const { address } = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      
      setLoading(true);
      setError(null);
      
      try {
        let query;
        
        switch (chainId) {
          case 10143: // Monad Testnet
            query = getMonadTestnetGasQuery(address, timeRange);
            break;
          default:
            throw new Error(`Chain ID ${chainId} not supported`);
        }
        
        const result = await executeQuery(query);
        setData((result.records || []) as unknown as GasTransaction[]);
      } catch (error) {
        console.error(`Error fetching gas data for chain ${chainId}:`, error);
        setError("Failed to fetch gas data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, chainId, timeRange]);

  return { data, loading, error };
};

export const useGasSummary = (timeRange: TimeRange = TimeRange.MONTH) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GasSummary[]>([]);
  const { address } = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      if (!address) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const query = getGasSummaryQuery(address, timeRange);
        const result = await executeQuery(query);
        setData((result.records || []) as unknown as GasSummary[]);
      } catch (error) {
        console.error("Error fetching gas summary:", error);
        setError("Failed to fetch gas summary");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, timeRange]);

  return { data, loading, error };
};

export const useGasAnalytics = (timeRange: TimeRange = TimeRange.MONTH) => {
  const { data: summaryData, loading, error } = useGasSummary(timeRange);
  
  const totalTransactions = summaryData.reduce((sum, item) => sum + (item.tx_count || 0), 0);
  
  const totalSpentByChain = summaryData.map(item => ({
    chain: item.chain,
    totalSpent: 0,
    symbol: 
      item.chain === "Ethereum" || item.chain === "Arbitrum" || item.chain === "Optimism" || item.chain === "Base" 
        ? "ETH" 
        : item.chain === "Polygon" 
          ? "MATIC" 
          : item.chain === "BNB Chain" 
            ? "BNB" 
            : "AVAX",
    txCount: item.tx_count || 0
  }));
  
  const mostExpensiveChain = [...totalSpentByChain].sort((a, b) => b.totalSpent - a.totalSpent)[0];
  
  const mostUsedChain = [...totalSpentByChain].sort((a, b) => b.txCount - a.txCount)[0];
  
  return {
    loading,
    error,
    totalTransactions,
    totalSpentByChain,
    mostExpensiveChain,
    mostUsedChain
  };
};
