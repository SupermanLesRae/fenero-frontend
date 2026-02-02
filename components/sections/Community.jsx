import { createApolloClient } from "@/lib/apolloClient";
import { COMMUNITY_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";
import Link from "next/link";

export async function Community() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: COMMUNITY_QUERY,
  });

  const sectionData = data.communities.nodes[0].communityCoreFields;

  const formatLinkText = (url) => {
    return url
      .replace(/^https?:\/\//, "") // remove http:// or https://
      .replace(/\//g, ""); // remove all /
  };

  if (!sectionData) return null;
  return (
    <section
      className="text-white pb-10 lg:pb-20 select-none"
      style={{ backgroundColor: sectionData.styling.backgroundColor }}
    >
      <div className="flex w-full">
        <div className="relative flex flex-row xl:items-center select-none mx-auto pb-10 lg:pb-20">
          <div className="w-full text-center">
            <h2 className="mb-0 text-[40px] leading-12 md:text-[48px] md:leading-13 tracking-[0.15px] font-bold pt-10 lg:pt-20 pb-0">
              {sectionData.title}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 text-white px-6 sm:px-10">
        {sectionData?.communities?.map((community, index) => (
          <div
            key={index}
            className="w-full sm:w-[60%] lg:w-[30%] max-w-[424px] flex flex-col items-center "
          >
            {/* Image wrapper */}
            <div className="w-full rounded-[20] aspect-square overflow-hidden relative">
              <Image
                src={community.img.node.sourceUrl}
                alt=""
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-[24px] lg:text-[30px] font-bold mt-4 lg:mt-10 leading-8 lg:leading-11.25 text-center">
              {community.label}
            </h3>

            <p
              className="text-[16px] lg:text-[20px] leading-6 lg:leading-7 pt-2 pb-6 text-center"
              dangerouslySetInnerHTML={{ __html: community.description }}
            />

            <Link
              href={community.link}
              className="text-[16px] lg:text-[20px] leading-6 md:leading-6 tracking-[0.15px] text-[#C5D320]"
            >
              {formatLinkText(community.link)}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
