import { motion } from "framer-motion";
import { createApolloClient } from "@/lib/apolloClient";
import { CONTACT_FORM_QUERY } from "@/lib/queries/Queries";
import { ContactFormClient } from "./ContactFormClient";

// Server Component
export default async function ContactPage() {
  const client = createApolloClient();

  const result = await client.query({
    query: CONTACT_FORM_QUERY,
  });

  const data = result.data.contactForms.nodes[0].contactFormCoreFields;

  if (!data) return null;

  return (
    <div className="relative pb-20 px-10">
      <h2 className="relative text-[30px] md:text-[48px] font-extrabold font-nunito mb-2 select-none text-white text-center pt-20 pb-20 z-11">
        {data.title}
      </h2>
      <div className="absolute w-full h-full z-0 left-0 top-0">
        <img
          src={data.img.node.sourceUrl}
          alt={data.img.node.altText || "Image"}
          className="w-full h-full object-cover"
          width={100}
          height={100}
        />
        <div className="absolute top-0 left-0 bg-[#036735] w-full h-full inset-0 mix-blend-multiply" />
      </div>

      {/* Client-side form component */}
      <div className="relative max-w-358.75 mx-auto rounded-xl border bg-white py-10 px-10 shadow-sm">
        <ContactFormClient selectOptions={data.select} />
      </div>
    </div>
  );
}
