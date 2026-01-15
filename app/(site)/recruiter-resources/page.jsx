import Hero from "@/components/sections/Hero";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";
import ContactForm from "@/components/utilities/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo";
import RecruiterPosts from "@/components/sections/RecruiterPosts";

export const revalidate = 60;

export default async function Page() {
  const slug = "recruiter-resources";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
  });

  return (
    <div>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <RecruiterPosts />
      <ContactInfo sel={0} />
      <ContactForm />
    </div>
  );
}
