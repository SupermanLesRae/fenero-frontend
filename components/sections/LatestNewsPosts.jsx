import { createApolloClient } from "@/lib/apolloClient";
import { NEWS_POSTS_QUERY } from "@/lib/queries/Queries";
import NewsCard from "../utilities/NewsCard";
import Link from "next/link";

export default async function LatestNewsPosts({ currentSlug }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: NEWS_POSTS_QUERY,
  });

  const sectionData = data?.newsPosts.nodes;
  if (!sectionData) return null;

  const latestPosts = sectionData
    .filter((item) => item?.slug !== currentSlug)
    .slice(0, 3);

  return (
    <div className="relative w-full min-h-100 bg-[#ECF8EF] text-[#000E47] py-20">
      <h2 className="relative text-[36px] md:text-[48px] font-extrabold font-nunito  select-none text-center pb-8">
        Continue reading
      </h2>

      <div className="flex flex-wrap justify-center gap-[30px]">
        {latestPosts.map((item, index) => (
          <div
            key={"latestPost" + index}
            className="flex justify-center"
            style={{ width: "400px" }} // fixed width
          >
            <Link
              href={"/knowledge-hub/" + item.slug}
              className="w-full h-full"
            >
              <NewsCard
                image={item.newsPostsCoreFields.cardImg?.node?.sourceUrl}
                title={item.newsPostsCoreFields.title}
                description={item.newsPostsCoreFields.description}
                date={item.newsPostsCoreFields.date}
                type={"small"}
                className="h-full"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
