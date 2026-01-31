"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function RecruiterCard({
  image,
  title,
  date,
  downloadURL,
  gotoPage,
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
      className={`overflow-hidden max-w-sm bg-transparent cursor-pointer py-0 select-none group rounded-none shadow-none border-0 text-center`}
    >
      {/* Image */}
      {image && (
        <>
          {downloadURL ? (
            <Link href={downloadURL} target="_blank" rel="noopener noreferrer">
              <div className="w-auto h-auto rounded-[30] overflow-hidden scale-90 shadow-lg hover:shadow-xs border-4 border-[#38BB3F] hover:border-[#D1DF20] transition-colors duration-200">
                <Image
                  width={400}
                  height={380}
                  src={image}
                  alt={title}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkAQMAAACt9LhQAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFTS1YmqKgYAAAAA9JREFUeJxjZAACxqFFAAANtgAlZyMZzAAAAABJRU5ErkJggg=="
                  className="object-cover transform transition-transform duration-300 ease-in-out scale-110"
                />
              </div>
            </Link>
          ) : (
            <div className="w-auto h-auto rounded-[30] overflow-hidden scale-90 shadow-lg border-4 border-[#38BB3F] opacity-50 cursor-not-allowed">
              <Image
                width={400}
                height={380}
                src={image}
                alt={title}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkAQMAAACt9LhQAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFTS1YmqKgYAAAAA9JREFUeJxjZAACxqFFAAANtgAlZyMZzAAAAABJRU5ErkJggg=="
                className="object-cover transform transition-transform duration-300 ease-in-out scale-110"
              />
            </div>
          )}
        </>
      )}

      <Link href={gotoPage}>
        <CardContent className="px-4 rounded-none text-[#056735] no-underline hover:underline">
          {/* Title */}
          <CardTitle className="text-lg font-bold ">{title}</CardTitle>

          {/* Date */}
          {date && <p className="text-sm ">{formattedDate}</p>}
        </CardContent>
      </Link>
    </Card>
  );
}
