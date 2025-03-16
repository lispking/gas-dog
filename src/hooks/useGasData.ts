import { useState, useEffect } from "react";
import { executeQuery } from "../utils/flipsideApi";
import {
  getMonadTestnetGasQuery,
  getGasSummaryQuery
} from "../queries/gasQueries";
import { GasTransaction, GasSummary, TimeRange } from "../types";
import { useWallet } from "../contexts/WalletContext";
import { useIndexedDB } from "./useIndexedDB";

export const useGasData = (chainId: number, timeRange: TimeRange = TimeRange.MONTH) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GasTransaction[]>([]);
  const { searchAddress } = useWallet();

  const { getCacheKey, getFromCache, saveToCache } = useIndexedDB();

  useEffect(() => {
    const fetchData = async () => {
      if (!searchAddress) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // 尝试从缓存获取数据
        const cacheKey = getCacheKey(searchAddress, chainId, timeRange);
        const cachedData = await getFromCache<GasTransaction[]>(cacheKey);
        
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        let query;
        
        switch (chainId) {
          case 10143: // Monad Testnet
            query = getMonadTestnetGasQuery(searchAddress, timeRange);
            break;
          default:
            throw new Error(`Chain ID ${chainId} not supported`);
        }
        
        const result = await executeQuery(query);
        const newData = (result.records || []) as unknown as GasTransaction[];
        setData(newData);
        
        // 保存数据到缓存
        await saveToCache(cacheKey, newData);
      } catch (error) {
        console.error(`Error fetching gas data for chain ${chainId}:`, error);
        setError("Failed to fetch gas data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchAddress, chainId, timeRange]);

  return { data, loading, error };
};

export const useGasSummary = (timeRange: TimeRange = TimeRange.MONTH) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GasSummary[]>([]);
  const { searchAddress } = useWallet();

  const { getCacheKey, getFromCache, saveToCache } = useIndexedDB();

  useEffect(() => {
    const fetchData = async () => {
      if (!searchAddress) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // 尝试从缓存获取数据
        const cacheKey = getCacheKey(searchAddress, undefined, timeRange);
        const cachedData = await getFromCache<GasSummary[]>(cacheKey);
        
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        const query = getGasSummaryQuery(searchAddress, timeRange);
        const result = await executeQuery(query);
        const newData = (result.records || []) as unknown as GasSummary[];
        setData(newData);
        
        // 保存数据到缓存
        await saveToCache(cacheKey, newData);
      } catch (error) {
        console.error("Error fetching gas summary:", error);
        setError("Failed to fetch gas summary");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchAddress, timeRange]);

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
