import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";

// Initialize with environment variable
const API_KEY = import.meta.env.VITE_FLIPSIDE_API_KEY;

export const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

export const executeQuery = async (query: Query): Promise<QueryResultSet> => {
  try {
    return await flipside.query.run(query);
  } catch (error) {
    console.error("Error executing Flipside query:", error);
    throw error;
  }
};

export const getQueryResults = async (
  queryRunId: string,
  pageNumber: number = 1,
  pageSize: number = 1000
): Promise<QueryResultSet> => {
  try {
    return await flipside.query.getQueryResults({
      queryRunId,
      pageNumber,
      pageSize,
    });
  } catch (error) {
    console.error("Error getting query results:", error);
    throw error;
  }
};
