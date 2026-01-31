import LatestNewsPosts from "@/components/sections/LatestNewsPosts";
import { Button } from "@/components/ui/button";
import { createApolloClient } from "@/lib/apolloClient";
import { NEWS_POST_BY_SLUG_QUERY, ALL_NEWS_SLUGS } from "@/lib/queries/Queries";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // ✅ ISR caching

export async function generateStaticParams() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: ALL_NEWS_SLUGS,
    fetchPolicy: "no-cache", // rely on ISR
  });

  return data.newsPosts.nodes.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const client = createApolloClient();
  const { data } = await client.query({
    query: NEWS_POST_BY_SLUG_QUERY,
    variables: { slug },
    fetchPolicy: "no-cache", // rely on ISR
  });

  const sectionData = data.newsPostBy.newsPostsCoreFields;
  const content = data.newsPostBy.content;
  const dateObj = sectionData.date ? new Date(sectionData.date) : null;
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  if (!sectionData) return null;

  return (
    <div className="">
      <div className="bg-[#ECF8EF] ">
        <div className="max-w-[1128px] mx-auto pt-10 lg:pt-20 px-4 lg:px-10">
          <Link href="/knowledge-hub">
            <Button
              size="lg"
              className="bg-transparent hover:bg-transparent text-[#38BB3F] hover:text-[#000E47] cursor-pointer w-full lg:w-auto transition shadow-none"
            >
              <IconArrowLeft stroke={2} />
              <span className="font-bold text-[16px]">Knowledge Hub</span>
            </Button>
          </Link>

          <h2 className="relative text-[30px] md:text-[48px] leading-9 lg:leading-12 font-extrabold font-nunito mb-2 select-none text-[#000E47] text-center pt-8 pb-6">
            {sectionData?.title || "Add a Date"}
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: sectionData.description }}
            className="font-nunito font-medium text-[18px] lg:text-[28px] leading-6 lg:leading-8 tracking-[0.15px] text-[#000E47] text-center select-none pb-8"
          ></p>

          {/* Tags */}
          {sectionData?.tags && (
            <div className="flex flex-wrap justify-center gap-2 pb-6">
              {sectionData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#6B0071] text-white text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {sectionData?.date && (
            <div className="text-center pb-43 md:pb-87.5">
              {/* Date */}
              <p className="text-[#000E47] text-sm ">{formattedDate}</p>
            </div>
          )}
        </div>
      </div>
      {sectionData?.featureImg.node.sourceUrl && (
        <div className="bg-white px-6 lg:px-0">
          <div className="relative h-75 md:h-150 max-w-150 text-center mx-auto w-full rounded-xl justify-center">
            <Image
              className="object-cover w-full h-75 md:h-150 max-w-150 absolute -mt-38 md:-mt-75 rounded-xl shadow-lg border-10 border-white "
              src={sectionData.featureImg.node.sourceUrl}
              alt=""
              width={600}
              height={600}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmAQMAAAADEXYhAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFzu7WkwYvEwAAABhJREFUeJxjZEAGjKO8Ud4ob5Q3yhtAHgAk6QBnmOT1xwAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      )}
      <div
        className="policy-content max-w-282 mx-auto py-10 bg-white -mt-35 md:-mt-70 px-6"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <LatestNewsPosts currentSlug={slug} />
    </div>
  );
}
