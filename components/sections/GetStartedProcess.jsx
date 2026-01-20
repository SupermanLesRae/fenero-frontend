import { createApolloClient } from "@/lib/apolloClient";
import { PROCESSES_INFO_QUERY } from "@/lib/queries/Queries";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";

{
  /* Get Started Steps */
}
export async function GetStartedProcess({ section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: PROCESSES_INFO_QUERY,
  });

  const searchText = section.toLowerCase(); // normalize sel

  // Get all nodes whose section includes sel
  const matchedNodes = data.getStartedSteps.nodes.filter((node) => {
    const sections = node.getStartedStepsCoreFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  // Extract only getStartedStepsCoreFields from matched nodes
  const results = matchedNodes.map((node) => node.getStartedStepsCoreFields);

  if (!results || results[0] === undefined) return null;

  return (
    <div className={` bg-[#ECF8EF] ${results.length === 0 && " pb-20"}`}>
      {results.map((sectionData, sectionIndex) => (
        <section key={sectionIndex} className="relative w-full pb-10 lg:pb-0">
          <h2
            className={`relative text-[36px] px-6 leading-10 md:text-[48px] md:leading-14 pb-10 lg:pb-14 font-extrabold font-nunito select-none text-center  
               text-[#000E47] ${sectionIndex === 0 && "pt-10 lg:pt-20"}`}
          >
            {sectionData.title}
          </h2>

          <div
            className={`flex flex-wrap justify-center gap-4 px-10 max-w-87.5 md:max-w-362.5 mx-auto select-none`}
          >
            {sectionData?.process?.map((item, index) => {
              const isLast = index === sectionData.process.length - 1;

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-stretch gap-4"
                >
                  {index !== 0 && (
                    <ArrowRight className="hidden md:block self-center shrink-0 text-[#036735]" />
                  )}

                  {/* CARD */}
                  <div className="flex flex-col justify-center items-center w-67.5 min-h-65 bg-white border border-[#AFCE67] rounded-lg p-6 shadow-sm">
                    <Image
                      src={item.icon.node.sourceUrl}
                      className="w-25 h-25 mb-4"
                      alt={item.label}
                      width={100}
                      height={100}
                    />
                    <h3 className="text-lg font-semibold text-center">
                      {item.label}
                    </h3>
                  </div>

                  {isLast && (
                    <ArrowRight className="hidden md:block self-center shrink-0 opacity-0 text-[#036735]" />
                  )}

                  {/* MOBILE ARROW */}
                  {!isLast && (
                    <ArrowDown className="block md:hidden mt-2 shrink-0 text-[#036735]" />
                  )}
                </div>
              );
            })}
          </div>

          {sectionData?.notes && (
            <p
              className="relative text-[16px] leading-12 md:text-[16px] md:leading-14  font-nunito select-none text-center pt-10 pb-14 text-[#3C3E47]"
              dangerouslySetInnerHTML={{ __html: sectionData.notes }}
            ></p>
          )}
        </section>
      ))}
    </div>
  );
}
