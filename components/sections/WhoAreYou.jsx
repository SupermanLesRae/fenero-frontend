import { createApolloClient } from "@/lib/apolloClient";
import { WHO_WE_ARE_QUERY } from "@/lib/queries/Queries";
import WhoAreYouClient from "./WhoAreYouClient";

export default async function WhoAreYou() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: WHO_WE_ARE_QUERY,
  });

  const core = data?.whoAreYouSections?.nodes?.[0]?.whoAreYouCoreFields ?? null;

  if (!core) return null;

  return <WhoAreYouClient sectionData={core} items={core.cards ?? []} />;
}
