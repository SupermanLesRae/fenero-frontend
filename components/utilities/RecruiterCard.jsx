"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

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
      className={`max-w-sm bg-transparent overflow-hidden cursor-pointer py-0 select-none min-h-120 group rounded-none shadow-none border-0 text-center`}
    >
      {/* Image */}
      {image && (
        <div className="overflow-hidden w-[393px] h-[553px] rounded-none">
          <img
            src={image}
            alt={title}
            className="w-full h-full  object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
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
