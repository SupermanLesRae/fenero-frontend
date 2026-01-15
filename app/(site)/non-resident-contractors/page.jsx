import { AboutContracting } from "@/components/sections/AboutContracting";
import { GetStartedProcess } from "@/components/sections/GetStartedProcess";
import Hero from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const runtime = "edge"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const slug = "non-resident-contractors";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  console.log(
    "data.heroBy.herosCoreFields.heroSlide",
    data.heroBy.herosCoreFields.heroSlide
  );

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <AboutContracting sel={[1, 0]} multiple={true} />
      <Solutions sel={0} />
      <WhatWeOffer sel={0} />
      <GetStartedProcess sel={[1, 0]} multiple={true} />
    </div>
  );
}
