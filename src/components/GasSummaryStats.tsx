import React from "react";
import { GasSummary } from "../types";
import { useTranslation } from "react-i18next";

interface GasSummaryStatsProps {
  summaryData: GasSummary[];
  loading: boolean;
  error: string | null;
}

const GasSummaryStats: React.FC<GasSummaryStatsProps> = ({
  summaryData,
  loading,
  error,
}) => {
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

  if (summaryData.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{t('transaction_table.no_transactions')}</span>
      </div>
    );
  }

  const formatMonad = (value: number) => {
    return (value / 1e9).toFixed(6);
  };

  const summary = summaryData[0]; // We only have Monad Testnet data

  const totalGasUsed = summary.total_monad_spent;
  const avgGasPerTx = summary.avg_monad_per_tx;
  const maxGasPerTx = summary.max_monad_per_tx;
  const totalTransactions = summary.tx_count;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {t('gas_summary.title')}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-blue-100 dark:border-blue-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {t('gas_summary.total_transactions')}
            </h3>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {totalTransactions.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-green-100 dark:border-green-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {t('gas_summary.avg_per_tx')} Gas
            </h3>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900">
              <svg className="w-4 h-4 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            {formatMonad(avgGasPerTx)}
          </p>
          <p className="text-sm text-green-500 dark:text-green-300">
            MON
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-purple-100 dark:border-purple-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {t('gas_summary.max_per_tx')} Gas
            </h3>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {formatMonad(maxGasPerTx)}
          </p>
          <p className="text-sm text-purple-500 dark:text-purple-300">
            MON
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-orange-100 dark:border-orange-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            {t('gas_summary.total_gas')}
            </h3>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900">
              <svg className="w-4 h-4 text-orange-600 dark:text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            {formatMonad(totalGasUsed)}
          </p>
          <p className="text-sm text-orange-500 dark:text-orange-300">
            MON
          </p>
        </div>
      </div>


    </div>
  );
};

export default GasSummaryStats;
