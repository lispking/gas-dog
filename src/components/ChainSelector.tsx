import React from "react";
import { SUPPORTED_CHAINS } from "../contexts/WalletContext";
import { useWallet } from "../contexts/WalletContext";

interface ChainSelectorProps {
  selectedChainId: number;
  onSelectChain: (chainId: number) => void;
}

const ChainSelector: React.FC<ChainSelectorProps> = ({
  selectedChainId,
  onSelectChain,
}) => {
  const monadChain = SUPPORTED_CHAINS[0]; // Monad Testnet is the only supported chain

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          当前网络
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 dark:text-green-400">已连接</span>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <img
          src={monadChain.logoUrl}
          alt={monadChain.name}
          className="w-10 h-10 mr-3"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {monadChain.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gas Tracker 专用测试网
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChainSelector;
