import { createApolloClient } from "@/lib/apolloClient";
import { COST_INFO_SECTION } from "@/lib/queries/Queries";
import Image from "next/image";

{
  /* Cost Info Section */
}
export async function CostInfo({ section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: COST_INFO_SECTION,
  });

  const nodes = data.costInfoSections.nodes ?? [];

  const searchText = section.toLowerCase();

  if (!nodes) return null;

  return (
    <>
      {nodes
        .filter((sectionData) =>
          sectionData.costInfoSectionsCoreFields.section?.some(
            (section) => section.toLowerCase() === searchText,
          ),
        )
        .map((sectionData, sectionIndex) => {
          return (
            <section
              key={sectionIndex}
              className="relative w-full bg-[#ECF8EF]"
            >
              <div className="px-6">
                {/* TITLE */}
                <h2 className="relative text-[26px] max-w-225 mx-auto leading-tight md:text-[48px] font-extrabold font-nunito text-center text-[#000E47] pt-10 lg:pt-20 pb-10 lg:pb-16">
                  {sectionData.costInfoSectionsCoreFields.title}
                </h2>
              </div>

              {/* CONTENT */}

              <div
                className={`flex flex-col md:flex-row items-center md:items-start gap-10 px-6 pb-10 w-full max-w-337.5 relative mx-auto justify-center h-full`}
              >
                {/*  */}
                {sectionData.costInfoSectionsCoreFields.cols?.left?.title && (
                  <div className="flex flex-col gap-4  bg-[#036735] max-w-xl text-white p-10 rounded-xl min-w-[300px] max-w-[500px]">
                    <p className="relative text-[18px] leading-tight font-nunito text-left  ">
                      {sectionData.costInfoSectionsCoreFields.cols.left.title}
                    </p>
                    {sectionData.costInfoSectionsCoreFields.cols.left?.priceInfo
                      ?.length > 0 &&
                      sectionData.costInfoSectionsCoreFields.cols.left.priceInfo.map(
                        (price, index) => (
                          <div key={index} className="mb-2">
                            <p
                              className="relative text-[24px] leading-tight md:text-[26px] font-extrabold font-nunito text-left"
                              dangerouslySetInnerHTML={{
                                __html: price.price,
                              }}
                            ></p>
                            <p
                              className="relative text-[18px] leading-tight font-nunito text-left"
                              dangerouslySetInnerHTML={{
                                __html: price.note,
                              }}
                            ></p>
                          </div>
                        ),
                      )}
                  </div>
                )}

                {/*  */}
                {sectionData.costInfoSectionsCoreFields?.cols?.right && (
                  <div className="flex flex-col gap-10 max-w-[500px] h-full">
                    {sectionData.costInfoSectionsCoreFields?.cols?.right
                      ?.title && (
                      <h2 className="relative text-[20px]  leading-tight md:text-[24px] font-extrabold font-nunito text-left text-[#000E47]">
                        {
                          sectionData.costInfoSectionsCoreFields.cols.right
                            .title
                        }
                      </h2>
                    )}
                    <div className="flex flex-col gap-5">
                      {sectionData.costInfoSectionsCoreFields.cols.right?.list
                        ?.length > 0 &&
                        sectionData.costInfoSectionsCoreFields.cols.right.list.map(
                          (item, index) => {
                            return (
                              <div
                                className="flex items-center gap-4"
                                key={"list_" + index}
                              >
                                <Image
                                  width={24}
                                  height={24}
                                  className="w-6 h-6"
                                  src={
                                    item?.icon?.node?.sourceUrl ||
                                    "http://fenerodemo.local/wp-content/uploads/2026/01/Icon.svg"
                                  }
                                  alt=""
                                />
                                <p className="text-[16px] leading-5 text-[#3C3E47] font-light">
                                  {item.label}
                                </p>
                              </div>
                            );
                          },
                        )}
                    </div>
                  </div>
                )}
              </div>

              <p
                className="relative text-[18px] max-w-225 mx-auto leading-tight font-nunito text-center text-[#000E47] px-6 lg:pt-10 pb-10 lg:pb-20"
                dangerouslySetInnerHTML={{
                  __html: sectionData.costInfoSectionsCoreFields.note,
                }}
              ></p>
            </section>
          );
        })}
    </>
  );
}
