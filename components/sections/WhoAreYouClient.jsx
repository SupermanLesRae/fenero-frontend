"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconArrowRight,
} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function WhoAreYouClient({ sectionData, items }) {
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

  useEffect(() => {
    if (!emblaApi) return;

    updateDots();
    emblaApi.on("select", updateDots);

    const handleResize = () => updateDots();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [emblaApi, updateDots]);

  const truncate = (text, maxLength = 70) =>
    text && text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <motion.section
      style={{ backgroundColor: sectionData.backgroundColor }}
      className="relative w-full pb-10 lg:pb-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center mx-auto max-w-120 md:max-w-175 lg:max-w-225 py-10 lg:py-20 px-6">
        <h2 className="mb-4 text-[40px] lg:text-[48px] font-extrabold text-[#000E47]">
          {sectionData.title}
        </h2>
        <p className="text-[18px] md:text-[20px] text-[#000E47]">
          {sectionData.description}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-100 lg:max-w-200 xl:max-w-300 mx-auto">
        <div ref={emblaRef} className="overflow-hidden py-2">
          <div className="flex">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] lg:flex-[0_0_50%] xl:flex-[0_0_33.333%] px-2 flex"
              >
                <div className="rounded-xl shadow-md bg-white flex flex-col flex-1 overflow-hidden select-none">
                  <div
                    style={{
                      color: item.textColor,
                      backgroundColor: item.backgroundColor,
                    }}
                    className="p-8 flex flex-col justify-between flex-1 max-h-60"
                  >
                    <Image
                      src={item.icon.node.sourceUrl}
                      alt=""
                      width={74}
                      height={74}
                    />
                    <h3 className="mt-6 text-[22px] font-medium">
                      {item.title}
                    </h3>
                    <p className="text-[15px]">{truncate(item.description)}</p>
                  </div>

                  <div className="p-8 flex flex-col justify-between flex-1 ">
                    <ul className="list-disc pl-4 space-y-3 text-[#666]">
                      {item.cardList.map((li, i) => (
                        <li key={i}>{li.label}</li>
                      ))}
                    </ul>

                    <Link href="#" className="mt-6">
                      <Button
                        style={{
                          color: item.textColor,
                          backgroundColor: item.backgroundColor,
                        }}
                        size="lg"
                        className="w-full flex items-center gap-3 cursor-pointer"
                      >
                        {item.cta?.label}
                        <IconArrowRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {showControls && (
          <div className="hidden md:flex text-[#38BB3F]">
            <button
              className="absolute left-[-80px] top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <IconChevronLeft size={60} />
            </button>
            <button
              className="absolute right-[-80px] top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => emblaApi?.scrollNext()}
            >
              <IconChevronRight size={60} />
            </button>
          </div>
        )}

        {/* Dots */}
        {showControls && dotsCount > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: dotsCount }).map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  selectedIndex === index
                    ? "bg-green-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => {
                  if (!emblaApi) return;
                  const visible = getVisibleSlides();
                  emblaApi.scrollTo(index * visible);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
