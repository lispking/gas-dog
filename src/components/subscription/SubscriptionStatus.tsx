import React from "react";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { SUBSCRIPTION_PLANS } from "./SubscriptionPlans";
import { useTranslation } from "react-i18next";

const SubscriptionStatus: React.FC = () => {
  const { subscription, error, success, clearMessages } = useSubscription();
  const { t, i18n } = useTranslation();

  if (!subscription) {
    return null;
  }

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === subscription.planId);
  if (!plan) return null;

  const expiresDate = new Date(subscription.expiresAt);
  const daysLeft = Math.ceil(
    (subscription.expiresAt - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 mb-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mb-3 text-sm" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-3 py-2"
            onClick={clearMessages}
          >
            <svg
              className="fill-current h-4 w-4 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>{t('subscription.close')}</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded relative mb-3 text-sm" role="alert">
          <span className="block sm:inline">{success}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-3 py-2"
            onClick={clearMessages}
          >
            <svg
              className="fill-current h-4 w-4 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>{t('subscription.close')}</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
        <div className="mb-2 sm:mb-0">
          <span className="font-medium text-gray-500 dark:text-gray-400">
            {t('subscription.current')}：
          </span>
          <span className="ml-1 font-semibold text-gray-900 dark:text-white">
            {plan.name}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-500 dark:text-gray-400">
            {t('subscription.expires')}：
          </span>
          <span className="ml-1 font-semibold text-gray-900 dark:text-white">
            {expiresDate.toLocaleDateString(i18n.language)} ({daysLeft} {t('subscription.days_left')})
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionStatus;
