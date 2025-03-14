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

      {/* Row 2: Gas Usage Heatmap */}
      <div className="grid grid-cols-1 gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="card group hover:scale-[1.01] transition-transform duration-300">
          <GasUsageHeatmap 
            title="Gas Usage"
            transactions={transactionData} 
            loading={transactionsLoading} 
            tips="Gas"
          />
        </div>
      </div>

      {/* Row 3: Transaction Count Heatmap */}
      <div className="grid grid-cols-1 gap-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <div className="card group hover:scale-[1.01] transition-transform duration-300">
          <TransactionHeatmap 
            title="Transaction Count"
            transactions={transactionData} 
            loading={transactionsLoading} 
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
