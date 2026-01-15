import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch"; // Node fetch for Next.js server

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export function createApolloClient() {
  //const isServer = typeof window === "undefined";

  /*  const link = new HttpLink({
    uri: isServer
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql` // absolute URL for SSR
      : "/api/graphql", // relative URL works on client
    fetch,
  }); */

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "https://13.60.181.6/graphql", // server‑side only
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
