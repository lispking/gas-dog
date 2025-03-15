import { Query, QueryResultSet } from "@flipsidecrypto/sdk";

const API_ENDPOINT = "/.netlify/functions/flipside";

export const executeQuery = async (query: Query): Promise<QueryResultSet> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        type: "executeQuery",
        query,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
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
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        type: "getQueryResults",
        queryRunId,
        pageNumber,
        pageSize,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting query results:", error);
    throw error;
  }
};
