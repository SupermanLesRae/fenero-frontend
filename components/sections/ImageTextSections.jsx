import { createApolloClient } from "@/lib/apolloClient";
import { IMAGE_TEXT_SECTION } from "@/lib/queries/Queries";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export async function ImageTextSections({ section }) {
  const client = createApolloClient();
  const { data } = await client.query({
    query: IMAGE_TEXT_SECTION,
  });

  const searchText = section.toLowerCase(); // "umbrella paye"

  const nodes = data?.imageTextSections?.nodes ?? [];

  const query = searchText.trim().toLowerCase();

  const filtered = nodes.filter((sectionData) =>
    sectionData.imageTextSectionsCoreFields.section?.some((section) =>
      section.toLowerCase().includes(query),
    ),
  );

  console.log("filtered", query, nodes);

  if (!nodes) return null;

  return (
    <>
      {[...nodes]
        .filter((sectionData) =>
          sectionData.imageTextSectionsCoreFields.section?.some((section) =>
            section.toLowerCase().includes(searchText),
          ),
        )
        .sort(
          (a, b) =>
            a.imageTextSectionsCoreFields.order -
            b.imageTextSectionsCoreFields.order,
        )
        .map((sectionData, sectionIndex) => {
          console.log(
            "ImageTextSections: ",
            sectionData.imageTextSectionsCoreFields,
          );

          return (
            <section
              key={sectionIndex}
              style={{
                backgroundColor:
                  sectionData.imageTextSectionsCoreFields.backgroundColor,
              }}
              className="relative w-full"
            >
              <div className="px-6">
                {/* TITLE */}
                <h2 className="relative text-[36px] mx-auto leading-tight md:text-[48px] font-extrabold font-nunito text-center text-[#000E47] pt-10 lg:pt-20">
                  {sectionData.imageTextSectionsCoreFields.title}
                </h2>

                <div className="w-full flex flex-col gap-4 text-center pt-4 pb-10 lg:pb-20">
                  {sectionData.imageTextSectionsCoreFields.description && (
                    <p className="text-lg text-[#000E47]">
                      {sectionData.imageTextSectionsCoreFields.description}
                    </p>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`flex flex-col md:flex-row items-start gap-10 px-6 pb-10 lg:pb-20 max-w-337.5 mx-auto ${
                  sectionData.imageTextSectionsCoreFields.cols.isreversed
                    ? "md:flex-row-reverse"
                    : ""
                }`}
              >
                {/* IMAGE */}
                <div className="w-full md:w-1/2">
                  <Image
                    src={
                      sectionData.imageTextSectionsCoreFields.cols.img?.node
                        ?.sourceUrl
                    }
                    alt={
                      sectionData.imageTextSectionsCoreFields.cols.img?.node
                        ?.altText || ""
                    }
                    className="w-full h-auto rounded-lg"
                    width={590}
                    height={590}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmAQMAAAADEXYhAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFzu7WkwYvEwAAABhJREFUeJxjZEAGjKO8Ud4ob5Q3yhtAHgAk6QBnmOT1xwAAAABJRU5ErkJggg=="
                  />
                </div>

                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-6">
                    {sectionData.imageTextSectionsCoreFields.cols.list.map(
                      (item, index) => {
                        return (
                          <div
                            className="flex items-center gap-4"
                            key={"list_" + index}
                          >
                            <Image
                              className="w-6 h-6"
                              src={
                                item?.icon?.node?.sourceUrl ||
                                "https://webstaging.fenero.ie/wp-content/uploads/2026/01/check-circle-broken.svg"
                              }
                              alt=""
                              width={24}
                              height={24}
                            />

                            <p className="text-[16px] leading-5">
                              {item.label}
                            </p>
                          </div>
                        );
                      },
                    )}
                  </div>
                  {sectionData?.imageTextSectionsCoreFields?.cols?.cta
                    ?.link && (
                    <div>
                      <Link
                        href={
                          sectionData.imageTextSectionsCoreFields.cols.cta.link
                        }
                      >
                        <Button
                          size="lg"
                          className="bg-transparent border-2 border-[#056735] hover:border-[#38BB3F]  hover:bg-transparent text-[#056735] hover:text-[#38BB3F] cursor-pointer w-full lg:w-auto transition shadow-none z-20 relative select-none"
                        >
                          <span className="font-bold text-[16px]">
                            {
                              sectionData.imageTextSectionsCoreFields.cols.cta
                                .label
                            }
                          </span>
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
    </>
  );
}
