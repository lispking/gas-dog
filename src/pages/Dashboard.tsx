import React, { useState } from "react";
import { useWallet } from "../contexts/WalletContext";
import ChainSelector from "../components/ChainSelector";
import TimeRangeSelector from "../components/TimeRangeSelector";
import GasTransactionTable from "../components/GasTransactionTable";
import GasSummaryStats from "../components/GasSummaryStats";
import { useGasData, useGasSummary } from "../hooks/useGasData";
import { TimeRange } from "../types";
import { SUPPORTED_CHAINS } from "../contexts/WalletContext";
import { useTranslation } from "react-i18next";
import GasUsageHeatmap from "../components/GasUsageHeatmap";
import TransactionHeatmap from '../components/TransactionHeatmap';

const Dashboard: React.FC = () => {
  const { address, connect, isConnecting } = useWallet();
  const { t } = useTranslation();
  const [selectedChainId, setSelectedChainId] = useState<number>(10143); // Default to Monad Testnet
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(TimeRange.MONTH);

  const { data: transactionData, loading: transactionsLoading, error: transactionsError } = useGasData(
    selectedChainId,
    selectedTimeRange
  );

  const { data: summaryData, loading: summaryLoading, error: summaryError } = useGasSummary(
    selectedTimeRange
  );

  if (!address) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-vscode-panel to-transparent px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-vscode-text-primary mb-6 font-mono tracking-tight">
              {t('dashboard.welcome_title')}
            </h1>
            <p className="text-xl md:text-2xl text-vscode-text-secondary mb-8 max-w-3xl mx-auto font-mono leading-relaxed">
              {t('dashboard.welcome_subtitle')}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={connect}
                disabled={isConnecting}
                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="relative flex items-center">
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('common.connecting')}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {t('common.connect_wallet')}
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Multichain Feature */}
            <div className="group bg-vscode-panel/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-blue-500/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 transform transition-transform group-hover:rotate-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-vscode-text-primary mb-4">
                {t('dashboard.feature_multichain')}
              </h3>
              <p className="text-vscode-text-secondary leading-relaxed">
                {t('dashboard.feature_multichain_desc')}
              </p>
            </div>

            {/* Stats Feature */}
            <div className="group bg-vscode-panel/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-purple-500/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 transform transition-transform group-hover:rotate-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-vscode-text-primary mb-4">
                {t('dashboard.feature_stats')}
              </h3>
              <p className="text-vscode-text-secondary leading-relaxed">
                {t('dashboard.feature_stats_desc')}
              </p>
            </div>

            {/* History Feature */}
            <div className="group bg-vscode-panel/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-transparent hover:border-pink-500/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl mb-6 transform transition-transform group-hover:rotate-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-vscode-text-primary mb-4">
                {t('dashboard.feature_history')}
              </h3>
              <p className="text-vscode-text-secondary leading-relaxed">
                {t('dashboard.feature_history_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Header and Selectors */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-blue-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {t('dashboard.title')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              {t('common.wallet_address')}: <span className="font-mono ml-2 text-blue-600 dark:text-blue-400">{address}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {t('dashboard.network')}
          </h2>
          <ChainSelector
            selectedChainId={selectedChainId}
            onSelectChain={setSelectedChainId}
          />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('dashboard.timeRange')}
          </h2>
          <TimeRangeSelector
            selectedTimeRange={selectedTimeRange}
            onSelectTimeRange={setSelectedTimeRange}
          />
        </div>
      </div>

      {/* Row 1: Gas Summary Stats */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <GasSummaryStats
            summaryData={summaryData}
            loading={summaryLoading}
            error={summaryError}
          />
        </div>
      </div>

      {/* Row 2: Gas Usage Heatmap */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <GasUsageHeatmap 
            title="Gas Usage"
            transactions={transactionData} 
            loading={transactionsLoading} 
            error={transactionsError} 
            tips="Gas"
          />
        </div>
      </div>

      {/* Row 3: Transaction Count Heatmap */}
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <TransactionHeatmap 
            title="Transaction Count"
            transactions={transactionData} 
            loading={transactionsLoading} 
            error={transactionsError} 
            tips="Transactions"
          />
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {SUPPORTED_CHAINS.find((chain) => chain.id === selectedChainId)?.name || "区块链"} {t('dashboard.transactionHistory')}
        </h2>
        <GasTransactionTable
          transactions={transactionData}
          loading={transactionsLoading}
          error={transactionsError}
          chainId={selectedChainId}
        />
      </div>
    </div>
  );
};

export default Dashboard;
