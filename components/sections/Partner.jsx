import { createApolloClient } from "@/lib/apolloClient";
import { PARTNER_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";

export async function Partner({ section }) {
  const client = createApolloClient();

  // Fetch the data
  const { data } = await client.query({
    query: PARTNER_QUERY,
  });

  const searchText = section.toLowerCase(); // normalize sel

  // Find the first node whose section includes sel
  const matchedNode = data.partnerWithUsSections.nodes.find((node) => {
    const sections = node.partnerWithUsCoreFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  const result = matchedNode ? matchedNode.partnerWithUsCoreFields : null;

  const sectionData = result;

  // Return null if nothing found
  if (!sectionData) return null;

  return (
    <section className="relative w-full  ">
      <div className="relative w-full mx-auto">
        <div className="absolute w-full h-full z-0">
          <Image
            src={sectionData.img.node.sourceUrl}
            alt={"No alt text"}
            className="w-full h-full object-cover"
            width={1571}
            height={738}
          />
          <div className="absolute top-0 left-0 bg-[#036735] w-full h-full inset-0 mix-blend-multiply " />
        </div>
        <h2 className="relative text-[30px] md:text-[48px] font-extrabold font-nunito mb-2 select-none text-white text-center pt-14 pb-14 px-6">
          {sectionData.title}
        </h2>
        <div className="flex justify-center flex-wrap gap-10 pb-10 lg:pb-24 px-6">
          {sectionData.cards.map((item, index) => (
            <div
              key={index}
              className="relative flex w-90.5 sm:h-112.5 rounded-xl shadow-md shadow-[#000000]/10 h-full bg-white overflow-hidden select-none p-2"
            >
              <div className="relative h-auto">
                <div className="flex items-center justify-center pt-8 pb-8 h-auto w-auto">
                  <Image
                    src={item.icon.node.sourceUrl}
                    alt={"No alt text"}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="pb-8 px-8 text-center">
                  <h2
                    className="text-[20px] font-bold font-nunito mb-2 select-none pb-6"
                    style={{ color: item.titleColor }}
                  >
                    {item.title}
                  </h2>
                  <p className="font-nunito font-medium text-[15px] leading-6 tracking-[0.15px] select-none">
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
