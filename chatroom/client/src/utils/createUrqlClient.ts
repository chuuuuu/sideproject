import {
  dedupExchange,
  fetchExchange,
  cacheExchange,
  subscriptionExchange,
} from "@urql/core";
import { isServer } from "./isServer";
import { NextUrqlClientConfig } from "next-urql";
import { createClient as createWSClient } from "graphql-ws";

export const createUrqlClient: NextUrqlClientConfig = (
  ssrExchange: any,
  ctx: any
) => {
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: isServer()
        ? {
            cookie: ctx?.req?.headers?.cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange,
      ssrExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(operation) {
          return {
            subscribe: (sink) => {
              const wsClient = createWSClient({
                url: "ws://localhost:8000/graphql",
              });
              const dispose = wsClient.subscribe(operation, sink);
              return {
                unsubscribe: dispose,
              };
            },
          };
        },
      }),
    ],
  };
};
