"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function RecruiterCard({ image, title, date }) {
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
      className={`max-w-sm bg-transparent overflow-hidden cursor-pointer py-0 select-none lg:min-h-120 group rounded-none shadow-none border-0 text-center`}
    >
      {/* Image */}
      {image && (
        <div className="overflow-hidden w-full min-w-auto lg:w-98.25 h-auto lg:h-138.25 rounded-none ">
          <Image
            width={600}
            height={600}
            src={image}
            alt={title}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkAQMAAACt9LhQAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFTS1YmqKgYAAAAA9JREFUeJxjZAACxqFFAAANtgAlZyMZzAAAAABJRU5ErkJggg=="
            className="object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
      )}

      <CardContent className="px-4 rounded-none">
        {/* Title */}
        <CardTitle className="text-lg font-bold text-[#056735]">
          {title}
        </CardTitle>

        {/* Date */}
        {date && <p className="text-[#056735] text-sm mt-4">{formattedDate}</p>}
      </CardContent>
    </Card>
  );
}
