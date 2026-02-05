import { Button } from "@/components/ui/button";
import { createApolloClient } from "@/lib/apolloClient";
import {
  RECRUITER_POST_BY_SLUG_QUERY,
  ALL_RECRUITER_SLUGS,
} from "@/lib/queries/Queries";
import { IconDownload } from "@tabler/icons-react";
import { IconArrowDown } from "@tabler/icons-react";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // ✅ ISR caching

export async function generateStaticParams() {
  const client = createApolloClient();

  const { data } = await client.query({
    query: ALL_RECRUITER_SLUGS,
    fetchPolicy: "no-cache", // rely on ISR
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
    fetchPolicy: "no-cache", // rely on ISR
  });

  const sectionData = data?.recruiterPostBy?.recruiterPostsCoreFields;
  // const content = data?.recruiterPostBy?.content;

  console.log("sectionData.contentArea:", sectionData.postPageContent);

  if (!sectionData) return null;

  return (
    <div className="">
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
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmAQMAAAADEXYhAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFzu7WkwYvEwAAABhJREFUeJxjZEAGjKO8Ud4ob5Q3yhtAHgAk6QBnmOT1xwAAAABJRU5ErkJggg=="
            alt=""
          />
          <div className="bg-[#000E47] absolute w-full h-full opacity-80"></div>
        </div>
        <div className="px-10 w-full">
          <div className="max-w-282 mx-auto pt-20 pb-20">
            <h2 className="relative text-[30px] md:text-[48px] leading-10 md:leading-14 font-bold font-nunito mb-0 select-none text-[#38BB3F] text-left pt-0 pb-4">
              {sectionData?.title || "Add a Date"}
            </h2>
            <div className="max-w-25 select-none">
              <Link href="/recruiter-resources">
                <Button
                  size="lg"
                  className="bg-transparent border-2 border-white hover:border-[#38BB3F] hover:bg-transparent text-[#ffffff] hover:text-[#38BB3F] cursor-pointer min-w-auto w-auto transition shadow-none z-20 relative"
                >
                  <IconArrowLeft stroke={2} />
                  <span className="font-bold text-[16px]">Back</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`relative w-full max-w-300 mx-auto px-10 pt-10 lg:pt-20 ${
          sectionData?.cta?.link ? "pb-8" : "pb-20"
        }`}
      >
        <div className="w-full">
          {sectionData.postPageContent?.length > 0 ? (
            sectionData.postPageContent.map((block, index) => {
              const hasLeft = block.leftCol && block.leftCol.trim() !== "";
              const hasRight = block.rightCol && block.rightCol.trim() !== "";

              // Skip block if neither column has content
              if (!hasLeft && !hasRight) return null;

              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-10 items-start`}
                >
                  {hasLeft && (
                    <div
                      className={`${hasLeft && hasRight ? "w-full lg:w-1/2" : "w-full"}`}
                    >
                      <div
                        className="policy-content"
                        dangerouslySetInnerHTML={{ __html: block.leftCol }}
                      ></div>
                    </div>
                  )}

                  {hasRight && (
                    <div
                      className={`${hasLeft && hasRight ? "w-full lg:w-1/2" : "w-full"}`}
                    >
                      <div
                        className="policy-content"
                        dangerouslySetInnerHTML={{ __html: block.rightCol }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10">
              <p className="mb-4 text-gray-700 select-none">
                No further information is available at this point.
              </p>

              {sectionData.downloadPDF && (
                <a
                  href={sectionData.downloadPDF}
                  target={
                    sectionData.downloadPDF?.includes(".pdf") ||
                    sectionData.downloadPDF?.includes("http")
                      ? "_blank"
                      : "_self"
                  }
                  rel={
                    sectionData.downloadPDF?.includes(".pdf") ||
                    sectionData.downloadPDF?.includes("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Download PDF
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {sectionData?.cta?.link && (
        <div
          className={`px-10 w-full select-none max-w-300 mx-auto pb-20 ${
            !sectionData.postPageContent?.length ? "flex justify-center" : ""
          }`}
        >
          <div className="max-w-282">
            <div className="w-auto">
              <Link
                href={sectionData?.cta.link}
                target={
                  sectionData?.cta.link?.includes(".pdf") ||
                  sectionData?.cta.link?.includes("http")
                    ? "_blank"
                    : "_self"
                }
                rel={
                  sectionData?.cta.link?.includes(".pdf") ||
                  sectionData?.cta.link?.includes("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <Button
                  size="lg"
                  className="bg-[#AFCE67] border-2 border-[#AFCE67] hover:border-[#AFCE67] hover:bg-[#AFCE67] text-[#000E47] cursor-pointer min-w-auto w-auto transition shadow-none z-20 relative"
                >
                  <span className="font-bold text-[16px]">
                    {sectionData?.cta.label}
                  </span>
                  <IconDownload stroke={3} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
