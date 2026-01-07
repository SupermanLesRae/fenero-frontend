import Link from "next/link";
import { Button } from "../ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { createApolloClient } from "@/lib/apolloClient";
import { SOCIAL_IMPACT_QUERY } from "@/lib/queries/Queries";
import Image from "next/image";

export async function SocialImpact() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: SOCIAL_IMPACT_QUERY,
  });

  const sectionData = data.ourSocialImpacts.nodes[0].ourSocialImageCoreFields;

  if (!sectionData) return null;

  return (
    <section style={{ backgroundColor: sectionData.styling.backgroundColor }}>
      <div className="relative w-full py-28 px-10 max-w-[1300px] mx-auto select-none">
        <div className="flex flex-col xl:flex-row items-center gap-14">
          {/* Left Image */}
          <div className="relative w-full flex justify-center">
            <Image
              src={sectionData.img.node.sourceUrl}
              alt={
                sectionData.img.node.altText || "No alternative text provided"
              }
              width={678}
              height={521}
            />
          </div>

          {/* Right Text */}
          <div className="w-full flex flex-col gap-4 text-center xl:text-left">
            <h2
              className="text-[36px] leading-12 md:text-[48px] md:leading-14 font-extrabold"
              style={{ color: sectionData.styling.titleColor }}
            >
              {sectionData.title}
            </h2>

            <div
              className="mb-4 text-[18px] leading-6 font-semibold flex flex-col gap-4 w-[90%] max-w-[600px] mx-auto xl:mx-0"
              style={{ color: sectionData.styling.textColor }}
              dangerouslySetInnerHTML={{ __html: sectionData.description }}
            />

            <div
              style={{ color: sectionData.styling.textColor }}
              className="flex flex-col gap-2"
            >
              <Link className="w-full" href="#">
                <Button
                  style={{
                    color: sectionData.styling.ctaColor,
                    backgroundColor: sectionData.styling.backgroundColor,
                    border: `2px solid ${sectionData.styling.textColor}`,
                  }}
                  size="lg"
                  className={`cursor-pointer w-full lg:w-auto transition shadow-md shadow-[#AFCE67]/30 hover:shadow-[#AFCE67]/10`}
                >
                  <span className=" font-bold text-[16px]">
                    {sectionData.cta.label}
                  </span>

                  <IconArrowRight stroke={2} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
