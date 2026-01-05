import { createApolloClient } from "@/lib/apolloClient";
import { IMPORTANT_DETAILS_QUERY } from "@/lib/queries/Queries";

export async function ImportantDetails({ sel, multiple }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: IMPORTANT_DETAILS_QUERY,
  });

  const sectionData = data.importantDetails.nodes[0].importantDetailsCoreFields;

  console.log("sectionData: ", sectionData);

  if (!sectionData) return null;

  return (
    <section className="relative w-full py-20 xl:py-0 px-10">
      <h2 className="relative text-[36px] max-w-[1200px] mx-auto leading-12 md:text-[48px] md:leading-14 font-extrabold font-nunito select-none text-center pt-0 pb-10 text-[#000E47]">
        {sectionData.title}
      </h2>

      <div className="flex flex-wrap justify-center gap-5 max-w-[1200px] mx-auto">
        {sectionData?.details?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border border-[#AFCE67] items-center gap-2 rounded-lg p-6 shadow-sm select-none w-full max-w-[360px]"
          >
            <div className="w-[100px] h-[100px]">
              <img src={item.icon.node.sourceUrl} alt="" />
            </div>

            <h3 className="leading-6 font-semibold text-[#036735] text-center">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
      <p
        className="text-[#3C3E47] text-[16px] pt-10 pb-20 text-center"
        dangerouslySetInnerHTML={{
          __html: sectionData.note,
        }}
      />
    </section>
  );
}
