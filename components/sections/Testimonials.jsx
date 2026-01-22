"use client";

import { motion } from "framer-motion";

import { useEffect, useState, useCallback } from "react";
import { createApolloClient } from "@/lib/apolloClient";
import { TESTIMONIALS_QUERY } from "@/lib/queries/Queries";

import useEmblaCarousel from "embla-carousel-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Spinner } from "../ui/spinner";

export default function Testimonials() {
  const [sectionData, setSectionData] = useState(null);
  const [items, setItems] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  /* ---------------------------
     Fetch data (client-safe)
  ---------------------------- */
  useEffect(() => {
    const fetchData = async () => {
      const client = createApolloClient();
      const { data } = await client.query({
        query: TESTIMONIALS_QUERY,
      });

      const core = data.testimonials.nodes[0].testimonialsCoreFields;
      setSectionData(core);
      setItems(core?.testimonials ?? []);

      const averageRatingCount =
        core?.testimonials.reduce(
          (sum, t) => sum + (Number(t.rating) || 0),
          0,
        ) / core?.testimonials.length;

      setAverageRating(averageRatingCount.toFixed(1));
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

  if (!sectionData)
    return (
      <div className="min-h-[100px] flex items-center justify-center w-full py-10">
        <Spinner className="size-16  text-[#AFCE67]" />
      </div>
    );

  return (
    <motion.section
      style={{ backgroundColor: sectionData.backgroundColor || "#FFFFFF" }}
      className="relative w-full pb-10 lg:pb-20 m-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="text-center mx-auto max-w-120 md:max-w-175 lg:max-w-225 py-10 lg:py-20 px-6">
        <h2 className="mb-4 text-[40px] lg:text-[48px] leading-12 md:leading-14 font-extrabold text-[#000E47] font-nunito">
          {sectionData.title}
        </h2>

        <p className="font-nunito font-medium text-[18px] md:text-[20px] leading-7 tracking-[0.15px] text-[#000E47]">
          {sectionData.description}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 flex-col md:flex-row md:gap-2 mb-8">
        <p className="font-nunito font-bold text-[18px] leading-5 tracking-[0.15px] text-[#000E47]">
          Average rating
        </p>

        <div className="flex w-auto rounded-full bg-green-500 px-4 py-1">
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 17.77L17.18 21.5L15.54 14.47L21 9.74L13.81 9.13L11 2.5L8.19 9.13L1 9.74L6.46 14.47L4.82 21.5L11 17.77Z"
                fill="#FFCC51"
              />
            </svg>
          </span>

          <div className="text-white font-bold">{averageRating}</div>
        </div>

        <p className="font-nunito font-bold text-[18px] leading-5 tracking-[0.15px] text-[#000E47]">
          {sectionData.googleRatings}
        </p>
      </div>
      <div className="relative w-full px-0 max-[1024px]:max-w-95 max-[1280px]:max-w-190 xl:max-w-300 mx-auto ">
        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden py-1">
          <div className="flex">
            {items.map((item, index) => (
              <div
                key={"item.id" + index}
                className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2 flex items-center justify-center h-full select-none"
              >
                <div className="relative border border-gray-200 flex flex-col w-full sm:w-90.75 rounded-xl shadow-md shadow-[#000000]/10 md:h-93 bg-white overflow-hidden p-5 ">
                  <div className="flex h-auto items-center gap-2 mb-5">
                    <div className="flex">
                      {Array.from({
                        length: Math.round(item.rating * 10) / 10,
                      }).map((_, index) => (
                        <svg
                          key={index}
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 17.77L17.18 21.5L15.54 14.47L21 9.74L13.81 9.13L11 2.5L8.19 9.13L1 9.74L6.46 14.47L4.82 21.5L11 17.77Z"
                            fill="#FFCC51"
                          />
                        </svg>
                      ))}
                    </div>
                    <div className="font-nunito font-extrabold text-[18px] leading-5 tracking-[0.25px] text-[#000000]">
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex grow">
                    <p className="font-nunito font-medium text-[16px] leading-6 tracking-[0.5px] text-[#000000]">
                      {truncate(item.description, 340)}
                    </p>
                  </div>
                  <div>
                    <h2 className="font-nunito font-bold text-[18px] leading-5 tracking-[0.25px] text-[#000000] mb-1">
                      {truncate(item.name, 30)}
                    </h2>
                    <p className="font-nunito font-medium text-[18px] leading-5 tracking-[0.25px] text-[#000000]">
                      {truncate(item.position, 30)}
                    </p>
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
