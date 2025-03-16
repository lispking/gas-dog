import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ChainConfig } from "../types";

interface WalletContextType {
  address: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchChain: (chainId: number) => Promise<void>;
  isConnecting: boolean;
  error: string | null;
  setAddress: (address: string) => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  chainId: null,
  provider: null,
  connect: async () => {},
  disconnect: () => {},
  switchChain: async () => {},
  isConnecting: false,
  error: null,
  setAddress: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    id: 10143,
    name: "Monad Testnet",
    symbol: "MON",
    rpcUrl: "https://testnet-rpc.monad.xyz",
    blockExplorerUrl: "https://testnet.monadexplorer.com",
    logoUrl: "https://docs.monad.xyz/img/monad_logo.png",
  },
  {
    id: 1,
    name: "Ethereum",
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    blockExplorerUrl: "https://etherscan.io",
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    id: 137,
    name: "Polygon",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorerUrl: "https://polygonscan.com",
    logoUrl: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  {
    id: 42161,
    name: "Arbitrum",
    symbol: "ETH",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    blockExplorerUrl: "https://arbiscan.io",
    logoUrl: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
  },
  {
    id: 10,
    name: "Optimism",
    symbol: "ETH",
    rpcUrl: "https://mainnet.optimism.io",
    blockExplorerUrl: "https://optimistic.etherscan.io",
    logoUrl: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
  },
  {
    id: 56,
    name: "BNB Chain",
    symbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org",
    blockExplorerUrl: "https://bscscan.com",
    logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  },
  {
    id: 43114,
    name: "Avalanche C-Chain",
    symbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://snowtrace.io",
    logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  },
  {
    id: 8453,
    name: "Base",
    symbol: "ETH",
    rpcUrl: "https://mainnet.base.org",
    blockExplorerUrl: "https://basescan.org",
    logoUrl: "https://www.base.org/_next/static/media/logo.f6fdedfc.svg",
  },
];

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const providerOptions = {};
    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });
    setWeb3Modal(newWeb3Modal);

    if (newWeb3Modal.cachedProvider) {
      connect();
    }
  }, []);

  const connect = async () => {
    if (!web3Modal) return;
    
    try {
      setIsConnecting(true);
      setError(null);
      
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      
      setProvider(provider);
      setAddress(accounts[0]);
      setChainId(network.chainId);
      
      instance.on("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0]);
      });
      
      instance.on("chainChanged", (chainId: number) => {
        setChainId(parseInt(chainId.toString(), 16));
      });
    } catch (error) {
      console.error("Connection error:", error);
      setError("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
    }
    setAddress(null);
    setChainId(null);
    setProvider(null);
  };

  const switchChain = async (chainId: number) => {
    if (!provider) return;
    
    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${chainId.toString(16)}` },
      ]);
    } catch (error: any) {
      // Chain does not exist in wallet
      if (error.code === 4902) {
        const chain = SUPPORTED_CHAINS.find((c) => c.id === chainId);
        if (!chain) throw new Error(`Chain ${chainId} not supported`);
        
        await provider.send("wallet_addEthereumChain", [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: chain.name,
            nativeCurrency: {
              name: chain.symbol,
              symbol: chain.symbol,
              decimals: 18,
            },
            rpcUrls: [chain.rpcUrl],
            blockExplorerUrls: [chain.blockExplorerUrl],
          },
        ]);
      } else {
        throw error;
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        chainId,
        provider,
        connect,
        disconnect,
        switchChain,
        isConnecting,
        error,
        setAddress
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
