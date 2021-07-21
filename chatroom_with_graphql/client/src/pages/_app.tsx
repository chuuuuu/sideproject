import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { Provider, Client, defaultExchanges, subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import theme from "../theme";

const getClient = () => {
  if (process.browser) {
    const subscriptionClient = new SubscriptionClient(
      "ws://localhost:8000/graphql",
      {
        reconnect: true,
      }
    );

    return new Client({
      url: "http://localhost:8000/graphql",
      exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
          forwardSubscription(operation) {
            return subscriptionClient?.request(operation);
          },
        }),
      ],
      fetchOptions: {
        credentials: "include",
      },
    });
  }

  return new Client({
    url: "http://localhost:8000/graphql",
    exchanges: [...defaultExchanges],
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
