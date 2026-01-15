import { Founder } from "@/components/sections/Founder";
import Hero from "@/components/sections/Hero";
import { OurAwards } from "@/components/sections/OurAwards";
import { OurValues } from "@/components/sections/OurValues";
import { Partner } from "@/components/sections/Partner";
import { SocialImpact } from "@/components/sections/SocialImpact";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const revalidate = 60;

export default async function Page() {
  const slug = "about-us";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <Partner />
      <Founder />
      <OurValues />
      <SocialImpact />
      <OurAwards />
    </div>
  );
}
