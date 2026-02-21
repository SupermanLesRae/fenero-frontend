"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToSection() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("callBack");

  useEffect(() => {
    if (scrollTo !== null) {
      const el = document.getElementById("callBack");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [scrollTo]);

  return null;
}
