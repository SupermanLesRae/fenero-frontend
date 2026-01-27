import { createApolloClient } from "@/lib/apolloClient";
import { KNOWLEDGE_QUERY } from "@/lib/queries/Queries";
import { IconCalendarEvent } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export async function KnowledgeHub({ section = "All" } = {}) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: KNOWLEDGE_QUERY,
  });

  const sectionData = data.knowledgeHubBlocks.nodes[0].knowledgeHubCoreBlocks;
  const sectionDataBlocks = data.newsPosts.nodes;

  if (!sectionData) return null;

  // -------------------------------
  // FILTER LOGIC
  // -------------------------------
  const selectedSection = section.toLowerCase();

  const filteredBlocks =
    section === "All"
      ? sectionDataBlocks
      : (() => {
          const matchingSlug = sectionData.slugtotag?.find((slugObj) => {
            return slugObj.slugselect[0]?.toLowerCase() === selectedSection;
          });

          // If no match found, return all posts
          if (!matchingSlug) return sectionDataBlocks;

          // Otherwise filter by tags
          return sectionDataBlocks.filter((post) =>
            post.newsPostsCoreFields.tags.some((tag) =>
              matchingSlug.tags
                .map((t) => t.toLowerCase())
                .includes(tag.toLowerCase()),
            ),
          );
        })();

  // -------------------------------
  // FORMAT DATE
  // -------------------------------
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
    <section className="relative w-full pb-10 lg:pb-20 bg-[#ECF8EF]">
      <div className="max-w-225 mx-auto text-center mb-10 px-6">
        <h2 className="relative text-[36px] leading-12 md:text-[48px] md:leading-14  font-extrabold font-nunito  select-none text-center pt-10 lg:pt-20 pb-10 text-[#000E47]">
          {sectionData.title}
        </h2>
        <p className="font-nunito font-medium text-[16px] leading-6 tracking-[0.15px] select-none px-0">
          {sectionData.description}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-6 max-w-337.5 mx-auto justify-center items-center md:items-stretch">
        {filteredBlocks?.slice(0, 3).map((item, index) => (
          <Link key={"posts_" + index} href={"/knowledge-hub/" + item.slug}>
            <div
              className="flex flex-col bg-white rounded-lg p-0 shadow-md hover:shadow-sm
                      w-full max-w-103.5 mx-auto md:mx-0
                      lg:min-w-103.5 flex-1 h-98 overflow-hidden"
            >
              <div className="relative h-49 overflow-hidden">
                <Image
                  width={414}
                  height={196}
                  className="w-full h-auto"
                  src={item.newsPostsCoreFields.cardImg.node.sourceUrl}
                  alt=""
                />
                <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                  {sectionData.slugtotag
                    .filter((slugObj) => {
                      return (
                        slugObj.slugselect[0].toLowerCase() ===
                        section.toLowerCase()
                      );
                    })
                    .flatMap((slugObj) => slugObj.tags)
                    .filter((tag) =>
                      item.newsPostsCoreFields.tags
                        .map((t) => t.toLowerCase())
                        .includes(tag.toLowerCase()),
                    )
                    .map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-white bg-[#056735] rounded-full px-4 py-2 text-sm font-bold"
                      >
                        {tag}
                      </span>
                    ))}
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
