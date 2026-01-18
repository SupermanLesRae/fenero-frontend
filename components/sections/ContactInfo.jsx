import { createApolloClient } from "@/lib/apolloClient";
import { CONTACT_INFO_QUERY } from "@/lib/queries/Queries";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

// Server Component
{
  /* Contact Info Banners */
}
export default async function ContactInfo({ section, bgColor }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: CONTACT_INFO_QUERY,
  });

  // Find the first matching node
  const searchText = section.toLowerCase(); // normalize sel

  // Find the first node whose section includes sel
  const matchedNode = data.contactInfoBlocks.nodes.find((node) => {
    const sections = node.contactInfoBlockCoreFields.section; // e.g. ['Home', 'New to Contracting']
    return sections?.some((section) => section.toLowerCase() === searchText);
  });

  // Return solutionComparisonsCoreFields if found
  const result = matchedNode ? matchedNode.contactInfoBlockCoreFields : null;

  const sectionData = result;

  if (!sectionData) return null;

  return (
    <div
      className="relative w-full h-full xl:py-20 xl:px-20"
      style={{ backGroundColor: bgColor || "#ECF8EF" }}
    >
      <div className="relative pb-20 max-w-365 xl:rounded-3xl border-white overflow-hidden mx-auto ">
        <h2
          style={{ color: sectionData.styling.titlecolor }}
          className="relative text-[30px] md:text-[48px] leading-10 md:leading-14 font-extrabold font-nunito select-none text-white text-center pt-20 pb-4 z-11 max-w-250 mx-auto"
        >
          {sectionData.title}
        </h2>
        <p
          dangerouslySetInnerHTML={{ __html: sectionData.description }}
          className="relative font-nunito font-medium text-[20px] text-white text-center leading-7 tracking-[0.15px] select-none px-8 max-w-250 z-10 mx-auto"
        ></p>
        <div className="absolute w-full h-full z-0 left-0 top-0">
          <Image
            unoptimized
            src={sectionData.img.node.sourceUrl}
            alt={sectionData.img.node.altText || "Image"}
            className="w-full h-full object-cover"
            width={1411}
            height={480}
          />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col justify-center mt-10 md:flex-row gap-4 w-full px-10 md:px-0 ">
            {sectionData.ctaLinks.map((cta, index) => (
              <Link key={index} href={cta.link} className="w-auto">
                <Button
                  size="lg"
                  style={{
                    backgroundColor: cta.styling.backgroundcolor,
                    color: cta.styling.textcolor,
                    borderColor:
                      cta.styling.bordercolor || cta.styling.backgroundcolor, // border same as text color
                  }}
                  className="font-bold hover:text-white text-[16px] border-2 lg:w-auto cursor-pointer shadow-md transition hover:opacity-90 flex items-center justify-center gap-2 min-w-56"
                >
                  {cta?.icon?.node.sourceUrl && (
                    <Image
                      unoptimized
                      width={18}
                      height={20}
                      src={cta?.icon?.node.sourceUrl}
                      alt=""
                    />
                  )}
                  {cta.title}
                  {/* Example: Add arrow if you want it, can add property in your data */}
                  {cta.hasArrow && <IconArrowRight stroke={2} />}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
