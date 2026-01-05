"use client";

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function TrueSizeGridGallery({ images, square }) {
  const [index, setIndex] = useState(null);
  const [sizes, setSizes] = useState({});

  useEffect(() => {
    images.forEach((img) => {
      const image = new window.Image();
      image.src = img.sourceUrl;
      image.onload = () => {
        setSizes((prev) => ({
          ...prev,
          [img.sourceUrl]: { width: image.width, height: image.height },
        }));
      };
    });
  }, [images]);

  return (
    <>
      {/* Container with max width and centered */}
      <div className="mx-auto max-w-[1200px]">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: square
              ? "repeat(auto-fit, minmax(150px, 1fr))" // smaller columns if square exists
              : "repeat(auto-fit, minmax(300px, 1fr))", // default
          }}
        >
          {images.map((img, i) => {
            const size = sizes[img.sourceUrl] || { width: 1, height: 1 };
            const aspectRatio = size.height / size.width;

            // If square, reduce size to 50%
            const paddingPercent = aspectRatio * 100;

            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="relative w-full rounded-lg overflow-hidden focus:outline-none"
                style={{ paddingBottom: `${paddingPercent}%` }}
              >
                <img
                  src={img.sourceUrl}
                  alt={img.altText || ""}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        index={index || 0}
        slides={images.map((img) => ({ src: img.sourceUrl }))}
      />
    </>
  );
}
