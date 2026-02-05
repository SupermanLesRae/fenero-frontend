"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function Hero({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: true,
    active: data.length > 1 ? true : false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const getVisibleSlides = useCallback(() => 1, []);

  const updateDots = useCallback(() => {
    if (!emblaApi) return;

    const visibleSlides = getVisibleSlides(); // always 1
    const pages = data.length; // ✔ one dot per item

    setDotsCount(pages);
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setShowControls(data.length > 1);
  }, [emblaApi, data.length, getVisibleSlides]);

  const scrollToDot = (index) => {
    if (!emblaApi) return;
    const visibleSlides = getVisibleSlides();
    emblaApi.scrollTo(index * visibleSlides);
  };

  // Attach events
  useEffect(() => {
    if (!emblaApi) return;

    updateDots();
    emblaApi.on("select", updateDots);

    // Recalculate on window resize
    const onResize = () => updateDots();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [emblaApi, updateDots]);

  return (
    <section className="bg-[#000E47] h-auto lg:max-h-[640px] ">
      <motion.section
        className="relative w-full lg:max-h-[640px] m-0 bg-[#000E47]"
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative max-w-500 mx-auto h-auto lg:max-h-[640px]">
          <div ref={emblaRef} className="overflow-hidden ">
            <div className="flex h-auto lg:max-h-[640px]">
              {data.map((item, index) => {
                const hasHash = item?.cta?.link?.includes("#");
                const hash = hasHash ? item.cta.link.split("#")[1] : null;

                const handleSmoothScroll = (e) => {
                  e.preventDefault();
                  if (!hash) return;

                  const el = document.getElementById(hash);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                };

                return (
                  <div
                    key={"aboutHeroSlide" + index}
                    className="flex-[0_0_100%] relative flex flex-col lg:flex-row xl:items-center select-none h-auto lg:h-[640px] portrait:min-h-0 overflow-y-hidden lg:max-h-[640px]"
                  >
                    <div className="w-full py-10 px-6 xl:p-20 lg:flex lg:items-center flex justify-center lg:justify-start z-1 mb-0 lg:mb-10 shadow-lg lg:shadow-none ">
                      <div className="flex flex-col min-h-[calc(100svh-220px)] lg:min-h-auto md:text-left md:max-w-[620px] text-center">
                        {/* Text content */}
                        <div>
                          <h2
                            className="mb-4 text-[35px] leading-9 md:text-[48px] md:leading-13 tracking-[0.15px] font-bold text-white"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />

                          <p
                            className="font-medium text-[18px] lg:text-[32px] font-bold leading-6 lg:leading-9 tracking-[0.15px] text-[#ffffff] mb-6 lg:pr-10"
                            dangerouslySetInnerHTML={{ __html: item.subTitle }}
                          ></p>

                          <p
                            className="font-medium text-[17px] leading-7 tracking-[0.15px] text-[#ffffff] mb-6 lg:pr-10"
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></p>
                        </div>

                        {/* CTA pushed to bottom only on mobile */}
                        {item.hasCta && (
                          <div className="mt-auto lg:mt-0 flex flex-wrap gap-6 justify-center lg:justify-start">
                            {!hasHash ? (
                              <Link
                                href={item.cta?.link || "#"}
                                className="w-auto"
                              >
                                <Button
                                  size="lg"
                                  className="bg-[#AFCE67] hover:bg-[#D1DF20] text-[#000E47] cursor-pointer transition shadow-md shadow-[#AFCE67]/30 hover:shadow-[#AFCE67]/10 flex items-center gap-2"
                                >
                                  <span className="font-bold text-[16px]">
                                    {item.cta.label}
                                  </span>
                                  <IconArrowRight stroke={2} className="ml-2" />
                                </Button>
                              </Link>
                            ) : (
                              <a
                                href={item.cta.link}
                                onClick={handleSmoothScroll}
                                className="w-auto"
                              >
                                <Button
                                  size="lg"
                                  className="bg-[#AFCE67] hover:bg-[#D1DF20] text-[#000E47] cursor-pointer transition shadow-md shadow-[#AFCE67]/30 hover:shadow-[#AFCE67]/10 flex items-center gap-2"
                                >
                                  <span className="font-bold text-[16px]">
                                    {item.cta.label}
                                  </span>
                                  <IconArrowRight stroke={2} className="ml-2" />
                                </Button>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute portrait:absolute top-0 right-0 w-full sm:w-[50%] h-full max-h-250 overflow-hidden hidden lg:block z-0">
                      <Image
                        src={item?.img?.node?.sourceUrl}
                        alt="No alternative text provided"
                        fill
                        className="absolute portrait:relative right-0 top-0 h-full w-auto object-cover object-left"
                        placeholder="blur"
                        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAGQAAABgCAMAAADcrSdwAAAAk1BMVEUAAAACE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1hjv+bVAAAAMHRSTlMA+gX18OvkHwlHKLdBLROWOzYjwITGoxoWczGtqMq7n5wPeFmL1bN9TI9uZdCG3tgC0WTfAAADmUlEQVRo3r3X63KiMBgG4JxA5KSCiAVRsNRzt7n/q9tJGJt2gUgg2e9vO3mGvL6QAOXxv6jqqBLIL6gpRBgxNY2g+R6aQoSRjDHo/zCoqmEayXJITSN+DKlphPVjPGLeoAo9N4ygVY6NIaLnkwxqsB9iFAyTyGoPqWkkY5kbRvx4uoFfGMsCTjcOL4xEg7GZSY3Am26QjSsjULbB040yQDLD93QYrryDMTRu+PqMZW8HPR2/q4At5Z56jEBD5vjgImYccE8/PB3GjC91wtRQB4XBXq/mei4MarbnQXNUM9TzA+95UBLahSD/pMNo+pE3BtXfQWF8f1KNG23E1dHB05LlMTuIpfT3fPPsOe1EVhp6DjcRXyrHtBNZacgD7hrjd9X0GlgYnUhUasjD8xFbakFoF4KCg47MM545N9oIWuZY1zdqtROGQJjhQW2Gh2knEuTTDehlPFq2VBeyXWjox55nnnYuxTbrbmnoR8CMiBmdyMzTYIiedyPLP9p73kYu9uQ8mvPVDlMJor3nbSR7TDN2ouf9SFjCSQbfq2xH5HfG+cfknm9ZHlIkrMnozBOeB5jbL2+/aU0m9RygGsoRrlzJKCPPuAGq05B7/OzTGmGcXAAaxBuCgPDNHm8ApxyEgNmCqGY+F/faG5YiYxW8/2EAN4EyZKSCd6sfBkCXAkoRoaztwUae8bXDKHBDpjlzDw5CQLomA/OIl83KtZd4tV8xb17IEPUdg8WFGdXti+WNP44hE98/JIiyAuM5N47PbpG1XAHqCsx55ttvQygP+BIR3ZcbvINRzf5PKCnPKIaDEJB+Evlerfi7nRtirPWMp//oQZR2DBbzZq/+/bXb67Q3F6Cm4H2nwZ/lqUA5IhRL2vOUGb1KAWWIvPvcyJrMxV9bufDuyxHRfavrO9hkLr5w7Vya7kMJIs8FJqKDPWN1txL0KiWW9Lx7RCu/hiEgOuBfhsczD9/kXSXnqvUsNpAoV+unEYj3gVzZMuWSCOMOJJNexbMkS575Wm7wXM48/cvH0zg6QDZRScS7ffBpw26e5T0mEEIS37dAPrNzYWFMHoulMF6PxRXk3q/l9R444NU42fvteF+FfK+YoaAA5FQOAoMGIeUTALVvFRgzjtLpL87GGUrnWHJ2jBsUnlJVgvdcbZJI1eA9N/wk4ZvyTR/Xlaqhfgd/+OYN++YoGdsxxjE0nQcl9VbJqEY8By4jJQPdLHVj0TL+Am/zrneXf7hdAAAAAElFTkSuQmCC"
                      />
                    </div>

                    <div className="relative w-full h-full overflow-hidden flex justify-end lg:hidden z-0 min-h-[448px]">
                      <Image
                        src={item?.img?.node?.sourceUrl}
                        alt="No alternative text provided"
                        className="absolute portrait:relative right-0 top-0 h-full w-auto object-cover object-left"
                        width={652}
                        height={639}
                        placeholder="blur"
                        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAGQAAABgCAMAAADcrSdwAAAAk1BMVEUAAAACE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1gCE1hjv+bVAAAAMHRSTlMA+gX18OvkHwlHKLdBLROWOzYjwITGoxoWczGtqMq7n5wPeFmL1bN9TI9uZdCG3tgC0WTfAAADmUlEQVRo3r3X63KiMBgG4JxA5KSCiAVRsNRzt7n/q9tJGJt2gUgg2e9vO3mGvL6QAOXxv6jqqBLIL6gpRBgxNY2g+R6aQoSRjDHo/zCoqmEayXJITSN+DKlphPVjPGLeoAo9N4ygVY6NIaLnkwxqsB9iFAyTyGoPqWkkY5kbRvx4uoFfGMsCTjcOL4xEg7GZSY3Am26QjSsjULbB040yQDLD93QYrryDMTRu+PqMZW8HPR2/q4At5Z56jEBD5vjgImYccE8/PB3GjC91wtRQB4XBXq/mei4MarbnQXNUM9TzA+95UBLahSD/pMNo+pE3BtXfQWF8f1KNG23E1dHB05LlMTuIpfT3fPPsOe1EVhp6DjcRXyrHtBNZacgD7hrjd9X0GlgYnUhUasjD8xFbakFoF4KCg47MM545N9oIWuZY1zdqtROGQJjhQW2Gh2knEuTTDehlPFq2VBeyXWjox55nnnYuxTbrbmnoR8CMiBmdyMzTYIiedyPLP9p73kYu9uQ8mvPVDlMJor3nbSR7TDN2ouf9SFjCSQbfq2xH5HfG+cfknm9ZHlIkrMnozBOeB5jbL2+/aU0m9RygGsoRrlzJKCPPuAGq05B7/OzTGmGcXAAaxBuCgPDNHm8ApxyEgNmCqGY+F/faG5YiYxW8/2EAN4EyZKSCd6sfBkCXAkoRoaztwUae8bXDKHBDpjlzDw5CQLomA/OIl83KtZd4tV8xb17IEPUdg8WFGdXti+WNP44hE98/JIiyAuM5N47PbpG1XAHqCsx55ttvQygP+BIR3ZcbvINRzf5PKCnPKIaDEJB+Evlerfi7nRtirPWMp//oQZR2DBbzZq/+/bXb67Q3F6Cm4H2nwZ/lqUA5IhRL2vOUGb1KAWWIvPvcyJrMxV9bufDuyxHRfavrO9hkLr5w7Vya7kMJIs8FJqKDPWN1txL0KiWW9Lx7RCu/hiEgOuBfhsczD9/kXSXnqvUsNpAoV+unEYj3gVzZMuWSCOMOJJNexbMkS575Wm7wXM48/cvH0zg6QDZRScS7ffBpw26e5T0mEEIS37dAPrNzYWFMHoulMF6PxRXk3q/l9R444NU42fvteF+FfK+YoaAA5FQOAoMGIeUTALVvFRgzjtLpL87GGUrnWHJ2jBsUnlJVgvdcbZJI1eA9N/wk4ZvyTR/Xlaqhfgd/+OYN++YoGdsxxjE0nQcl9VbJqEY8By4jJQPdLHVj0TL+Am/zrneXf7hdAAAAAElFTkSuQmCC"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {showControls && (
              <div className="absolute h-full w-full top-0 left-0 hidden md:flex text-[#036735] z-1 pointer-events-none">
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-2 z-10 p-2 bg-transparent rounded-full cursor-pointer pointer-events-auto"
                  onClick={() => emblaApi?.scrollPrev()}
                >
                  <IconChevronLeft size={60} />
                </button>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-2 z-10 p-2 bg-transparent rounded-full cursor-pointer pointer-events-auto"
                  onClick={() => emblaApi?.scrollNext()}
                >
                  <IconChevronRight size={60} />
                </button>
              </div>
            )}

            {/* Dots */}
            {showControls && (
              <div className="absolute -mt-10 w-full">
                <div className="flex justify-center gap-4">
                  {Array.from({ length: dotsCount }).map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        selectedIndex === index
                          ? "bg-green-600 scale-110"
                          : "bg-gray-300"
                      }`}
                      onClick={() => scrollToDot(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </section>
  );
}
