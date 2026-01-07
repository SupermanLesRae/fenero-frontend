import { createApolloClient } from "@/lib/apolloClient";
import { KNOWLEDGE_QUERY } from "@/lib/queries/Queries";
import { IconCalendarEvent } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export async function KnowledgeHub() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: KNOWLEDGE_QUERY,
  });

  const sectionData = data.knowledgeHubBlocks.nodes[0].knowledgeHubCoreBlocks;
  const sectionDataBlocks = data.newsPosts.nodes;

  if (!sectionData) return null;

  function formatDate(date) {
    if (!date) return "";

    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) return "";

    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <section className="relative w-full pb-20 bg-[#ECF8EF]">
      <div className="max-w-[900px] mx-auto text-center mb-10">
        <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14  font-extrabold font-nunito  select-none text-center pt-20 pb-10 text-[#000E47]">
          {sectionData.title}
        </h2>
        <p className="font-nunito font-medium text-[16px] leading-6 tracking-[0.15px] select-none px-8">
          {sectionData.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-6 px-10 max-w-[1350px] mx-auto justify-center">
        {sectionDataBlocks?.map((item, index) => (
          <Link key={"posts_" + index} href={"/knowledge-hub/" + item.slug}>
            <div className="flex flex-col bg-white rounded-lg p-0 shadow-md hover:shadow-sm min-w-[414px] max-w-[414px] flex-1 h-[392px] overflow-hidden">
              <div className="relative w-[414px] h-[196px] overflow-hidden">
                <Image
                  width={414}
                  height={196}
                  className="w-full h-auto"
                  src={item.newsPostsCoreFields.cardImg.node.sourceUrl}
                  alt=""
                />
                <div className="flex items-center justify-center text-white bg-[#056735] rounded-full px-4 py-2 absolute w-[128px] h-[28px] top-8 left-8">
                  Regulation
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">
                  {item.newsPostsCoreFields.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  {item.newsPostsCoreFields.description}
                </p>
                <p className="text-gray-400 text-sm mt-4 flex gap-2 items-center">
                  <IconCalendarEvent size={20} stroke={1} />
                  {formatDate(item.newsPostsCoreFields.date)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
