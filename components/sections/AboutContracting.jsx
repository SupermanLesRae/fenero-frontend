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

  if (!results) return null;

  return (
    <div className="pb-20 bg-[#ECF8EF]">
      {results.map((sectionData, sectionIndex) => (
        <section key={sectionIndex} className={`relative w-full `}>
          <h2 className="relative text-[36px] max-w-225 mx-auto leading-12 md:text-[48px] md:leading-14 font-extrabold font-nunito select-none text-center pt-20 pb-10 text-[#000E47]">
            {sectionData.title}
          </h2>

          <div className="flex flex-wrap gap-6 px-10 max-w-full mx-auto justify-center">
            {sectionData?.card?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-xl p-8 shadow-sm min-w-[445px] max-w-75 min-h-[257px] flex-1"
              >
                <h3 className="text-[24px] font-semibold">{item.title}</h3>
                <p
                  className="text-gray-600 mt-2 text-[16px]"
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
