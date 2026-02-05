import { createApolloClient } from "@/lib/apolloClient";
import { KNOWLEDGE_QUERY } from "@/lib/queries/Queries";
import { IconCalendarEvent } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import LoadMoreClient from "./KnowledgeHubLoadMore";

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

      <LoadMoreClient
        blocks={filteredBlocks}
        sectionData={sectionData}
        section={section}
      />
    </section>
  );
}
