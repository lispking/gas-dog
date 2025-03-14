export interface ChainConfig {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  logoUrl: string;
}

export interface GasTransaction {
  block_timestamp: string;
  tx_hash: string;
  gas_used: number;
  gas_price: number;
  monad_spent: number;
  monad_fee: number;
  origin_function_signature: string;
  from_address: string;
  to_address: string;
}

export interface GasSummary {
  chain: string;
  total_monad_spent: number;
  tx_count: number;
  avg_monad_per_tx: number;
  max_monad_per_tx: number;
}

export interface SubscriptionPlan {
  id: string;
  nameKey: string;
  price: number;
  featureKeys: string[];
  recommended: boolean;
}

export enum TimeRange {
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
  QUARTER = 90,
  YEAR = 365,
}
