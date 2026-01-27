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

export const runtime = "nodejs"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const slug = "personal-service-company";
  const section = "Personal Service Company";

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
      <ImageTextSections section={section} />
      <CostInfo section={section} />
      <ContactInfo section={section} />
      <ImportantDetails section={section} />
      <NextSteps section={section} />
      <FAQs section={section} />
      <CallBackRequest />
      <KnowledgeHub section={section} />
    </div>
  );
}
