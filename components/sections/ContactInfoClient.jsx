"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";

export default function ContactInfoClient({ sectionData, bgColor }) {
  return (
    <div
      className="relative w-full h-full xl:py-20 xl:px-20"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative pb-10 lg:pb-20 max-w-365 xl:rounded-3xl border-white overflow-hidden mx-auto">
        <h2
          style={{ color: sectionData.styling.titlecolor }}
          className="relative text-[30px] md:text-[48px] leading-10 md:leading-14 font-extrabold font-nunito select-none text-center pt-10 lg:pt-20 pb-4 z-11 max-w-250 mx-auto"
        >
          {sectionData.title}
        </h2>

        <p
          style={{ color: sectionData.styling.textcolor }}
          dangerouslySetInnerHTML={{ __html: sectionData.description }}
          className="relative font-nunito font-medium text-[20px] text-center leading-7 tracking-[0.15px] select-none px-8 max-w-250 z-10 mx-auto "
        />

        <div className="absolute w-full h-full z-0 left-0 top-0">
          <Image
            src={sectionData.img.node.sourceUrl}
            alt={sectionData.img.node.altText || "Image"}
            className="w-full h-full object-cover"
            width={1411}
            height={480}
          />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col justify-center mt-10 md:flex-row gap-4 w-full px-6 md:px-0 ">
            {sectionData.ctaLinks.map((cta, index) => {
              const link = cta.link || "";
              const isAnchor = link.includes("#");
              const scrollToId = isAnchor ? link.split("#")[1] : null;

              if (isAnchor) {
                return (
                  <a
                    key={index}
                    className="w-full lg:w-auto flex"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(scrollToId);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <Button
                      size="lg"
                      style={{
                        backgroundColor: cta.styling.backgroundcolor,
                        color: cta.styling.textcolor,
                        borderColor:
                          cta.styling.bordercolor ||
                          cta.styling.backgroundcolor,
                      }}
                      className="font-bold hover:text-white text-[16px] border-2 cursor-pointer shadow-md transition hover:opacity-90 flex items-center justify-center gap-2 min-w-56"
                    >
                      {cta?.icon?.node.sourceUrl && (
                        <Image
                          width={18}
                          height={20}
                          src={cta?.icon?.node.sourceUrl}
                          alt=""
                        />
                      )}
                      {cta.title}
                      {cta.hasArrow && <IconArrowRight stroke={2} />}
                    </Button>
                  </a>
                );
              }

              return (
                <Link
                  key={index}
                  href={link}
                  target={
                    link?.includes(".pdf") || link?.includes("http")
                      ? "_blank"
                      : "_self"
                  }
                  rel={
                    link?.includes(".pdf") || link?.includes("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-auto"
                >
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: cta.styling.backgroundcolor,
                      color: cta.styling.textcolor,
                      borderColor:
                        cta.styling.bordercolor || cta.styling.backgroundcolor,
                    }}
                    className="font-bold hover:text-white text-[16px] border-2 cursor-pointer shadow-md transition hover:opacity-90 flex items-center justify-center gap-2 min-w-56"
                  >
                    {cta?.icon?.node.sourceUrl && (
                      <Image
                        width={18}
                        height={20}
                        src={cta?.icon?.node.sourceUrl}
                        alt=""
                      />
                    )}
                    {cta.title}
                    {cta.hasArrow && <IconArrowRight stroke={2} />}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
