import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function MenuItemDesktop({ item }) {
  const hasChildren = item.subMenuItems?.length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const openMenu = () => {
    clearTimeout(timeoutRef.current);
    setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // delay to allow moving mouse to dropdown
  };

  const cancelClose = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <li className="relative">
      {/* Trigger */}
      {hasChildren ? (
        <div
          className="flex items-center gap-2 text-white cursor-pointer transition"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          {item.label}
          {hasChildren && (
            <img
              src="/icons/chevron-down.svg"
              alt="icon"
              width={14}
              height={14}
              className={`mt-0.5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </div>
      ) : (
        <Link href={item.link}>
          <div
            className="flex items-center gap-2 text-white cursor-pointer transition"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            {item.label}
          </div>
        </Link>
      )}

      {/* Dropdown */}
      {hasChildren && (
        <ul
          className={`
            absolute left-0 top-full mt-1
            bg-white rounded overflow-hidden shadow-lg
            min-w-[200px] z-50
            transition-all duration-200 ease-out
            ${
              isOpen
                ? "block scale-100 pointer-events-auto"
                : "hidden scale-95 pointer-events-none"
            }
          `}
          onMouseEnter={cancelClose} // cancel closing while hovering dropdown
          onMouseLeave={closeMenu} // start close timeout when leaving dropdown
          onClick={closeMenu} // start close timeout when leaving dropdown
        >
          {item.subMenuItems.map((sub, index) => (
            <li key={`submenu-${index}`}>
              <Link
                href={sub.link}
                className="block relative px-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap pointer-events-auto cursor-pointer"
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default MenuItemDesktop;
