import { AboutContracting } from "@/components/sections/AboutContracting";
import { Banners } from "@/components/sections/Banners";
import CallBackRequest from "@/components/sections/CallBackRequest";
import ContactInfo from "@/components/sections/ContactInfo";
import { FAQs } from "@/components/sections/FAQs";
import { GetStartedProcess } from "@/components/sections/GetStartedProcess";
import Hero from "@/components/sections/Hero";
import { KnowledgeHub } from "@/components/sections/KnowledgeHub";
import { Solutions } from "@/components/sections/Solutions";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const revalidate = 60;

export default async function Page() {
  const slug = "ntc";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <AboutContracting sel={2} />
      <WhatWeOffer sel={0} />
      <ContactInfo sel={1} bgColor={"#ffffff"} />
      <Solutions sel={1} />
      <GetStartedProcess sel={2} />
      <Banners sel={0} />
      <FAQs sel={1} />
      <KnowledgeHub />
      <CallBackRequest />
    </div>
  );
}
