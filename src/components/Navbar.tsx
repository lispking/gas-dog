import React, { useState } from "react";
import { useWallet } from "../contexts/WalletContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { ethers } from "ethers";

const SHARE_TEXT = "Check out Monad Gas Tracker - A powerful tool to analyze your gas consumption on Monad Testnet! 🚀";
const SHARE_URL = window.location.origin;

const Navbar: React.FC = () => {
  const { address, connect, disconnect, isConnecting, setAddress } = useWallet();
  const { t } = useTranslation();
  const [searchAddress, setSearchAddress] = useState<string>("");

  const handleSearch = () => {
    if (ethers.utils.isAddress(searchAddress)) {
      setAddress(searchAddress);
    }
  };

  return (
    <nav className="bg-vscode-titlebar shadow-lg backdrop-blur-sm border-b border-vscode-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <svg className="h-8 w-8 text-vscode-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h1 className="text-xl font-mono font-bold text-vscode-text-primary bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t("navbar.title")}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                placeholder={t("navbar.search_placeholder")}
                className="w-96 px-4 py-2 bg-vscode-panel rounded-lg border border-vscode-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
              <button
                onClick={handleSearch}
                className="ml-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>{t("navbar.search")}</span>
              </button>
            </div>
            <button
              onClick={() => {
                const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`;
                window.open(twitterUrl, '_blank');
              }}
              className="btn-secondary group flex items-center space-x-2 px-3 py-1.5 hover:bg-blue-500 hover:text-white transition-colors duration-300"
              title="Share on Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <LanguageSwitcher />
            {address ? (
              <div className="flex items-center space-x-3 animate-fade-in">
                <div 
                  onClick={() => setSearchAddress(address)}
                  className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-vscode-panel rounded-lg border border-vscode-border cursor-pointer hover:bg-vscode-hover transition-colors duration-300"
                  title={t("common.click_to_search")}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-vscode-text-secondary">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="btn-secondary group"
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {t("common.disconnect")}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="btn-primary group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="relative flex items-center">
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("common.connecting")}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {t("common.connect_wallet")}
                    </>
                  )}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
