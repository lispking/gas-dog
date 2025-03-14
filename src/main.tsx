import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import "./i18n";
import { WalletProvider } from "./contexts/WalletContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { LanguageProvider } from "./contexts/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <WalletProvider>
        <SubscriptionProvider>
          <App />
        </SubscriptionProvider>
      </WalletProvider>
    </LanguageProvider>
  </React.StrictMode>
);
