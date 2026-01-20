import { createApolloClient } from "@/lib/apolloClient";
import { CONTACTING_INFO_QUERY } from "@/lib/queries/Queries";

{
  /* More About contracting */
}
export async function AboutContracting({ section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: CONTACTING_INFO_QUERY,
  });

  const searchText = section.toLowerCase(); // normalize sel

  // Get all nodes whose section includes sel
  const matchedNodes = data.allMoreAboutContracting.nodes.filter((node) => {
    const sections = node.aboutContractingFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  // Extract only getStartedStepsCoreFields from matched nodes
  const results = matchedNodes.map((node) => node.aboutContractingFields);

  if (!results[0] || results.length > 0) return null;

  return (
    <div className="pb-20 bg-[#ECF8EF] h-auto">
      {results.map((sectionData, sectionIndex) => (
        <section key={sectionIndex} className="relative w-full px-10">
          <h2 className="relative text-[36px] md:text-[48px] leading-12 md:leading-14 font-extrabold font-nunito select-none text-center pt-20 pb-10 text-[#000E47]">
            {sectionData.title}
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6 justify-center w-full">
            {sectionData?.card?.map((item, index) => (
              <div
                key={index}
                className="w-full sm:w-[48%] lg:w-[23%] bg-white rounded-xl p-6 sm:p-8 shadow-sm"
              >
                <h3 className="text-[20px] sm:text-[24px] font-semibold">
                  {item.title}
                </h3>

                <p
                  className="text-gray-600 mt-2 text-[14px] sm:text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html: item.description,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
