import CallBackRequest from "@/components/sections/CallBackRequest";
import Hero from "@/components/sections/Hero";
import NewsPosts from "@/components/sections/NewsPosts";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const revalidate = 60;
export const runtime = "nodejs"; // ✅ Edge runtime

export default async function Page() {
  const slug = "knowledge-hub";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <NewsPosts />
      <CallBackRequest />
    </div>
  );
}
