import Hero from "@/components/sections/Hero";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";
import CallBackRequest from "@/components/sections/CallBackRequest";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { TaxCalculator } from "@/components/sections/TaxCalculator";

export const runtime = "nodejs"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const slug = "tax-calculator";
  const section = "Tax Calculator";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
    fetchPolicy: "no-cache", // ✅ rely on ISR
  });

  return (
    <div>
      {data?.heroBy?.herosCoreFields && (
        <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      )}
      <TaxCalculator />
      <WhatWeOffer bg={"#ECF8EF"} section={section} />
      <CallBackRequest />
    </div>
  );
}
