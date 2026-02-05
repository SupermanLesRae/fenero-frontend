import { Founder } from "@/components/sections/Founder";
import Hero from "@/components/sections/Hero";
import { OurAwards } from "@/components/sections/OurAwards";
import { OurValues } from "@/components/sections/OurValues";
import { Partner } from "@/components/sections/Partner";
import { SocialImpact } from "@/components/sections/SocialImpact";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const runtime = "nodejs"; // ✅ nodejs runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const slug = "about-us";
  const section = "about us";

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
      <Partner section={section} />
      <Founder />
      <OurValues />
      <SocialImpact />
      <OurAwards />
    </div>
  );
}
