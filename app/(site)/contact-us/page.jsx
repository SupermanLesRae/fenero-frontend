import { ContactsList } from "@/components/sections/ContactsList";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/utilities/ContactForm";
import ScrollToSection from "@/components/utilities/ScrollToSection";
import { createApolloClient } from "@/lib/apolloClient";
import { HERO_QUERY } from "@/lib/queries/Queries";

export const runtime = "nodejs"; // ✅ Edge runtime
export const revalidate = 60; // ✅ ISR caching

export default async function Page() {
  const slug = "contact-us";

  const client = createApolloClient();
  const { data } = await client.query({
    query: HERO_QUERY,
    variables: { slug },
    fetchPolicy: "no-cache", // ✅ rely on ISR
  });

  return (
    <section>
      <ScrollToSection />

      {data?.heroBy?.herosCoreFields && (
        <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      )}
      <div id="callBack">
        <ContactForm />
      </div>

      <ContactsList />
    </section>
  );
}
