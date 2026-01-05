import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch"; // Node fetch for Next.js server

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL + "graphql", // server‑side only
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
