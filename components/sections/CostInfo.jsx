import { createApolloClient } from "@/lib/apolloClient";
import { COST_INFO_SECTION } from "@/lib/queries/Queries";
import Image from "next/image";

export async function CostInfo() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: COST_INFO_SECTION,
  });

  const nodes = data.costInfoSections.nodes ?? [];

  console.log("cost_info_section", nodes);

  if (!nodes) return null;

  return (
    <>
      {nodes.map((sectionData, sectionIndex) => {
        console.log(
          "ImageTextSections: ",
          sectionData.imageTextSectionsCoreFields
        );

        return (
          <section key={sectionIndex} className="relative w-full bg-[#ECF8EF]">
            <div className="px-10">
              {/* TITLE */}
              <h2 className="relative text-[36px] max-w-225 mx-auto leading-tight md:text-[48px] font-extrabold font-nunito text-center text-[#000E47] pt-20 pb-16">
                {sectionData.costInfoSectionsCoreFields.title}
              </h2>
            </div>

            {/* CONTENT */}
            <div
              className={`flex flex-col md:flex-row items-center md:items-start gap-10 px-10 pb-10 w-full max-w-337.5 relative mx-auto justify-center `}
            >
              {/*  */}
              <div className="flex flex-col gap-4  bg-[#036735] max-w-xl text-white p-10 rounded-xl ">
                <p className="relative text-[18px] leading-tight font-nunito text-left  ">
                  {sectionData.costInfoSectionsCoreFields.cols.leftCol.title}
                </p>
                <p className="relative text-[24px]  leading-tight md:text-[26px] font-extrabold font-nunito text-left  ">
                  {sectionData.costInfoSectionsCoreFields.cols.leftCol.price}
                </p>
                <p className="relative text-[18px] leading-tight font-nunito text-left">
                  <i>
                    {sectionData.costInfoSectionsCoreFields.cols.leftCol.note}
                  </i>
                </p>
              </div>

              {/*  */}
              <div className="flex flex-col gap-10 ">
                <h2 className="relative text-[20px]  leading-tight md:text-[24px] font-extrabold font-nunito text-left text-[#000E47]">
                  {sectionData.costInfoSectionsCoreFields.cols.rightCol.title}
                </h2>
                <div className="flex flex-col gap-5">
                  {sectionData.costInfoSectionsCoreFields.cols.rightCol.list.map(
                    (item, index) => {
                      return (
                        <div
                          className="flex items-center gap-4"
                          key={"list_" + index}
                        >
                          <img
                            width={24}
                            height={24}
                            className="w-6 h-6"
                            src={item.icon.node.sourceUrl}
                            alt=""
                          />
                          <p className="text-[16px] leading-5 text-[#3C3E47] font-light">
                            {item.label}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <h2
              className="relative text-[18px] max-w-225 mx-auto leading-tight font-nunito text-center text-[#000E47] pt-10 pb-20"
              dangerouslySetInnerHTML={{
                __html: sectionData.costInfoSectionsCoreFields.note,
              }}
            ></h2>
          </section>
        );
      })}
    </>
  );
}
