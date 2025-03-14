import React from 'react';
import { useTranslation } from 'react-i18next';

interface WelcomePageProps {
  onConnect: () => void;
  isConnecting: boolean;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onConnect, isConnecting }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-vscode-panel to-transparent">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Hero Section */}
        <div className="text-center mb-24 lg:mb-32 animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-vscode-text-primary mb-8 font-mono tracking-tight">
            {t('dashboard.welcome_title')}
          </h1>
          <p className="text-xl lg:text-2xl text-vscode-text-secondary mb-12 font-mono leading-relaxed">
            {t('dashboard.welcome_subtitle')}
          </p>
          <div className="flex justify-center">
            <button
              onClick={onConnect}
              disabled={isConnecting}
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Multichain Feature */}
          <div className="group bg-vscode-panel/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-102 hover:shadow-2xl border border-transparent hover:border-blue-500/20">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-8 transform transition-transform group-hover:rotate-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-vscode-text-primary mb-6">
              {t('dashboard.feature_multichain')}
            </h3>
            <p className="text-lg text-vscode-text-secondary leading-relaxed">
              {t('dashboard.feature_multichain_desc')}
            </p>
          </div>

          {/* Stats Feature - apply same changes as above */}
          <div className="group bg-vscode-panel/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-102 hover:shadow-2xl border border-transparent hover:border-purple-500/20">
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

          {/* History Feature - apply same changes as above */}
          <div className="group bg-vscode-panel/80 backdrop-blur-sm rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:scale-102 hover:shadow-2xl border border-transparent hover:border-pink-500/20">
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
};

export default WelcomePage;