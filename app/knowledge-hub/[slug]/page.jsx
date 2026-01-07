import LatestNewsPosts from "@/components/sections/LatestNewsPosts";
import { Button } from "@/components/ui/button";
import { createApolloClient } from "@/lib/apolloClient";
import { NEWS_POST_BY_SLUG_QUERY, ALL_NEWS_SLUGS } from "@/lib/queries/Queries";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function generateStaticParams() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: ALL_NEWS_SLUGS,
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
    <div>
      <div className="bg-[#ECF8EF] ">
        <div className="max-w-[1128px] mx-auto pt-20">
          <Link href="/knowledge-hub">
            <Button
              size="lg"
              className="bg-transparent hover:bg-transparent text-[#38BB3F] hover:text-[#000E47] cursor-pointer w-full lg:w-auto transition shadow-none"
            >
              <IconArrowLeft stroke={2} />
              <span className="font-bold text-[16px]">Knowledge Hub</span>
            </Button>
          </Link>

          <h2 className="relative text-[30px] md:text-[48px] leading-14 font-extrabold font-nunito mb-2 select-none text-[#000E47] text-center pt-8 pb-6">
            {sectionData?.title || "Add a Date"}
          </h2>
          <p
            dangerouslySetInnerHTML={{ __html: sectionData.description }}
            className="font-nunito font-medium text-[28px] leading-6 tracking-[0.15px] text-[#000E47] text-center select-none px-8 pb-8"
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
            <div className="text-center pb-[250px]">
              {/* Date */}
              <p className="text-[#000E47] text-sm ">{formattedDate}</p>
            </div>
          )}
        </div>
      </div>
      {sectionData?.featureImg.node.sourceUrl && (
        <div className="bg-white">
          <div className="relative h-[440px] max-w-[1128px] text-center mx-auto w-full rounded-xl">
            <Image
              className="object-cover w-full h-[440px] max-w-[1128px] absolute -mt-[220px] rounded-xl shadow-lg border-10 border-white"
              src={sectionData.featureImg.node.sourceUrl}
              alt=""
              width={1108}
              height={420}
            />
          </div>
        </div>
      )}
      <div
        className="policy-content max-w-[1128px] mx-auto py-10 bg-white -mt-[220px]"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <LatestNewsPosts currentSlug={slug} />
    </div>
  );
}
