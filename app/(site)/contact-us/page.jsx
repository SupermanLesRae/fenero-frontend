import { ContactsList } from "@/components/sections/ContactsList";
import Hero from "@/components/sections/Hero";
import ContactForm from "@/components/utilities/ContactForm";
import Map from "@/components/utilities/Map";
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
  });

  return (
    <section>
      <Hero data={data.heroBy.herosCoreFields.heroSlide} />
      <ContactForm />
      <ContactsList />
      <Map link="https://www.google.com/maps/place/Republic+of+Work/@51.8968159,-8.4729155,17z/data=!3m1!4b1!4m6!3m5!1s0x4844900557c66255:0x6c5b5cb1c22221af!8m2!3d51.8968159!4d-8.4703406!16s%2Fg%2F11g6l_k77f?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" />
    </section>
  );
}
