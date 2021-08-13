import { dedupExchange, fetchExchange, subscriptionExchange } from "@urql/core";
import { isServer } from "./isServer";
import { NextUrqlClientConfig } from "next-urql";
import { createClient as createWSClient } from "graphql-ws";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  PairMutation,
  RoomDocument,
  RoomQuery,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

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
      cacheExchange({
        updates: {
          Mutation: {
            login: (result, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                // old data
                { query: MeDocument },
                // new data
                result,
                (_result, _query) => {
                  // use new result (new data)
                  return { me: _result.login };
                }
              );
            },
            leaveRoom: (result, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, RoomQuery>(
                cache,
                // old data
                { query: RoomDocument },
                // new data
                result,
                (_result, _query) => {
                  // use new result (new data)
                  return { room: null };
                }
              );
            },
            pair: (result, _args, cache, _info) => {
              betterUpdateQuery<PairMutation, RoomQuery>(
                cache,
                // old data
                { query: RoomDocument },
                // new data
                result,
                (_result, _query) => {
                  // use new result (new data)
                  return { room: _result.pair };
                }
              );
            },
          },
        },
      }),
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
