import { createApolloClient } from "@/lib/apolloClient";
import { OFFER_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";

{
  /* How We Help */
}
export async function WhatWeOffer({ bg, section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: OFFER_QUERY,
  });

  // Find the first matching node
  const searchText = section.toLowerCase(); // normalize sel

  // Find the first node whose section includes sel
  const matchedNode = data.whatWeOfferSections.nodes.find((node) => {
    const sections = node.whatWeOfferCoreFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  // Return solutionComparisonsCoreFields if found
  const result = matchedNode ? matchedNode.whatWeOfferCoreFields : null;

  const sectionData = result;

  if (!sectionData) return null;

  return (
    <section style={{ backgroundColor: bg || "#ffffff" }}>
      <div className="flex w-full">
        <div className="relative flex flex-row xl:items-center select-none mx-auto pb-10 lg:pb-20">
          <div className="w-full text-center">
            <h2 className="mb-6 text-[40px] leading-12 md:text-[48px] md:leading-13 tracking-[0.15px] font-black pt-10 lg:pt-20 lg:pb-10">
              {sectionData.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-10 text-left">
              {sectionData.offers.map((item, index) => {
                return (
                  <div
                    className="flex items-start gap-4"
                    key={"offer-" + index}
                  >
                    <Image
                      src={item.icon.node.sourceUrl}
                      alt={
                        item.icon.node.altText || "No alternative text provided"
                      }
                      className="relative w-[24px] h-[24px]"
                      width={24}
                      height={24}
                    />

                    <p className="text-[16px] md:text-[16px] leading-6 md:leading-6 tracking-[0.15px] text-[#000000]">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
