import { createApolloClient } from "@/lib/apolloClient";
import { COOKIE_POLICY_QUERY } from "@/lib/queries/Queries";

export const revalidate = 60;

export default async function Page() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: COOKIE_POLICY_QUERY,
  });

  const sectionData = data.cookiePolicies.nodes[0];

  if (!sectionData) return null;

  return (
    <section>
      <div className="max-w-432 mx-auto px-20 py-20 text-[#000E47] select-none">
        <h1 className="text-[48px] font-bold">{sectionData.title}</h1>
        <div
          className="policy-content"
          dangerouslySetInnerHTML={{ __html: sectionData.content }}
        ></div>
      </div>
    </section>
  );
}
