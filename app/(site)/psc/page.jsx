import CallBackRequest from "@/components/sections/CallBackRequest";
import ContactInfo from "@/components/sections/ContactInfo";
import { CostInfo } from "@/components/sections/CostInfo";
import { FAQs } from "@/components/sections/FAQs";
import Hero from "@/components/sections/Hero";
import { ImageTextSections } from "@/components/sections/ImageTextSections";
import { ImportantDetails } from "@/components/sections/ImportantDetails";
import { KnowledgeHub } from "@/components/sections/KnowledgeHub";
import { NextSteps } from "@/components/sections/NextSteps";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const runtime = "edge"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

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
      <ImageTextSections />
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
