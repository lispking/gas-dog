import React from "react";
import { useWallet } from "../contexts/WalletContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar: React.FC = () => {
  const { address, connect, disconnect, isConnecting } = useWallet();
  const { t } = useTranslation();

  return (
    <nav className="bg-vscode-titlebar shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-14">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-lg font-mono font-bold text-vscode-text-primary">
                {t("navbar.title")}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            {address ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono text-vscode-text-secondary hidden sm:inline">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <button
                  onClick={disconnect}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-mono font-medium rounded-md text-white bg-vscode-button hover:bg-vscode-button-hover"
                >
                  {t("common.disconnect")}
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={isConnecting}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-mono font-medium rounded-md text-white bg-vscode-button hover:bg-vscode-button-hover"
              >
                {isConnecting ? t("common.connecting") : t("common.connect_wallet")}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
