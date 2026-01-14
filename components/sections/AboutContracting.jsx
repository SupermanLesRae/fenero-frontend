import { createApolloClient } from "@/lib/apolloClient";
import { CONTACTING_INFO_QUERY } from "@/lib/queries/Queries";

export async function AboutContracting({ sel, multiple }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: CONTACTING_INFO_QUERY,
  });

  const nodes = data?.allMoreAboutContracting?.nodes || [];

  // 👉 Normalize sel to an array
  const selectedIndexes = multiple ? sel : [sel];

  // 👉 Collect matching section data
  const sections = selectedIndexes
    .map((index) => nodes[index]?.aboutContractingFields)
    .filter(Boolean);

  if (!sections.length) return null;

  return (
    <div className="pb-20 bg-[#ECF8EF]">
      {sections.map((sectionData, sectionIndex) => (
        <section key={sectionIndex} className={`relative w-full `}>
          <h2 className="relative text-[36px] max-w-225 mx-auto leading-12 md:text-[48px] md:leading-14 font-extrabold font-nunito select-none text-center pt-20 pb-10 text-[#000E47]">
            {sectionData.title}
          </h2>

          <div className="flex flex-wrap gap-6 px-10 max-w-337.5 mx-auto justify-center">
            {sectionData?.card?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-lg p-6 shadow-sm min-w-62.5 max-w-75 flex-1"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p
                  className="text-gray-600 mt-2"
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
