"use client";

import { useState } from "react";
import NewsCard from "../utilities/NewsCard";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { IconExclamationCircle } from "@tabler/icons-react";

export default function NewsPostsClient({ posts, tags }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const handleToggle = (tag) => {
    setActiveTags(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // remove if already active
          : [...prev, tag], // add if not active
    );
  };

  // Filter posts by search query AND active tags

  const filteredPosts = posts.filter((post) => {
    const item = post.newsPostsCoreFields;

    // Get an array of tag strings for this post, trimmed and lowercase
    const postTagStrings =
      item.tags?.map((t) => {
        const tagStr = typeof t === "string" ? t : t.tag;
        return tagStr?.toLowerCase().trim();
      }) || [];

    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();

    // Title search match (case-insensitive, trimmed)
    const titleMatch = item.title
      .toLowerCase()
      .trim()
      .includes(normalizedQuery);

    // Tag search match (case-insensitive, trimmed)
    const tagsMatchQuery = postTagStrings.some((tag) =>
      tag.includes(normalizedQuery),
    );

    // Active tag filter (case-insensitive, trimmed)
    const activeTagsMatch =
      activeTags.length === 0 ||
      activeTags.some((active) =>
        postTagStrings.includes(active.toLowerCase().trim()),
      );

    return (titleMatch || tagsMatchQuery) && activeTagsMatch;
  });

  return (
    <div className="relative pb-10 lg:pb-20 px-6 min-h-50 bg-[#ECF8EF]">
      <h2 className="relative text-[30px] md:text-[48px] font-extrabold font-nunito mb-6 select-none text-[#000E47] text-center pt-14 lg:pb-14">
        What are you looking for?
      </h2>

      {/* Search Field */}
      <div className="relative max-w-md mx-auto lg:mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Resources here..."
          className="w-full bg-white border border-gray-300 rounded-lg pr-12 pl-4 py-2 focus:outline-none focus:ring-0 focus:ring-[#036735] focus:border-[#036735]"
        />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <button className="bg-[#036735] hover:bg-[#036735] text-white p-2 rounded-r-lg">
            <IconSearch className="w-14 h-6" />
          </button>
        </div>
      </div>

      <div className="max-w-282 py-10 mx-auto flex flex-wrap items-center justify-center select-none">
        <div className="text-[#3C3E47] text-[16px] mr-6 mb-6 md:mb-0">
          Filter by:
        </div>

        <div className="flex flex-wrap gap-2 space-y-2 md:space-y-0 justify-center md:justify-start">
          {tags.map((tagObj, index) => {
            const isActive = activeTags.includes(tagObj.tag);

            return (
              <span
                key={index}
                onClick={() => handleToggle(tagObj.tag)}
                className={`
                text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition
                border-2 border-[#6B0071]
                ${
                  isActive
                    ? "bg-[#6B0071] text-white"
                    : "bg-transparent text-[#6B0071] hover:bg-[#6B0071] hover:text-white"
                }
              `}
              >
                {tagObj.tag}
              </span>
            );
          })}
        </div>
      </div>

      {/* News Cards */}
      <div className="flex flex-wrap items-center justify-center gap-6 lg:p-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => {
            const item = post.newsPostsCoreFields;
            return (
              <Link
                key={"newspost" + index}
                href={"/knowledge-hub/" + post?.slug}
              >
                <NewsCard
                  image={item.cardImg?.node.sourceUrl}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  tags={item.tags}
                />
              </Link>
            );
          })
        ) : (
          <div className="w-full max-w-md flex justify-center text-center py-4 text-[#000E47] text-lg">
            <IconExclamationCircle className="w-14 h-6" /> No posts found
          </div>
        )}
      </div>
    </div>
  );
}
