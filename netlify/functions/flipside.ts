import { Handler } from "@netlify/functions";
import { Flipside, Query, QueryResultSet } from "@flipsidecrypto/sdk";

const API_KEY = process.env.VITE_FLIPSIDE_API_KEY!;
const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

const executeQuery = async (query: Query): Promise<QueryResultSet> => {
  try {
    return await flipside.query.run(query);
  } catch (error) {
    console.error("Error executing Flipside query:", error);
    throw error;
  }
};

const getQueryResults = async (
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

export const handler: Handler = async (event) => {
  try {
    const { type, ...params } = JSON.parse(event.body || "{}");

    if (!type) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing type parameter" }),
      };
    }

    let result;
    switch (type) {
      case "executeQuery":
        result = await executeQuery(params.query);
        break;
      case "getQueryResults":
        result = await getQueryResults(
          params.queryRunId,
          params.pageNumber,
          params.pageSize
        );
        break;
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid type parameter" }),
        };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};