import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SubscriptionCard from "./components/subscription/SubscriptionCard";
import SubscriptionStatus from "./components/subscription/SubscriptionStatus";
import { useSubscription } from "./contexts/SubscriptionContext";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { subscribe, isSubscribing } = useSubscription();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'subscription'>('dashboard');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-vscode-editor to-vscode-panel flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-6 flex-grow font-mono text-vscode-text-primary">
          <div className="mb-6 border-b border-vscode-border bg-vscode-panel/50 backdrop-blur-sm rounded-t-xl shadow-lg">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button
                  className={`inline-flex items-center p-4 rounded-t-lg font-mono transition-all duration-200 ${
                    activeTab === 'dashboard'
                      ? 'text-vscode-text-primary border-b-2 border-vscode-highlight bg-vscode-tab-active shadow-glow'
                      : 'text-vscode-text-secondary hover:text-vscode-text-primary hover:bg-vscode-tab-inactive'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {t('common.dashboard')}
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-flex items-center p-4 rounded-t-lg font-mono transition-all duration-200 ${
                    activeTab === 'subscription'
                      ? 'text-vscode-text-primary border-b-2 border-vscode-highlight bg-vscode-tab-active shadow-glow'
                      : 'text-vscode-text-secondary hover:text-vscode-text-primary hover:bg-vscode-tab-inactive'
                  }`}
                  onClick={() => setActiveTab('subscription')}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  {t('common.subscription')}
                </button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-6 animate-fade-in">
            {activeTab === 'dashboard' && (
              <div className="bg-vscode-panel/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-vscode-border hover:border-vscode-highlight transition-colors duration-300">
                <SubscriptionStatus />
              </div>
            )}
            
            {activeTab === 'dashboard' && (
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            )}
            
            {activeTab === 'subscription' && (
              <div className="mt-4 animate-slide-up">
                <SubscriptionCard onSubscribe={subscribe} isProcessing={isSubscribing} />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
