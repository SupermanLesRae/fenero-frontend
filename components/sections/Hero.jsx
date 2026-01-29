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
    <section className="bg-[#000E47] lg:max-h-[640px]">
      <motion.section
        className="relative w-full lg:max-h-[640px] m-0 bg-[#000E47]"
        initial={{ opacity: 0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative max-w-500 mx-auto lg:max-h-[640px]">
          <div ref={emblaRef} className="overflow-hidden ">
            <div className="flex lg:max-h-[640px]">
              {data.map((item, index) => {
                return (
                  <div
                    key={"aboutHeroSlide" + index}
                    className="flex-[0_0_100%] relative flex flex-col lg:flex-row xl:items-center select-none min-h-0 h-auto lg:h-[640px] portrait:min-h-0 overflow-y-hidden lg:max-h-[640px]"
                  >
                    <div className="w-full py-10 px-6 xl:p-20 lg:flex lg:items-center flex justify-center lg:justify-start z-1 mb-0 lg:mb-10 shadow-lg lg:shadow-none">
                      <div className="text-center md:text-left md:max-w-[620px]">
                        <h2
                          className="mb-4 text-[35px] leading-9 md:text-[48px] md:leading-13 tracking-[0.15px] font-bold text-white "
                          dangerouslySetInnerHTML={{
                            __html: item.title,
                          }}
                        />

                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.subTitle,
                          }}
                          className=" font-medium text-[18px] lg:text-[32px] text-bold leading-6 lg:leading-9 tracking-[0.15px] text-[#ffffff] mb-6 lg:pr-10"
                        ></p>

                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                          className=" font-medium text-[17px] leading-7 tracking-[0.15px] text-[#ffffff] mb-6 lg:pr-10"
                        ></p>

                        {item.hasCta && (
                          <div className="flex flex-wrap gap-6">
                            <Link className="w-full" href={item.cta?.link}>
                              <Button
                                size="lg"
                                className={`bg-[#AFCE67] hover:bg-[#D1DF20] text-[#000E47] cursor-pointer w-full lg:w-auto transition shadow-md shadow-[#AFCE67]/30 hover:shadow-[#AFCE67]/10`}
                              >
                                <span className=" font-bold text-[16px]">
                                  {item.cta.label}
                                </span>

                                <IconArrowRight stroke={2} />
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="absolute portrait:absolute top-0 right-0 w-full sm:w-[50%] h-full max-h-250 hidden lg:block z-0">
                      <Image
                        src={item?.img?.node?.sourceUrl}
                        alt="No alternative text provided"
                        fill
                        className="absolute portrait:relative right-0 top-0 h-full w-auto object-cover object-left"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABACAMAAABV22s6AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAATVQTFRFAAAAARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRd43DqnwAAAGd0Uk5TAAFV+v/0/EdW7vXtQOg5TUYCW0XiSuxTQ1FgQllnNT8N1jf+NH8GqIorLPdjTBtOhTGvDLsOsAkEcvYwktTZuAP9CHzPaxWqkCcFdaLgNtqenduR0vA6rPgH3RalGKvfyRIQIvuPeB0ZsJgAAANSSURBVHicrZjLTxNBGMDna6EPaKRbQEQBOSioQYkxTVUuGxJqAEM8GKKJB/4x48F48mBi00B8cNEQ5SAPNSgRUPBBorCAKGkL1JlZ3O3Ozs5Oh36HaXaW+fXXmW9eABIF4BD+Aa+N8G0gWCwXKCQCVO2XDRQSVQxFRAjtlt2HYqKaoTcRwgUlQ1Tt1SwQySsBwx7ppmwYhS1+w7p8QQkYrt7g9qO2o27IH5nEjqJhZA3xiIc0TLgbqxrGi8Sw0TXWWmhLDRitzRkIju2tM0QNVA13N4jh3xzTj1rUOKQhMzIVMGSIEVA0DO0bCJ0orCMnUYNNtbSJV63issXIIYaobBgEYrhhAm1ihQxLiBUytIha7LuiYc0ybl1rGVrESEBtgY2GyNRr3rKBJlFlo6cRDpLFoQHWS+qgwoYm8eTXyhlSYjusqBk2LuKyaTvnrMbE+vgXZUN0aon9ffj59JISELZx2QEL7AtMPPNJBdg2Rz7OwUcOseuDqiFC5+dcrzDxwkLOVS1niFD3ex4Rut8pGiJ0cdaVeKSiI7ZZ1mjTbdSMSzDNI6IkvCnHsGnRfnCnnimdKshbHhhqna/o4xWY5BHLsDQNe8ji8rZhHiF9odWJ/N+xqULdC2nDXvhMf5K+NoXLvj8OpDVUaXguAaTbqB4ZP7hDXK0dRWgAjFKkPfgyllENr9i9NWNWRT88Zi1L0snfkh6WbEMSg3nWsjRB/SxdhqZlBt8pjrdbSEfKpyEvQHIMqeXUMiktS+ckSjVveiJpy2TTmOsFY8lMS29LutHrWpZzU3RashM9XcO3HJrAx7lkW4Z79bwxuVJEAwVzxF1LRyrOsxQYUssiSaJWOnvcuyDPcvC1wJBE/wy21KuJJWdfdVvSo0iyxcvQtuw6+4h7n0n/mnU8R4Nk6tV7G1LLXZzqWp/H6cSZRP0zvoa2JbrNP00k92xLutH7GZIYhgfkw+N8YltKGpK4lTW8iZiRMb/4JQbqsScy/wJJXLsvICJ9egiy138evYcXh9AzCR4+kR2ZEhEx83f36mhR2hBH26KYeBDs8uUdnZfvyhD12JzsNnlnYl6CKG+IRp7Sr/YhajfHZQ1HfmSRPzHVKG0Y6Phm+BO1Huk+HAk8NIHoH9sUMuuyNwl5AAAAAElFTkSuQmCC"
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
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABACAMAAABV22s6AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAATVQTFRFAAAAARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRdARRd43DqnwAAAGd0Uk5TAAFV+v/0/EdW7vXtQOg5TUYCW0XiSuxTQ1FgQllnNT8N1jf+NH8GqIorLPdjTBtOhTGvDLsOsAkEcvYwktTZuAP9CHzPaxWqkCcFdaLgNtqenduR0vA6rPgH3RalGKvfyRIQIvuPeB0ZsJgAAANSSURBVHicrZjLTxNBGMDna6EPaKRbQEQBOSioQYkxTVUuGxJqAEM8GKKJB/4x48F48mBi00B8cNEQ5SAPNSgRUPBBorCAKGkL1JlZ3O3Ozs5Oh36HaXaW+fXXmW9eABIF4BD+Aa+N8G0gWCwXKCQCVO2XDRQSVQxFRAjtlt2HYqKaoTcRwgUlQ1Tt1SwQySsBwx7ppmwYhS1+w7p8QQkYrt7g9qO2o27IH5nEjqJhZA3xiIc0TLgbqxrGi8Sw0TXWWmhLDRitzRkIju2tM0QNVA13N4jh3xzTj1rUOKQhMzIVMGSIEVA0DO0bCJ0orCMnUYNNtbSJV63issXIIYaobBgEYrhhAm1ihQxLiBUytIha7LuiYc0ybl1rGVrESEBtgY2GyNRr3rKBJlFlo6cRDpLFoQHWS+qgwoYm8eTXyhlSYjusqBk2LuKyaTvnrMbE+vgXZUN0aon9ffj59JISELZx2QEL7AtMPPNJBdg2Rz7OwUcOseuDqiFC5+dcrzDxwkLOVS1niFD3ex4Rut8pGiJ0cdaVeKSiI7ZZ1mjTbdSMSzDNI6IkvCnHsGnRfnCnnimdKshbHhhqna/o4xWY5BHLsDQNe8ji8rZhHiF9odWJ/N+xqULdC2nDXvhMf5K+NoXLvj8OpDVUaXguAaTbqB4ZP7hDXK0dRWgAjFKkPfgyllENr9i9NWNWRT88Zi1L0snfkh6WbEMSg3nWsjRB/SxdhqZlBt8pjrdbSEfKpyEvQHIMqeXUMiktS+ckSjVveiJpy2TTmOsFY8lMS29LutHrWpZzU3RashM9XcO3HJrAx7lkW4Z79bwxuVJEAwVzxF1LRyrOsxQYUssiSaJWOnvcuyDPcvC1wJBE/wy21KuJJWdfdVvSo0iyxcvQtuw6+4h7n0n/mnU8R4Nk6tV7G1LLXZzqWp/H6cSZRP0zvoa2JbrNP00k92xLutH7GZIYhgfkw+N8YltKGpK4lTW8iZiRMb/4JQbqsScy/wJJXLsvICJ9egiy138evYcXh9AzCR4+kR2ZEhEx83f36mhR2hBH26KYeBDs8uUdnZfvyhD12JzsNnlnYl6CKG+IRp7Sr/YhajfHZQ1HfmSRPzHVKG0Y6Phm+BO1Huk+HAk8NIHoH9sUMuuyNwl5AAAAAElFTkSuQmCC"
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
