import { Query } from "@flipsidecrypto/sdk";

export const getMonadTestnetGasQuery = (address: string, timeRange: number = 30): Query => ({
  sql: `
    SELECT 
      block_timestamp,
      tx_hash,
      gas_used,
      gas_price,
      gas_used * gas_price as monad_spent,
      tx_fee as monad_fee,
      origin_function_signature,
      from_address,
      to_address
    FROM monad.testnet.fact_transactions
    WHERE from_address = LOWER('${address}')
    AND block_timestamp >= DATEADD(day, -${timeRange}, CURRENT_DATE())
    ORDER BY block_timestamp DESC
  `,
  maxAgeMinutes: 15,
  timeoutMinutes: 5,
});

export const getGasSummaryQuery = (address: string, timeRange: number = 30): Query => ({
  sql: `
    SELECT 
      'Monad Testnet' as chain,
      SUM(gas_used * gas_price) as total_monad_spent,
      COUNT(*) as tx_count,
      AVG(gas_used * gas_price) as avg_monad_per_tx,
      MAX(gas_used * gas_price) as max_monad_per_tx
    FROM monad.testnet.fact_transactions
    WHERE from_address = LOWER('${address}')
    AND block_timestamp >= DATEADD(day, -${timeRange}, CURRENT_DATE())
  `,
  maxAgeMinutes: 15,
  timeoutMinutes: 5,
});
