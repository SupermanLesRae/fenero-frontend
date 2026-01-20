import { Button } from "@/components/ui/button";
import { createApolloClient } from "@/lib/apolloClient";
import {
  RECRUITER_POST_BY_SLUG_QUERY,
  ALL_RECRUITER_SLUGS,
} from "@/lib/queries/Queries";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // ✅ ISR caching

export async function generateStaticParams() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: ALL_RECRUITER_SLUGS,
  });

  return data.recruiterPosts.nodes.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }) {
  const { slug } = await params;
  const client = createApolloClient();
  const { data } = await client.query({
    query: RECRUITER_POST_BY_SLUG_QUERY,
    variables: { slug },
  });

  const sectionData = data.recruiterPostBy.recruiterPostsCoreFields;
  const content = data.recruiterPostBy.content;

  if (!sectionData) return null;

  return (
    <div className="pb-20">
      <div className="bg-[#ECF8EF] relative overflow-hidden">
        <div>
          <Image
            width={1200}
            height={1200}
            src={sectionData.img.node.sourceUrl}
            className="absolute
                      right-0
                      top-1/2
                      -translate-y-1/2
                      object-cover
                      h-auto
                      w-full"
            placeholder="blur"
            blurDataURL="/images/blur_2.jpg"
            alt=""
          />
          <div className="bg-[#000E47] absolute w-full h-full opacity-80"></div>
        </div>
        <div className="px-10 w-full">
          <div className="max-w-282 mx-auto pt-20 pb-20">
            <h2 className="relative text-[30px] md:text-[48px] leading-10 md:leading-14 font-bold font-nunito mb-0 select-none text-[#38BB3F] text-left pt-0 pb-4">
              {sectionData?.title || "Add a Date"}
            </h2>
            <div className="max-w-25">
              <Link href="/recruiter-resources">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-white hover:bg-transparent text-[#ffffff] hover:text-[#38BB3F] cursor-pointer w-full lg:w-auto transition shadow-none z-20 relative"
                >
                  <IconArrowLeft stroke={2} />
                  <span className="font-bold text-[16px]">Back</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-300 mx-auto pt-10 px-10">
        <div
          className="relative policy-content max-w-282 mx-auto py-10 bg-white px-0"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div>
          <Link href={sectionData.cta.link}>
            <Button
              size="lg"
              className="relative bg-[#AFCE67] px-10 hover:bg-[#D1DF20] text-[#000E47] hover:text-[#000E47] cursor-pointer w-full lg:w-auto transition shadow-none z-20 select-none"
            >
              <IconArrowLeft stroke={2} />
              <span className="font-bold text-[16px]">
                {sectionData.cta.label}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
