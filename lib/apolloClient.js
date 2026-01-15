import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch"; // ensures fetch works on server

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "/api/graphql", // proxy to avoid CORS
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
