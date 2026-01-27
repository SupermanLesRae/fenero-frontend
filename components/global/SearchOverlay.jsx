"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { IconArrowRight } from "@tabler/icons-react";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const boxRef = useRef(null);

  /* ------------------ FETCH RESULTS ------------------ */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/search?q=${query}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        // NO EXTRA FILTERING NEEDED
        setResults(data);
      } catch (e) {
        // ignore abort errors
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchResults, 300);
    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  /* ------------------ CLICK OUTSIDE ------------------ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setLoading(false);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      router.push(results[0].slug);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-start overflow-auto">
      <div
        ref={boxRef}
        className="w-full max-w-3xl mt-24 bg-transparent rounded-xl p-6"
      >
        {/* ------------------ Search Input ------------------ */}
        <div className="flex items-center gap-2">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search the site..."
            className="w-full px-4 py-3 rounded-lg border border-[#ffffff] bg-transparent text-white placeholder-white/80 focus:outline-none focus:ring-1 focus:ring-[#ffffff]"
          />
          <button
            onClick={handleClose}
            className="text-sm text-[#ffffff] hover:text-green-600 cursor-pointer scale-150 ml-4"
          >
            ✕
          </button>
        </div>

        {/* ------------------ Results ------------------ */}
        <div className="mt-4">
          {loading && <p className="text-white py-4 text-center">Loading...</p>}

          {!loading && query && results.length === 0 && (
            <p className="text-white py-4 text-center">
              No results found for &quot;{query}&quot;.
            </p>
          )}

          {!loading && results.length > 0 && (
            <ul className="flex flex-col w-full gap-2">
              {results.slice(0, 4).map((item) => (
                <li
                  key={item.id}
                  className="w-full cursor-pointer text-black hover:text-white border-b border-gray-300 py-3 px-6 bg-white hover:bg-[#000E47] rounded-lg transition-colors duration-200"
                  onClick={() => {
                    router.push(item.slug);
                    handleClose();
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ------------------ View All Results Button ------------------ */}
        {!loading && query && results.length > 0 && (
          <div className="flex-1 text-left mt-2">
            <Link
              href={`/search?q=${query}`}
              onClick={handleClose}
              className="w-full"
            >
              <Button
                size="lg"
                className="cursor-pointer w-full lg:w-auto transition shadow-sm bg-[#AFCE67] hover:bg-[#D1DF20] shadow-[#AFCE67]/30 hover:shadow-[#AFCE67]/10"
              >
                <span className="font-bold text-[16px] text-black">
                  View all results
                </span>
                <IconArrowRight color="#000000" stroke={2} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
