import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useWallet } from "./WalletContext";
import { ethers } from "ethers";
import { SUBSCRIPTION_PLANS } from "../components/subscription/SubscriptionPlans";

interface Subscription {
  planId: string;
  expiresAt: number;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  isSubscribing: boolean;
  error: string | null;
  success: string | null;
  subscribe: (planId: string) => Promise<void>;
  clearMessages: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: null,
  isSubscribing: false,
  error: null,
  success: null,
  subscribe: async () => {},
  clearMessages: () => {},
});

export const useSubscription = () => useContext(SubscriptionContext);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const { address, provider } = useWallet();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Admin wallet address to receive subscription payments
  const ADMIN_ADDRESS = "0x1234567890123456789012345678901234567890"; // Replace with actual address

  useEffect(() => {
    // Load subscription from localStorage
    const savedSubscription = localStorage.getItem("userSubscription");
    if (savedSubscription) {
      const parsedSubscription = JSON.parse(savedSubscription) as Subscription;
      
      // Check if subscription is expired
      if (parsedSubscription.expiresAt > Date.now()) {
        setSubscription(parsedSubscription);
      } else {
        // Clear expired subscription
        localStorage.removeItem("userSubscription");
      }
    }
  }, []);

  const subscribe = async (planId: string) => {
    if (!address || !provider) {
      setError("请先连接钱包");
      return;
    }

    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId);
    if (!plan) {
      setError("订阅计划不存在");
      return;
    }

    try {
      setIsSubscribing(true);
      setError(null);
      setSuccess(null);

      // For free plan, just update the subscription status
      if (plan.price === 0) {
        const newSubscription = {
          planId: plan.id,
          expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        };
        
        setSubscription(newSubscription);
        localStorage.setItem("userSubscription", JSON.stringify(newSubscription));
        setSuccess(`已激活：${plan.nameKey}`);
        return;
      }

      // For paid plans, process the payment
      const signer = provider.getSigner();
      const priceInWei = ethers.utils.parseEther(plan.price.toString());
      
      const tx = await signer.sendTransaction({
        to: ADMIN_ADDRESS,
        value: priceInWei,
      });
      
      await tx.wait();
      
      // Update subscription status
      const newSubscription = {
        planId: plan.id,
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      };
      
      setSubscription(newSubscription);
      localStorage.setItem("userSubscription", JSON.stringify(newSubscription));
      
      setSuccess(`订阅成功：${plan.nameKey}`);
    } catch (error) {
      console.error("Subscription error:", error);
      setError("订阅失败，请重试");
    } finally {
      setIsSubscribing(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isSubscribing,
        error,
        success,
        subscribe,
        clearMessages,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
