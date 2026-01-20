import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export function createApolloClient() {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.trim();

  if (!wpUrl) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is missing or empty");
  }

  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: `${wpUrl}/graphql`,
      fetch,
    }),
    cache: new InMemoryCache(),
  });
}
