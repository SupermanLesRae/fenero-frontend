import { createApolloClient } from "@/lib/apolloClient";
import { NEXT_STEPS_QUERY } from "@/lib/queries/Queries";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";

export async function NextSteps({ sel, multiple }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: NEXT_STEPS_QUERY,
  });

  const sectionData = data.nextSteps.nodes[0].nextStepsCoreFields;
  console.log("NextSteps: ", sectionData);

  if (!sectionData) return null;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute left-0 right-0 z-0 w-full h-full">
        <Image
          unoptimized
          width={1728}
          height={738}
          className="object-cover w-full h-full"
          src={sectionData.background.node.sourceUrl}
          alt=""
        />
      </div>

      <div className="relative z-10 pb-20 text-white">
        <div>
          <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14 font-extrabold font-nunito select-none text-center pt-20 pb-4 ">
            {sectionData.title}
          </h2>
          <p className="font-nunito font-medium text-[16px] leading-6 tracking-[0.15px] select-none px-8 text-center pb-14">
            {sectionData.descrption}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 px-10 max-w-87.5 md:max-w-362.5 ] mx-auto select-none">
          {sectionData?.steps?.map((item, index) => {
            const isLast = index === sectionData.steps.length - 1;

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center md:items-stretch gap-4"
              >
                {index !== 0 && (
                  <ArrowRight className="hidden md:block self-center shrink-0" />
                )}

                {/* CARD */}
                <div className="flex flex-col  items-center w-83 min-h-65 bg-white rounded-lg py-6 shadow-sm">
                  <Image
                    unoptimized
                    width={270}
                    height={260}
                    src={item.icon.node.sourceUrl}
                    className="w-25 h-25 mb-4"
                    alt={item.label || ""}
                  />
                  <h3
                    style={{ color: item.color }}
                    className="text-[40px] font-extrabold text-center uppercase"
                  >
                    {item.title}
                  </h3>
                  <p className="font-nunito font-medium text-[18px] leading-6 tracking-[0.15px] select-none px-6 text-center text-[#3C3E47]">
                    {item.description}
                  </p>
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
      </div>
    </section>
  );
}
