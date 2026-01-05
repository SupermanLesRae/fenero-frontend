import { createApolloClient } from "@/lib/apolloClient";
import { BANNERS_QUERY } from "@/lib/queries/Queries";

export async function Banners({ sel }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: BANNERS_QUERY,
  });

  const sectionData = data.banners.nodes[sel].bannerCoreFields;

  if (!sectionData) return null;

  return (
    <section
      style={{ backgroundColor: sectionData.styling.backgroundColor }}
      className="relative w-full pb-20"
    >
      <div className="max-w-[1400px] mx-auto text-center">
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
