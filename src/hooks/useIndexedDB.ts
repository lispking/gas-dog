import { useEffect, useState } from 'react';

interface CacheData<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

const DB_NAME = 'gas-dog-cache';
const DB_VERSION = 1;
const STORE_NAME = 'gas-data';
const DEFAULT_EXPIRATION = 5 * 60 * 1000; // 15 minutes

export const useIndexedDB = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error('IndexedDB error:', event);
      };

      request.onsuccess = (event) => {
        setDb((event.target as IDBOpenDBRequest).result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    };

    initDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  const getCacheKey = (address: string, chainId?: number, timeRange?: number) => {
    return `${address}-${chainId || 'summary'}-${timeRange}`;
  };

  const getFromCache = async <T>(key: string): Promise<T | null> => {
    if (!db) return null;

    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const cachedData = request.result as CacheData<T> | undefined;

        if (!cachedData) {
          resolve(null);
          return;
        }

        const now = Date.now();
        if (now - cachedData.timestamp > cachedData.expiresIn) {
          // Cache expired
          resolve(null);
          return;
        }

        resolve(cachedData.data);
      };

      request.onerror = () => {
        console.error('Error reading from cache:', request.error);
        resolve(null);
      };
    });
  };

  const saveToCache = async <T>(key: string, data: T, expiresIn = DEFAULT_EXPIRATION): Promise<void> => {
    if (!db) return;

    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      expiresIn,
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(cacheData, key);

      request.onsuccess = () => resolve();
      request.onerror = () => {
        console.error('Error saving to cache:', request.error);
        reject(request.error);
      };
    });
  };

  return {
    getCacheKey,
    getFromCache,
    saveToCache,
  };
};