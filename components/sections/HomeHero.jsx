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
        <div className="w-full p-6 lg:p-10 xl:p-20 lg:flex lg:items-center flex justify-center lg:justify-start portrait:items-start z-0">
          <div className="max-w-150">
            <div className="mb-4">
              <Button className="border-2 bg-transparent py-5 px-8 font-bold text-[14px] rounded-full text-[#CEEED6] pointer-events-none">
                <Image
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

            <p className=" font-medium text-[16px] leading-6 tracking-[0.15px] text-[#CEE3E4] mb-6 lg:pr-10">
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
            src={homeData.img.node.sourceUrl}
            alt={"No alternative text provided"}
            className="absolute portrait:relative right-0 top-0 h-full w-auto  object-cover object-left"
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAADNCAMAAAAR8GU9AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAfJQTFRFAAAAARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaluolLAAAAKZ0Uk5TAAmy/waoDLoLprgSs86/IQgYARGxIhfAvBY7VfG9wiQftSPBtyC7HgJbHRoHnbBZ9xPITv6R2OAO2/37/ATFnmLarhRfA3pPD/ot9jjV9QU21PQVR0Te+a81rUPdOjfXq2hCd2maCm1xeBAbaqLL3+W0gDmck8c+QXteqQ1UmTSLdNyjcGclpPhM6u4zxoqg7O2q89kZY+fpayfEc0BXn/CEbJSNKEALfckAAAklSURBVHic3Z1fbBRFHMdnoIHSM/YPUKCowUDhpCSmEqTFNEDiosIDD2AgQTAgUYwPSkgUJSgmhUhiTEj0gSiChAgRHkSjMSoSIQYhyIWiBA0I4p+C1RZEWlpa6g3H3c7e7Z/Z+f3mz/l9uksns/PppzO7O7M7pcRIKKXKqlZVcWhK6A1ldRshUmjIDJFK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"
          />
        </div>
      </div>

      <div className="relative w-full h-full flex justify-end lg:hidden z-0">
        <Image
          src={homeData.img.node.sourceUrl}
          alt="No alternative text provided"
          className="max-w-163 w-[70%] h-auto object-cover object-right"
          width={652}
          height={639}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAADNCAMAAAAR8GU9AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAfJQTFRFAAAAARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaARNaluolLAAAAKZ0Uk5TAAmy/waoDLoLprgSs86/IQgYARGxIhfAvBY7VfG9wiQftSPBtyC7HgJbHRoHnbBZ9xPITv6R2OAO2/37/ATFnmLarhRfA3pPD/ot9jjV9QU21PQVR0Te+a81rUPdOjfXq2hCd2maCm1xeBAbaqLL3+W0gDmck8c+QXteqQ1UmTSLdNyjcGclpPhM6u4zxoqg7O2q89kZY+fpayfEc0BXn/CEbJSNKEALfckAAAklSURBVHic3Z1fbBRFHMdnoIHSM/YPUKCowUDhpCSmEqTFNEDiosIDD2AgQTAgUYwPSkgUJSgmhUhiTEj0gSiChAgRHkSjMSoSIQYhyIWiBA0I4p+C1RZEWlpa6g3H3c7e7Z/Z+f3mz/l9uksns/PppzO7O7M7pcRIKKXKqlZVcWhK6A1ldRshUmjIDJFK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"
        />
      </div>
    </section>
  );
}
