import { createApolloClient } from "@/lib/apolloClient";
import { AWARDS_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";

export async function OurAwards() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: AWARDS_QUERY,
  });

  const sectionData = data.ourAwards.nodes[0].ourAwards;

  if (!sectionData) return null;

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: sectionData.styling.backgroundColor }}
    >
      <div className="relative w-full mx-auto text-white">
        <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14  font-extrabold font-nunito  select-none text-center pt-20 pb-8 text-[#000E47]">
          {sectionData.title}
        </h2>
        <div className="flex justify-center flex-wrap pb-20">
          {sectionData.awards.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-75 rounded-xl h-full overflow-hidden select-none"
            >
              <div className="relative h-auto">
                <div className="flex items-center justify-center pt-8 pb-2 h-auto w-auto">
                  <Image
                    unoptimized
                    src={item.icon.node.sourceUrl}
                    alt={item.icon.node.altText || "No alt text"}
                    width={160}
                    height={160}
                  />
                </div>
                <div className="pb-8 text-center">
                  <h2
                    style={{ color: sectionData.styling.titleColor }}
                    className="text-[16px] font-extrabold font-nunito select-none"
                  >
                    {item.label}
                  </h2>
                  <p
                    style={{ color: sectionData.styling.textColor }}
                    className="font-nunito font-bold text-[16px] leading-6 tracking-[0.15px] select-none px-8 text-[#3C3E47]"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
