import { createApolloClient } from "@/lib/apolloClient";
import { FOUNDERS_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";

export async function Founder() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: FOUNDERS_QUERY,
  });

  const sectionData = data.founders.nodes[0].foundersCoreFields;

  if (!sectionData) return null;

  return (
    <section className="bg-[#ECF8EF]">
      <div className="relative w-full py-10 lg:py-28 px-6 max-w-325 mx-auto select-none">
        <div className="flex flex-col xl:flex-row items-center gap-14">
          {/* Left Image */}
          <div className="relative w-full flex justify-center">
            <Image
              src={sectionData.img.node.sourceUrl}
              alt={
                sectionData.img.node.altText || "No alternative text provided"
              }
              width={678}
              height={521}
            />
          </div>

          {/* Right Text */}
          <div className="w-full flex flex-col gap-4 text-center xl:text-left">
            <h2 className="text-[36px] leading-10 md:leading-12 md:text-[44px] font-extrabold text-[#000E47]">
              {sectionData.title}
            </h2>

            <div
              className="mb-4 text-[18px] md:text-[24px] leading-6 md:leading-8 font-semibold flex flex-col gap-4 w-[90%] max-w-150 mx-auto xl:mx-0 text-[#056735]"
              dangerouslySetInnerHTML={{ __html: sectionData.description }}
            />

            <div className="flex flex-col gap-2 text-[#056735]">
              <p className="text-[24px] leading-6 md:text-[32px] md:leading-8 font-black">
                {sectionData.about.name}
              </p>
              <p className="text-[24px] leading-6 md:text-[32px] md:leading-8 font-semibold">
                {sectionData.about.position}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
