import { AboutContracting } from "@/components/sections/AboutContracting";
import { Banners } from "@/components/sections/Banners";
import CallBackRequest from "@/components/sections/CallBackRequest";
import ContactInfo from "@/components/sections/ContactInfo";
import { CostInfo } from "@/components/sections/CostInfo";
import { FAQs } from "@/components/sections/FAQs";
import { GetStartedProcess } from "@/components/sections/GetStartedProcess";
import Hero from "@/components/sections/Hero";
import { ImageTextSections } from "@/components/sections/ImageTextSections";
import { ImportantDetails } from "@/components/sections/ImportantDetails";
import { KnowledgeHub } from "@/components/sections/KnowledgeHub";
import { NextSteps } from "@/components/sections/NextSteps";
import { Solutions } from "@/components/sections/Solutions";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const revalidate = 60;

export default async function Page() {
  const slug = "psc";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <imgTextSections />
      <CostInfo />
      <ContactInfo sel={0} />
      <ImportantDetails />
      <NextSteps />
      <FAQs sel={0} />
      <CallBackRequest />
      <KnowledgeHub />
    </div>
  );
}
