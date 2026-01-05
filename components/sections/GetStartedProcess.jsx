import { createApolloClient } from "@/lib/apolloClient";
import { PROCESSES_INFO_QUERY } from "@/lib/queries/Queries";
import { ArrowDown, ArrowRight } from "lucide-react";

export async function GetStartedProcess({ sel, multiple }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: PROCESSES_INFO_QUERY,
  });

  const nodes = data?.getStartedSteps?.nodes || [];

  // 👉 Normalize sel to array
  const selectedIndexes = multiple ? sel : [sel];

  // 👉 Collect selected sections
  const sections = selectedIndexes
    .map((index) => nodes[index]?.getStartedStepsCoreFields)
    .filter(Boolean);

  if (!sections.length) return null;

  return (
    <div className="pb-20 bg-[#ECF8EF]">
      {sections.map((sectionData, sectionIndex) => (
        <section key={sectionIndex} className="relative w-full">
          <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14 font-extrabold font-nunito select-none text-center pt-20 pb-10 text-[#000E47]">
            {sectionData.title}
          </h2>

          <div className="flex flex-wrap justify-center gap-4 px-10 max-w-[350px] md:max-w-[1450px] mx-auto select-none">
            {sectionData?.process?.map((item, index) => {
              const isLast = index === sectionData.process.length - 1;

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-stretch gap-4"
                >
                  {index !== 0 && (
                    <ArrowRight className="hidden md:block self-center shrink-0" />
                  )}

                  {/* CARD */}
                  <div className="flex flex-col justify-center items-center w-[270px] min-h-[260px] bg-white rounded-lg p-6 shadow-sm">
                    <img
                      src={item.icon.node.sourceUrl}
                      className="w-[100px] h-[100px] mb-4"
                      alt={item.label}
                    />
                    <h3 className="text-lg font-semibold text-center">
                      {item.label}
                    </h3>
                  </div>

                  {isLast && (
                    <ArrowRight className="hidden md:block self-center shrink-0 opacity-0" />
                  )}

                  {/* MOBILE ARROW */}
                  {!isLast && (
                    <ArrowDown className="block md:hidden mt-2 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
