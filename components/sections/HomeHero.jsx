import { createApolloClient } from "@/lib/apolloClient";
import { HOME_HERO_QUERY } from "@/lib/queries/Queries";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountUpFromString from "@/components/utilities/CountUpFromString";
import Image from "next/image";

export default async function HomeHero() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: HOME_HERO_QUERY,
  });

  const homeData = data.homeheros.nodes[0].homeHeroCoreFields;

  return (
    <section className="w-full bg-[#000E47] p-0 z-0 relative">
      <div className="relative flex flex-row xl:items-center select-none min-h-0 h-full md:max-h-250 max-w-500 mx-auto shadow-md z-10">
        <div className="w-full p-10 xl:p-20 lg:flex lg:items-center flex justify-center lg:justify-start portrait:items-start z-0">
          <div className="max-w-150">
            <div className="mb-4">
              <Button className="border-2 bg-transparent py-5 px-8 font-bold text-[14px] rounded-full text-[#CEEED6] pointer-events-none">
                <Image
                  unoptimized
                  src={homeData.awardLabel?.img.node.sourceUrl}
                  alt={"No alternative text provided"}
                  className="block"
                  width={20}
                  height={20}
                />
                {homeData.awardLabel.label}
              </Button>
            </div>

            <h2
              className="mb-4 text-[40px] leading-12 md:text-[44px] md:leading-13 tracking-[0.15px] font-black text-white "
              dangerouslySetInnerHTML={{ __html: homeData.title }}
            />

            <p className=" font-medium text-[16px] leading-6 tracking-[0.15px] text-[#CEE3E4] mb-6 pr-10">
              {homeData.description}
            </p>

            <div className="mb-8 text-[14px] md:text-[20px] font-medium ">
              <ul className="space-y-2">
                {homeData.listItems?.map((item, index) => (
                  <li
                    key={"homeHeroListItem" + index}
                    className="flex items-center gap-4 text-[#AFCE67]"
                  >
                    {/* Icon SVG */}
                    <Image
                      unoptimized
                      src={item?.icon.node.sourceUrl}
                      alt={"No alternative text provided"}
                      className=""
                      width={20}
                      height={20}
                    />

                    {/* Text */}
                    {item.listItem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-6">
              <Link className="w-full" href={homeData.cta?.link}>
                <Button
                  /* style={{ color: cta.txtColor, backgroundColor: cta.bgColor }} */
                  size="lg"
                  className={`bg-[#AFCE67] hover:bg-[#D1DF20] text-[#000E47] cursor-pointer w-full lg:w-auto transition shadow-md `}
                >
                  <span className=" font-bold text-[16px] ">
                    {homeData.cta?.label}
                  </span>

                  {homeData.cta?.hasArrow && <IconArrowRight stroke={2} />}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-10 md:gap-20 mt-14">
              {homeData.stats?.map((item, index) => (
                <div
                  key={"item.id" + index}
                  className=" text-white flex flex-col items-center gap-1 font-bold text-[28px]"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      unoptimized
                      src={item.icon.node.sourceUrl}
                      alt={"No alternative text provided"}
                      className="w-auto h-auto"
                      width={40}
                      height={40}
                    />

                    <CountUpFromString text={item.amount} />
                  </div>
                  <span className="text-[16px]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute portrait:absolute top-0 right-0 w-full sm:w-[50%] h-full max-h-250 overflow-hidden hidden lg:block z-0">
          <Image
            unoptimized
            src={homeData.img.node.sourceUrl}
            alt={"No alternative text provided"}
            className="absolute portrait:relative right-0 top-0 h-full w-auto  object-cover object-left"
            width={652}
            height={639}
          />
        </div>
      </div>

      <div className="relative w-full h-full flex justify-end lg:hidden z-0">
        <Image
          unoptimized
          src={homeData.img.node.sourceUrl}
          alt="No alternative text provided"
          className="max-w-163 w-[70%] h-auto object-cover object-right"
          width={652}
          height={639}
        />
      </div>
    </section>
  );
}
