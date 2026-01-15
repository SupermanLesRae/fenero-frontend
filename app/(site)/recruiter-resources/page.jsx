import Hero from "@/components/sections/Hero";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";
import ContactForm from "@/components/utilities/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo";
import RecruiterPosts from "@/components/sections/RecruiterPosts";

export const runtime = "edge"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const slug = "recruiter-resources";
  const section = "Recruiters Resources";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <RecruiterPosts />
      <ContactInfo section={section} />
      <ContactForm />
    </div>
  );
}
