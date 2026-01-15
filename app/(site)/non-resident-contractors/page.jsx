import { AboutContracting } from "@/components/sections/AboutContracting";
import { Banners } from "@/components/sections/Banners";
import CallBackRequest from "@/components/sections/CallBackRequest";
import { FAQs } from "@/components/sections/FAQs";
import { GetStartedProcess } from "@/components/sections/GetStartedProcess";
import Hero from "@/components/sections/Hero";
import { KnowledgeHub } from "@/components/sections/KnowledgeHub";
import { Solutions } from "@/components/sections/Solutions";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const runtime = "edge"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const slug = "non-resident-contractors";
  const section = "non-resident Contractor";

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
      <AboutContracting section={section} />
      <Solutions section={section} />
      <WhatWeOffer section={section} />
      <GetStartedProcess section={section} />
      <Banners section={section} />
      <FAQs section={section} />
      <KnowledgeHub />
      <CallBackRequest />
    </div>
  );
}
