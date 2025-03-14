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
    <div className="flex items-center space-x-2">
      <img
        src={monadChain.logoUrl}
        alt={monadChain.name}
        className="w-6 h-6"
      />
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {monadChain.name}
      </span>
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    </div>
  );
};

export default ChainSelector;
