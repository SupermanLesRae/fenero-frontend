import { Community } from "@/components/sections/Community";
import { Events } from "@/components/sections/Events";
import Hero from "@/components/sections/Hero";
import { OurValues } from "@/components/sections/OurValues";
import { Partner } from "@/components/sections/Partner";
import { Roles } from "@/components/sections/Roles";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const revalidate = 60;

export default async function Page() {
  const slug = "careers";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <Partner />
      <WhatWeOffer sel={1} />
      <OurValues />
      <Roles />
      <Events />
      <Community />
    </div>
  );
}
