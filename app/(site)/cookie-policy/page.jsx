import { createApolloClient } from "@/lib/apolloClient";
import { COOKIE_POLICY_QUERY } from "@/lib/queries/Queries";

export const runtime = "nodejs"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: COOKIE_POLICY_QUERY,
    fetchPolicy: "no-cache", // ✅ rely on ISR
  });

  const sectionData = data.cookiePolicies.nodes[0];

  if (!sectionData) return null;

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20 py-20 text-[#000E47] select-none">
        <h1 className="text-[48px] font-bold">{sectionData.title}</h1>
        <div
          className="policy-content"
          dangerouslySetInnerHTML={{ __html: sectionData.content.trim() }}
        ></div>
      </div>
    </section>
  );
}


<div class="accordion">

  <details class="accordion-item" open>
    <summary class="accordion-header">
      <h3>WordPress</h3>
      
    </summary>
    <div class="accordion-content">
    
    </div>

  </details>
</div>
