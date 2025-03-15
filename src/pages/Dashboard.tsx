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
import WelcomePage from '../components/WelcomePage';
import GasTrendChart from '../components/GasTrendChart';
import TransactionTypeChart from '../components/TransactionTypeChart';
import GasSpentChart from '../components/GasSpentChart';

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
    return <WelcomePage onConnect={connect} isConnecting={isConnecting} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* Selectors */}
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('dashboard.network')}:</span>
            <ChainSelector
              selectedChainId={selectedChainId}
              onSelectChain={setSelectedChainId}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('dashboard.timeRange')}:</span>
            <TimeRangeSelector
              selectedTimeRange={selectedTimeRange}
              onSelectTimeRange={setSelectedTimeRange}
            />
          </div>
        </div>
      </div>

      {/* Row 1: Gas Summary Stats */}
      <div className="grid grid-cols-1 gap-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="card group hover:scale-[1.01] transition-transform duration-300">
          <GasSummaryStats
            summaryData={summaryData}
            loading={summaryLoading}
            error={summaryError}
          />
        </div>
      </div>

      {/* Row 2: Gas Trend Chart */}
      <div className="bg-white dark:bg-gray-800 hover:scale-[1.01] transition-transform duration-300 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          {t('gas_trend.title')}
        </h2>
        <GasTrendChart
          transactions={transactionData}
          loading={transactionsLoading}
          error={transactionsError}
        />
      </div>

      {/* Row 3: Transaction Type Distribution and Gas Spent Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl hover:scale-[1.01] transition-transform duration-300 shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            {t('transaction_type.title')}
          </h2>
          <TransactionTypeChart
            transactions={transactionData}
            loading={transactionsLoading}
            error={transactionsError}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl hover:scale-[1.01] transition-transform duration-300 shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {t('transaction_type.gas_spent')}
          </h2>
          <GasSpentChart
            transactions={transactionData}
            loading={transactionsLoading}
            error={transactionsError}
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Gas Usage
        </h2>
        <GasUsageHeatmap 
          title=""
          transactions={transactionData} 
          loading={transactionsLoading} 
          tips="Gas"
        />
      </div>

      {/* Row 3: Transaction Count Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Transaction Count
        </h2>
        <TransactionHeatmap 
          title=""
          transactions={transactionData} 
          loading={transactionsLoading} 
          tips="Transactions"
        />
      </div>

      {/* Transaction History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {SUPPORTED_CHAINS.find((chain) => chain.id === selectedChainId)?.name || "BlockChain"} {t('dashboard.transactionHistory')}
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
