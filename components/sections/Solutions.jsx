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

  return (
    <section className="relative w-full pb-20 bg-[#ffffff]">
      <div className="max-w-225 mx-auto text-center mb-10">
        <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14  font-extrabold font-nunito  select-none text-center pt-10 pb-2 text-[#000E47]">
          {sectionData.title}
        </h2>
        {sectionData.description && (
          <p
            className="font-nunito font-medium text-[16px] leading-6 tracking-[0.15px] select-none px-8"
            dangerouslySetInnerHTML={{ __html: sectionData.description }}
          ></p>
        )}
      </div>
      <div className=" flex flex-wrap gap-6 px-10 max-w-337.5 mx-auto justify-center">
        {sectionData?.solutions?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border-2 border-[#CEEED6] rounded-xl overflow-hidden shadow-sm min-w-100 max-w-100 flex-1 relative pb-0"
          >
            <div className="w-full bg-[#EFF5E1] border-b-2 border-[#CEEED6] p-6">
              <h2
                className="text-[28px] text-[#036735] font-bold"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></h2>
            </div>
            <div className="px-6 h-full flex flex-col justify-between">
              <div className="py-8">
                {item.solutionInfo.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-2">
                    {/* Section title */}
                    <h3 className="mb-4 text-xl font-semibold text-gray-900">
                      {section.title}
                    </h3>

                    {/* Section list */}
                    <ul className="space-y-2 mb-6">
                      {section.info.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-3 leading-5 text-gray-700"
                        >
                          <Image
                            unoptimized
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
              <div className="w-full">
                <div className="bg-[#F5F7FF] w-full border-2 border-[#CCCFDA] mb-6 rounded-xl text-[#000E47] px-6 flex flex-col py-6">
                  {(item.priceMonth.price || item.priceMonth.priceInfo) && (
                    <div className="mb-6">
                      {item.priceMonth.price && (
                        <h2 className="font-bold text-[36px] leading-9">
                          {item.priceMonth.price} price
                        </h2>
                      )}
                      {item.priceMonth.priceInfo && (
                        <p className="text-[20px] leading-7">
                          {item.priceMonth.priceInfo} info
                        </p>
                      )}
                    </div>
                  )}
                  <div>
                    {item.priceWeek.price && (
                      <h2 className="font-bold text-[20px] leading-7">
                        {item.priceWeek.price}
                      </h2>
                    )}
                    {item.priceWeek.priceInfo && (
                      <p className="text-[20px] leading-7">
                        {item.priceWeek.priceInfo}
                      </p>
                    )}
                  </div>
                  {item.list && (
                    <div>
                      {item.list.map((listItem, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-center gap-2 leading-5 text-gray-700 font-light"
                        >
                          <Image
                            unoptimized
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
                {item.cta?.label && (
                  <div className=" w-full left-0 ">
                    <Link className="w-full" href={item?.cta?.link || "/"}>
                      <Button
                        size="lg"
                        className={`bg-[#000E47] hover:bg-[#AFCE67] text-[#ffffff] hover:text-[#000E47] cursor-pointer w-full transition shadow-md mb-6`}
                      >
                        <span className=" font-bold text-[16px] ">
                          {item.cta?.label}
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
