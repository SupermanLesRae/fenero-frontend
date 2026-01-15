import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileMenuItem({ item, callback }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.subMenuItems;

  return (
    <div className="border-b border-white/10 last:border-b-0">
      {hasChildren ? (
        <>
          <button
            className="flex justify-between items-center w-full text-left font-semibold text-white py-3"
            onClick={() => setOpen(!open)}
          >
            {item.label}
            <Image
              unoptimized
              src="/icons/chevron-down.svg"
              alt="icon"
              width={14}
              height={14}
              className={`mt-0.5 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="mt-2 ml-3 pl-3 space-y-2">
              {item.subMenuItems.map((child, index) => (
                <MobileMenuItem key={"child.id" + index} item={child} />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link href={item.link || "#"} onClick={() => callback()}>
          <span className="flex justify-between items-center w-full text-left font-semibold text-white pb-5">
            {item.label}
          </span>
        </Link>
      )}
    </div>
  );
}
