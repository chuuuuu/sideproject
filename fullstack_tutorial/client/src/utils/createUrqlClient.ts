import {
  dedupExchange,
  fetchExchange,
  errorExchange,
} from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from "next/router";
import { CombinedError } from "urql";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              // old data
              { query: MeDocument },
              // new data
              _result,
              (result, query) => {
                if (result.login.errors) {
                  // if there error in result (new data), than using query (old data)
                  return query;
                }

                // or using result (new data)
                return { me: result.login.user };
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              // old data
              { query: MeDocument },
              // new data
              _result,
              (result, query) => {
                if (result.register.errors) {
                  // if there error in result (new data), than using query (old data)
                  return query;
                }

                // or using result (new data)
                return { me: result.register.user };
              }
            );
          },
        },
      },
    }),
    errorExchange({
      onError: (error: CombinedError) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
