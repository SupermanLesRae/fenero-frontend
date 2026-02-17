"use client";
import { ArrowUp } from "lucide-react";
import { ArrowUpNarrowWide } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hasScrolled = window.scrollY > 300;
      setVisible(hasScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group fixed bottom-4 right-4 w-12 h-12 flex justify-center items-center cursor-pointer rounded-full border-3 border-[#AFCE67] shadow-md bg-[#AFCE67] hover:bg-[#000E47] transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp
        size={20}
        className="text-[#000E47] group-hover:text-[#AFCE67] transition-colors"
      />
    </button>
  );
}
