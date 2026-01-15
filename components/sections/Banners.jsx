import { createApolloClient } from "@/lib/apolloClient";
import { BANNERS_QUERY } from "@/lib/queries/Queries";

{
  /* Banners */
}
export async function Banners({ section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: BANNERS_QUERY,
  });

  // Find the first matching node
  const searchText = section.toLowerCase(); // normalize sel

  // Find the first node whose section includes sel
  const matchedNode = data.banners.nodes.find((node) => {
    const sections = node.bannerCoreFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  // Return solutionComparisonsCoreFields if found
  const result = matchedNode ? matchedNode.bannerCoreFields : null;

  const sectionData = result;

  if (!sectionData) return null;

  return (
    <section
      style={{ backgroundColor: sectionData.styling.backgroundColor }}
      className="relative w-full pb-20"
    >
      <div className="max-w-350 mx-auto text-center">
        <h2
          style={{ color: sectionData.styling.titleColor }}
          className="relative text-[36px] leading-12 md:text-[48px] md:leading-14  font-extrabold font-nunito  select-none text-center pt-20 pb-10 text-[#000E47]"
        >
          {sectionData.title}
        </h2>
        <p
          style={{ color: sectionData.styling.textColor }}
          className="text-gray-600 mt-2"
          dangerouslySetInnerHTML={{ __html: sectionData.description }}
        ></p>
      </div>
    </section>
  );
}
