import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch"; // Node fetch for Next.js server

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export function createApolloClient() {
  const isServer = typeof window === "undefined";

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL + "graphql", // server‑side only
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
