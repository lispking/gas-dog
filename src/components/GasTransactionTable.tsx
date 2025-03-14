import React from "react";
import { useTranslation } from "react-i18next";
import { GasTransaction } from "../types";
import Pagination from "./Pagination";

interface GasTransactionTableProps {
  transactions: GasTransaction[];
  loading: boolean;
  error: string | null;
  chainId: number;
}

const GasTransactionTable: React.FC<GasTransactionTableProps> = ({
  transactions,
  loading,
  error,
  chainId,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const totalPages = Math.ceil(transactions.length / pageSize);
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
        <strong className="font-bold">{t('common.error')}:</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{t('transaction_table.no_transactions')}</span>
      </div>
    );
  }

  // Determine which gas field to display based on chainId
  const getGasSpentField = (transaction: GasTransaction) => {
    switch (chainId) {
      case 10143: // Monad Testnet
        return transaction.monad_spent / 1e9;
      default:
        return 0;
    }
  };

  // Get currency symbol based on chainId
  const getCurrencySymbol = () => {
    switch (chainId) {
      case 1: // Ethereum
      case 42161: // Arbitrum
      case 10: // Optimism
      case 8453: // Base
        return "ETH";
      case 137: // Polygon
        return "MATIC";
      case 56: // BNB Chain
        return "BNB";
      case 43114: // Avalanche
        return "AVAX";
      case 10143: // Monad Testnet
        return "MON";
      default:
        return "";
    }
  };

  // Get block explorer URL based on chainId
  const getBlockExplorerUrl = () => {
    switch (chainId) {
      case 1: // Ethereum
        return "https://etherscan.io";
      case 137: // Polygon
        return "https://polygonscan.com";
      case 42161: // Arbitrum
        return "https://arbiscan.io";
      case 10: // Optimism
        return "https://optimistic.etherscan.io";
      case 56: // BNB Chain
        return "https://bscscan.com";
      case 43114: // Avalanche
        return "https://snowtrace.io";
      case 8453: // Base
        return "https://basescan.org";
      case 10143: // Monad Testnet
        return "https://testnet.monadexplorer.com";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('transaction_table.time')}
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('transaction_table.tx_hash')}
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('transaction_table.gas_used')}
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('transaction_table.gas_price')}
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('transaction_table.spent')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {transactions
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                  {new Date(transaction.block_timestamp).toLocaleString("zh-CN")}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-blue-500">
                  <a 
                    href={`${getBlockExplorerUrl()}/tx/${transaction.tx_hash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {transaction.tx_hash.slice(0, 6)}...{transaction.tx_hash.slice(-4)}
                  </a>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                  {transaction.gas_used.toLocaleString()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                  {(transaction.gas_price).toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-300">
                  {getGasSpentField(transaction)?.toFixed(6)} {getCurrencySymbol()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default GasTransactionTable;
