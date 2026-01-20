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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white max-w-350 mx-auto px-10">
        {sectionData?.communities?.map((community, index) => (
          <div key={index} className="max-w-115.25 mx-auto">
            <Image
              unoptimized
              width={461}
              height={461}
              src={community.img.node.sourceUrl}
              alt=""
            />
            <h3 className="text-[40px] font-bold mt-10 leading-11.25">
              {community.label}
            </h3>

            <p
              className="text-[20px] leading-7 pt-2 pb-6"
              dangerouslySetInnerHTML={{ __html: community.description }}
            ></p>

            <Link
              href={community.link}
              className="text-[16px] md:text-[20px] leading-6 md:leading-6 tracking-[0.15px] text-[#C5D320]"
            >
              {formatLinkText(community.link)}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
