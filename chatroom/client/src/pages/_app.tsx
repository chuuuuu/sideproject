import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import {
  Provider,
  createClient,
  defaultExchanges,
  subscriptionExchange,
} from "urql";
import theme from "../theme";
import { createClient as createWSClient } from "graphql-ws";

const getClient = () => {
  if (!process.browser) {
    return createClient({
      url: "http://localhost:8000/graphql",
      exchanges: [...defaultExchanges],
      fetchOptions: {
        credentials: "include",
      },
    });
  }

  const wsClient = createWSClient({
    url: "ws://localhost:8000/graphql",
  });
  return createClient({
    url: "http://localhost:8000/graphql",
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription(operation) {
          return {
            subscribe: (sink) => {
              const dispose = wsClient.subscribe(operation, sink);
              return {
                unsubscribe: dispose,
              };
            },
          };
        },
      }),
    ],
    fetchOptions: {
      credentials: "include",
    },
  });
};

function MyApp({ Component, pageProps }: any) {
  const client = getClient();
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
