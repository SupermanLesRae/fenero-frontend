"use client";

import { motion } from "framer-motion";

import { useEffect, useState, useCallback } from "react";
import { createApolloClient } from "@/lib/apolloClient";
import { WHO_WE_ARE_QUERY } from "@/lib/queries/Queries";

import useEmblaCarousel from "embla-carousel-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";

export default function WhoAreYou() {
  const [sectionData, setSectionData] = useState(null);
  const [items, setItems] = useState([]);

  /* ---------------------------
     Fetch data (client-safe)
  ---------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      const client = createApolloClient();
      const { data } = await client.query({
        query: WHO_WE_ARE_QUERY,
      });

      const core = data?.whoAreYouSections?.nodes?.[0]?.whoAreYouCoreFields;

      setSectionData(core);
      setItems(core?.cards ?? []); // ✅ replaces contractorItem
    };

    fetchData();
  }, []);

  /* ---------------------------
     Embla
  ---------------------------- */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: true,
    watchResize: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const getVisibleSlides = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 1024) return 2;
    return 1;
  };

  const updateDots = useCallback(() => {
    if (!emblaApi || !items.length) return;

    const visibleSlides = getVisibleSlides();
    const count = Math.ceil(items.length / visibleSlides);

    setDotsCount(count);
    setSelectedIndex(Math.floor(emblaApi.selectedScrollSnap() / visibleSlides));
    setShowControls(visibleSlides < items.length);
  }, [emblaApi, items.length]);

  const scrollToDot = (index) => {
    if (!emblaApi) return;
    emblaApi.reInit();
    const visibleSlides = getVisibleSlides();
    emblaApi.scrollTo(index * visibleSlides);
  };

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    if (!emblaApi) return;

    updateDots();
    emblaApi.on("select", updateDots);

    const handleResize = () => updateDots();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [emblaApi, updateDots]);

  if (!sectionData) return <div>Loading...</div>;

  return (
    <motion.section
      style={{ backgroundColor: sectionData.backgroundColor }}
      className="relative w-full pb-20 m-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="text-center mx-auto max-w-120 md:max-w-175 lg:max-w-225 py-20 px-6">
        <h2 className="mb-4 text-[40px] lg:text-[48px] leading-12 md:leading-14 font-extrabold text-[#000E47] font-nunito">
          {sectionData.title}
        </h2>

        <p className="font-nunito font-medium text-[18px] md:text-[20px] leading-7 tracking-[0.15px] text-[#000E47]">
          {sectionData.description}
        </p>
      </div>
      <div className="relative w-full px-10 md:px-0 max-[1024px]:max-w-97.5 max-[1280px]:max-w-195 xl:max-w-300 mx-auto h-auto">
        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] lg:flex-[0_0_50%] xl:flex-[0_0_33.333%] min-w-0 px-0  py-2 "
              >
                <div className="relative border border-gray-200 flex flex-col w-full md:w-93.25 rounded-xl shadow-md shadow-[#000000]/10 h-full bg-white overflow-hidden select-none">
                  <div
                    style={{
                      color: item.textColor,
                      backgroundColor: item.backgroundColor,
                    }}
                    className="relative h-auto"
                  >
                    <div className="flex items-center justify-start pt-10 pl-6 h-15.25 w-auto">
                      <Image
                        unoptimized
                        src={item.icon.node.sourceUrl}
                        alt={"No alt text"}
                        width={74}
                        height={74}
                      />
                    </div>
                    <div className="mt-10 pb-8 px-8">
                      <h2 className="text-[22px] font-medium font-nunito mb-2 select-none">
                        {item.title}
                      </h2>
                      <p className="font-nunito font-medium text-[15px] leading-6 tracking-[0.15px] select-none">
                        {truncate(item.description, 70)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white h-87.5 flex flex-col justify-between px-10 py-7">
                    <ul className="space-y-4 font-nunito list-disc marker:text-[#036735] pl-4 text-[#666666] text-[16px] leading-5 font-medium">
                      {item.cardList.map((listItem, index) => (
                        <li key={"whoAreYouCardListItem" + index}>
                          <div className="select-none overflow-hidden line-clamp-2 wrap-break-word">
                            {listItem.label}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Link className="w-full" href="#">
                      <Button
                        style={{
                          color: item?.textColor,
                          backgroundColor: item?.backgroundColor,
                        }}
                        size="lg"
                        className="
                          hover:bg-[#D1DF20]
                          hover:text-[#000E47]
                          select-none cursor-pointer
                          font-nunito font-semibold text-[16px]
                          flex items-center gap-3 justify-center
                          mt-6 sm:mt-0
                          px-4 py-3 w-full rounded-lg
                          shadow-md shadow-black/10
                          transition-all duration-200
                          hover:shadow-none
                        "
                      >
                        <span className="font-bold text-[16px]">
                          {item?.cta?.label}
                        </span>
                        <IconArrowRight stroke={2} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows outside carousel */}
        {showControls && (
          <span className="hidden md:flex text-[#38BB3F]">
            <button
              className="absolute top-1/2 -translate-y-1/2 -left-20 z-10 p-2 bg-transparent rounded-full cursor-pointer"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <IconChevronLeft size={60} />
            </button>
            <button
              className="absolute top-1/2 -translate-y-1/2 -right-20 z-10 p-2 bg-transparent rounded-full cursor-pointer"
              onClick={() => emblaApi?.scrollNext()}
            >
              <IconChevronRight size={60} />
            </button>
          </span>
        )}

        {/* Dots */}
        {showControls && (
          <div className="flex justify-center mt-8 gap-2 ">
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
        )}
      </div>
    </motion.section>
  );
}
