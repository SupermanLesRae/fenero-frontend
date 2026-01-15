import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export function createApolloClient() {
  const isServer = typeof window === "undefined";

  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: isServer
        ? process.env.NEXT_PUBLIC_BASE_URL + "/api/graphql" // absolute URL for SSR
        : "/api/graphql", // relative URL for client
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
