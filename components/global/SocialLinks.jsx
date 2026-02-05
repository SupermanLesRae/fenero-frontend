"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SocialLinks({ menu }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }
  }, []);

  const getSocialLink = (url) => {
    if (!isMobile) return url; // desktop → normal link

    // FACEBOOK
    if (url.includes("facebook.com")) {
      return `fb://facewebmodal/f?href=${encodeURIComponent(url)}`;
    }

    // INSTAGRAM
    if (url.includes("instagram.com")) {
      // Opens Instagram app profile
      const username = url.split("instagram.com/")[1]?.replace("/", "");
      return `instagram://user?username=${username}`;
    }

    // LINKEDIN
    if (url.includes("linkedin.com")) {
      return `linkedin://in`;
      // Note: LinkedIn app support is limited.
      // App will open but may not deep-link to profile.
    }

    return url;
  };

  return (
    <>
      {menu.socialLinks.map((item, index) => {
        const finalUrl = getSocialLink(item.url);

        const openInNewTab =
          item.url?.includes(".pdf") || item.url?.startsWith("http");

        return (
          <Link
            key={index}
            href={finalUrl}
            target={openInNewTab ? "_blank" : "_self"}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
            className="hover:text-[#D1DF20] transition"
          >
            <Image
              src={`${item?.icon?.node?.sourceUrl}`}
              alt="Social Icon"
              className="w-4.5 h-4.5"
              width={18}
              height={18}
            />
          </Link>
        );
      })}
    </>
  );
}
