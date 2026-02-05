import { createApolloClient } from "@/lib/apolloClient";
import { SOLUTIONS_QUERY } from "@/lib/queries/Queries";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

{
  /* Solution Comparisons */
}
export async function Solutions({ section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: SOLUTIONS_QUERY,
  });

  // Find the first matching node
  const searchText = section.toLowerCase(); // normalize sel

  // Find the first node whose section includes sel
  const matchedNode = data.solutionComparisons.nodes.find((node) => {
    const sections = node.solutionComparisonsCoreFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  // Return solutionComparisonsCoreFields if found
  const result = matchedNode ? matchedNode.solutionComparisonsCoreFields : null;

  const sectionData = result;

  if (!sectionData) return null;

  // Title height + item height
  const TITLE_HEIGHT = 28;
  const ITEM_HEIGHT = 45;

  // Array to store max height per section index
  const maxSectionHeights = [];

  // Loop through all cards and sections
  sectionData?.solutions?.forEach((card) => {
    card.solutionInfo.forEach((section, sectionIndex) => {
      const sectionHeight = TITLE_HEIGHT + section.info.length * ITEM_HEIGHT;

      if (!maxSectionHeights[sectionIndex]) {
        maxSectionHeights[sectionIndex] = sectionHeight;
      } else {
        maxSectionHeights[sectionIndex] = Math.max(
          maxSectionHeights[sectionIndex],
          sectionHeight,
        );
      }
    });
  });

  console.log("Max section heights per index:", maxSectionHeights);

  return (
    <section className="relative w-full pb-10 lg:pb-20 bg-[#ffffff]">
      <div className="max-w-225 mx-auto text-center mb-10 px-6">
        <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14  font-extrabold font-nunito  select-none text-center pt-10 pb-2 text-[#000E47]">
          {sectionData.title}
        </h2>
        {sectionData.description && (
          <p
            className="font-nunito font-medium text-[16px] leading-6 tracking-[0.15px] select-none px-0"
            dangerouslySetInnerHTML={{ __html: sectionData.description }}
          ></p>
        )}
      </div>
      <div className="relative flex flex-wrap justify-center gap-6 max-w-1200 mx-auto px-6 md:px-0">
        {sectionData?.solutions?.map((card, cardIndex) => (
          <div
            key={cardIndex}
            className="
        flex flex-col 
        w-full        /* full width on very small screens */
        sm:w-[400px]  /* max width 400px on small screens and up */
        bg-white 
        border-2 border-[#CEEED6] 
        rounded-xl 
        overflow-hidden 
        shadow-sm
        relative 
        pb-0
      "
          >
            {/* Card Header */}
            <div className="w-full bg-[#EFF5E1] border-b-2 border-[#CEEED6] p-6">
              <h2
                className="text-[28px] text-[#036735] font-bold"
                dangerouslySetInnerHTML={{ __html: card.title }}
              />
            </div>

            {/* Card Body */}
            <div className="px-6 h-full flex flex-col justify-between">
              <div className="">
                {card.solutionInfo.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="flex flex-col mt-10 mb-10 solution-section"
                    style={{
                      height: maxSectionHeights[sectionIndex]
                        ? `${maxSectionHeights[sectionIndex]}px`
                        : "auto",
                    }}
                  >
                    {/* Section Title */}
                    <h3 className="mb-0 text-xl font-semibold text-gray-900">
                      {section.title}
                    </h3>

                    {/* Section List */}
                    <ul className="mt-2">
                      {section.info.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-3 text-gray-700 leading-5"
                          style={{ height: `${ITEM_HEIGHT}px` }}
                        >
                          <Image
                            width={16}
                            height={16}
                            src={item.icon.node.sourceUrl}
                            alt=""
                          />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* PRICE + CTA */}
              <div className="w-full">
                <div className="bg-[#F5F7FF] w-full border-2 border-[#CCCFDA] mb-6 rounded-xl text-[#000E47] px-6 flex flex-col py-6">
                  {(card.priceMonth.price || card.priceMonth.priceInfo) && (
                    <div className="mb-6">
                      {card.priceMonth.price && (
                        <h2 className="font-bold text-[36px] leading-9">
                          {card.priceMonth.price} price
                        </h2>
                      )}
                      {card.priceMonth.priceInfo && (
                        <p className="text-[20px] leading-7">
                          {card.priceMonth.priceInfo} info
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    {card.priceWeek.price && (
                      <h2 className="font-bold text-[20px] leading-7">
                        {card.priceWeek.price}
                      </h2>
                    )}
                    {card.priceWeek.priceInfo && (
                      <p className="text-[20px] leading-7">
                        {card.priceWeek.priceInfo}
                      </p>
                    )}
                  </div>

                  {card.list && (
                    <div>
                      {card.list.map((listItem, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-2 leading-5 text-gray-700 font-light"
                        >
                          <Image
                            width={8}
                            height={8}
                            src={listItem.icon.node.sourceUrl}
                            alt=""
                          />
                          <span>{listItem.label}</span>
                        </li>
                      ))}
                    </div>
                  )}
                </div>

                {/* CTA BUTTON */}
                {card.cta?.label && (
                  <div className="w-full left-0">
                    <Link className="w-full" href={card?.cta?.link || "/"}>
                      <Button
                        size="lg"
                        className="bg-[#000E47] hover:bg-[#AFCE67] text-[#ffffff] hover:text-[#000E47] cursor-pointer w-full transition shadow-md mb-6"
                      >
                        <span className="font-bold text-[16px]">
                          {card.cta?.label}
                        </span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
