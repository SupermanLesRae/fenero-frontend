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
      {/*  <AboutContracting />
     
      <ContactInfo sel={1} bgColor={"#ffffff"} />
      <Solutions />
      <GetStartedProcess />
      <Banners sel={0} />
      <FAQs sel={0} />
      <KnowledgeHub />
      <CallBackRequest /> */}
    </div>
  );
}
