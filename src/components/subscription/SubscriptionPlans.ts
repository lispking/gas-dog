import { SubscriptionPlan } from "../../types";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    nameKey: "subscription.plans.free.name",
    price: 0,
    featureKeys: [
      "subscription.plans.free.features.0",
      "subscription.plans.free.features.1",
      "subscription.plans.free.features.2",
      "subscription.plans.free.features.3"
    ],
    recommended: false
  },
  {
    id: "standard",
    nameKey: "subscription.plans.standard.name",
    price: 0.01,
    featureKeys: [
      "subscription.plans.standard.features.0",
      "subscription.plans.standard.features.1",
      "subscription.plans.standard.features.2",
      "subscription.plans.standard.features.3",
      "subscription.plans.standard.features.4"
    ],
    recommended: true
  },
  {
    id: "premium",
    nameKey: "subscription.plans.premium.name",
    price: 0.05,
    featureKeys: [
      "subscription.plans.premium.features.0",
      "subscription.plans.premium.features.1",
      "subscription.plans.premium.features.2",
      "subscription.plans.premium.features.3",
      "subscription.plans.premium.features.4",
      "subscription.plans.premium.features.5"
    ],
    recommended: false
  },
  {
    id: "enterprise",
    nameKey: "subscription.plans.enterprise.name",
    price: 0.2,
    featureKeys: [
      "subscription.plans.enterprise.features.0",
      "subscription.plans.enterprise.features.1",
      "subscription.plans.enterprise.features.2",
      "subscription.plans.enterprise.features.3",
      "subscription.plans.enterprise.features.4",
      "subscription.plans.enterprise.features.5",
      "subscription.plans.enterprise.features.6"
    ],
    recommended: false
  }
];
