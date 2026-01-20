"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

export default function NewsCard({
  image,
  title,
  description,
  date,
  tags,
  type,
}) {
  const dateObj = date ? new Date(date) : null;

  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Card
      className={`max-w-sm bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer py-0 p-6 select-none ${
        type === "small" ? "min-h-130" : "min-h-auto lg:min-h-155"
      } group`}
    >
      {/* Image */}
      {image && (
        <div className="overflow-hidden max-h-75 rounded-xl">
          <Image
            unoptimized
            width={334}
            height={317}
            src={image}
            alt={title}
            className="w-full h-auto  object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      )}

      <CardContent className="px-4">
        {/* Title */}
        <CardTitle className="text-lg font-bold text-gray-800">
          {title}
        </CardTitle>

        {/* Description */}
        <CardDescription className="text-gray-600 mt-2 line-clamp-3">
          {description}
        </CardDescription>

        {/* Date */}
        {date && <p className="text-gray-400 text-sm mt-4">{formattedDate}</p>}

        {/* Tags */}
        {tags && (
          <div className="flex flex-wrap justify-start gap-2 mt-4">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-[#6B0071] text-white text-sm font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
