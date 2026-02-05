"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconCalendarEvent } from "@tabler/icons-react";
import { Button } from "../ui/button";

export default function LoadMoreClient({ blocks, sectionData, section }) {
  const [visible, setVisible] = useState(3);

  // Store refs for every item
  const itemRefs = useRef([]);

  // FORMAT DATE -----------------------------------
  function formatDate(date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  // LOAD MORE + SCROLL -----------------------------
  const handleLoadMore = () => {
    const previous = visible; // Currently shown count
    const next = previous + 3; // New count
    setVisible(next);

    // Make sure items render before scrolling
    setTimeout(() => {
      const targetEl = itemRefs.current[previous];
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 120);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 px-6 max-w-[1300px] mx-auto">
        {blocks.slice(0, visible).map((item, index) => (
          <Link
            key={"posts_" + index}
            ref={(el) => (itemRefs.current[index] = el)} // attach ref
            href={"/knowledge-hub/" + item.slug}
            className="w-full sm:w-[400px] flex flex-col bg-white rounded-[20px] shadow-md hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <div className="relative ml-5 mr-5 mt-5 overflow-hidden flex items-center rounded-2xl justify-center max-h-[300px]">
              <Image
                width={400}
                height={380}
                className="w-full h-full object-cover object-top-left"
                src={item.newsPostsCoreFields.cardImg.node.sourceUrl}
                alt={item.newsPostsCoreFields.title}
              />

              {/* TAGS */}
              <div className="absolute top-8 left-8 flex flex-wrap gap-2">
                {sectionData.slugtotag
                  .filter(
                    (slugObj) =>
                      slugObj.slugselect[0].toLowerCase() ===
                      section.toLowerCase(),
                  )
                  .flatMap((slugObj) => slugObj.tags)
                  .filter((tag) =>
                    item.newsPostsCoreFields.tags
                      .map((t) => t.toLowerCase())
                      .includes(tag.toLowerCase()),
                  )
                  .map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-white bg-[#056735] rounded-full px-4 py-2 text-sm font-bold"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col">
              <h3 className="text-lg font-semibold line-clamp-1">
                {item.newsPostsCoreFields.title}
              </h3>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {item.newsPostsCoreFields.description}
              </p>

              <p className="text-gray-400 text-sm mt-4 flex gap-2 items-center">
                <IconCalendarEvent size={20} stroke={1} />
                {formatDate(item.newsPostsCoreFields.date)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* LOAD MORE BUTTON */}
      {visible < blocks.length && (
        <Button
          size="lg"
          onClick={handleLoadMore}
          className="mt-10 font-bold border-2 w-auto border-[#056735] bg-transparent text-[#056735] hover:bg-[#056735] hover:text-white text-[16px] cursor-pointer shadow-md transition flex items-center justify-center gap-2 min-w-56"
        >
          Load More
        </Button>
      )}
    </>
  );
}
