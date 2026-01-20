import { createApolloClient } from "@/lib/apolloClient";
import { VALUES_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";

export async function OurValues() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: VALUES_QUERY,
  });

  const sectionData = data.ourValues.nodes[0].ourValuesCoreFields;

  if (!sectionData) return null;

  return (
    <section
      className="relative w-full  m-0"
      style={{ backgroundColor: sectionData.styling.backgroundColor }}
    >
      <div className="relative w-full mx-auto text-white">
        <h2
          style={{ color: sectionData.styling.textColor }}
          className="relative text-[36px] md:text-[48px] font-extrabold font-nunito  select-none text-center pt-10 lg:pt-20 pb-8"
        >
          {sectionData.title}
        </h2>
        <div className="flex justify-center flex-wrap pb-10 lg:pb-20">
          {sectionData.valuesList.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center w-75 rounded-xl h-full overflow-hidden select-none"
            >
              <div className="relative h-auto">
                <div className="flex items-center justify-center pt-8 pb-6 h-auto w-auto">
                  <Image
                    unoptimized
                    src={item.icon.node.sourceUrl}
                    alt={item.icon.node.altText || "No alt text"}
                    width={160}
                    height={160}
                  />
                </div>
                <div className="pb-8 text-center">
                  <h2 className="text-[20px] font-bold font-nunito pb-2 select-none">
                    {item.label}
                  </h2>
                  <p className="font-nunito font-medium text-[16px] leading-6 tracking-[0.15px] select-none px-0">
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
