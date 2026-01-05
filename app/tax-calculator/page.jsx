import Hero from "@/components/sections/Hero";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";
import ContactForm from "@/components/utilities/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo";
import RecruiterPosts from "@/components/sections/RecruiterPosts";
import CallBackRequest from "@/components/sections/CallBackRequest";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";

export const revalidate = 60;

export default async function Page() {
  const slug = "tax-calculator";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <WhatWeOffer bg={"#ECF8EF"} sel={0} />
      <CallBackRequest />
    </div>
  );
}
