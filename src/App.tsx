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
      <div className="min-h-screen bg-vscode-editor dark:bg-vscode-editor flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-4 flex-grow font-mono text-vscode-text-primary">
          <div className="mb-4 border-b border-vscode-border">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg font-mono ${
                    activeTab === 'dashboard'
                      ? 'text-vscode-text-primary border-b-2 border-vscode-highlight bg-vscode-tab-active'
                      : 'text-vscode-text-secondary hover:text-vscode-text-primary hover:bg-vscode-tab-inactive'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  {t('common.dashboard')}
                </button>
              </li>
              <li className="mr-2">
                <button
                  className={`inline-block p-4 rounded-t-lg font-mono ${
                    activeTab === 'subscription'
                      ? 'text-vscode-text-primary border-b-2 border-vscode-highlight bg-vscode-tab-active'
                      : 'text-vscode-text-secondary hover:text-vscode-text-primary hover:bg-vscode-tab-inactive'
                  }`}
                  onClick={() => setActiveTab('subscription')}
                >
                  {t('common.subscription')}
                </button>
              </li>
            </ul>
          </div>
          
          {activeTab === 'dashboard' && <SubscriptionStatus />}
          
          {activeTab === 'dashboard' && (
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          )}
          
          {activeTab === 'subscription' && (
            <div className="mt-4">
              <SubscriptionCard onSubscribe={subscribe} isProcessing={isSubscribing} />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
