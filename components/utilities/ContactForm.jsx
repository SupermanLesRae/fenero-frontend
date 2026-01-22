import { motion } from "framer-motion";
import { createApolloClient } from "@/lib/apolloClient";
import { CONTACT_FORM_QUERY } from "@/lib/queries/Queries";
import { ContactFormClient } from "./ContactFormClient";
import Image from "next/image";

// Server Component
export default async function ContactPage() {
  const client = createApolloClient();

  const result = await client.query({
    query: CONTACT_FORM_QUERY,
  });

  const data = result.data.contactForms.nodes[0].contactFormCoreFields;

  if (!data) return null;

  return (
    <div className="relative pb-10 lg:pb-20 px-6">
      <h2
        id="contact"
        className="relative text-[30px] md:text-[48px] leading-tight font-extrabold font-nunito mb-2 select-none text-white text-center py-10 lg:py-20 z-11"
      >
        {data.title}
      </h2>
      <div className="absolute w-full h-full z-0 left-0 top-0">
        <Image
          src={data.img.node.sourceUrl}
          alt={data.img.node.altText || "Image"}
          className="w-full h-full object-cover"
          width={1411}
          height={480}
        />
        <div className="absolute top-0 left-0 bg-[#036735] w-full h-full inset-0 mix-blend-multiply" />
      </div>

      {/* Client-side form component */}
      <div className="relative max-w-358.75 mx-auto rounded-xl border bg-white py-10 px-6 lg:px-10 shadow-sm max-w-[980px]">
        <ContactFormClient selectOptions={data.select} />
      </div>
    </div>
  );
}
