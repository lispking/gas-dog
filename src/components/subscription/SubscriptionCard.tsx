import React from "react";
import { useWallet } from "../../contexts/WalletContext";
import { SUBSCRIPTION_PLANS } from "./SubscriptionPlans";
import { useTranslation } from "react-i18next";

interface SubscriptionCardProps {
  onSubscribe: (planId: string) => Promise<void>;
  isProcessing: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  onSubscribe,
  isProcessing,
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {t('subscription.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg overflow-hidden ${
              plan.recommended
                ? "border-blue-500 dark:border-blue-400"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {plan.recommended && (
              <div className="bg-blue-500 text-white text-center py-1 text-xs font-medium">
                {t('subscription.recommended')}
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t(plan.nameKey)}
              </h3>
              <div className="mb-3">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.price} ETH
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.price === 0 ? "" : t('subscription.per_month')}
                </span>
              </div>
              <ul className="space-y-1 mb-4 text-sm">
                {plan.featureKeys.map((featureKey, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-4 w-4 text-green-500 mr-1 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">
                      {t(featureKey)}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSubscribe(plan.id)}
                disabled={isProcessing}
                className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  plan.price === 0
                    ? "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isProcessing
                  ? t('subscription.processing')
                  : plan.price === 0
                  ? t('subscription.start_using')
                  : t('subscription.subscribe')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;
