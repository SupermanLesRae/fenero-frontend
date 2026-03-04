"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollToSection() {
  const searchParams = useSearchParams();
  const scrollTo = searchParams.get("scrollTo");

  useEffect(() => {
    if (scrollTo !== null) {
      const el = document.getElementById(scrollTo);
      if (el) {
        console.log("test");
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [scrollTo]);

  return null;
}
