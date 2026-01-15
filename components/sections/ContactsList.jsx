import { createApolloClient } from "@/lib/apolloClient";
import { CONTACTS_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";

export async function ContactsList() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: CONTACTS_QUERY,
  });

  const sectionData = data.contacts.nodes[0].contactsCoreFields;
  if (!sectionData) return null;

  return (
    <section className="pb-8 pt-20 select-none max-w-500 mx-auto">
      {/* GRID WRAPPER */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-10">
        {sectionData.contacts.map((contact, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 rounded-xl bg-white p-6"
          >
            {/* Icon */}
            <div className="shrink-0 bg-[#6B0071] p-10 rounded-full">
              <Image
                unoptimized
                width={80}
                height={80}
                src={contact.icon.node.sourceUrl}
                alt={contact.icon.node.altText || "Icon"}
                className="h-20 w-20 "
              />
            </div>

            {/* Info */}
            <div className="space-y-3 flex flex-row gap-6 pt-2">
              {contact.info.infoList.map((item, idx) => (
                <div
                  className="flex flex-col text-center items-center"
                  key={idx}
                >
                  <p className="font-semibold text-gray-900">{item.title}</p>

                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
