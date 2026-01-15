"use client";

import Link from "next/link";
import { useEffect } from "react";
import MenuItemDesktop from "@/components/navigation/MenuItemDesktop";
import MobileMenuItem from "@/components/navigation/MobileMenuItem";
import Image from "next/image";
import SearchOverlay from "./SearchOverlay";
import { useState } from "react";

export default function HeaderMenu({ menu }) {
  const logo = menu.logo.node.sourceUrl;
  const loginCta = menu.loginCta;
  const navigation = menu.menuItems;

  const [open, setOpen] = useState(false);

  if (!menu) return null;

  // MOBILE MENU CLOSE
  const closeMenu = () => {
    menuPanel.classList.add("-translate-x-full");
    setTimeout(() => menuOverlay.classList.add("hidden"), 300);
  };

  useEffect(() => {
    const menuBtn = document.getElementById("mobile-menu-button");
    const menuOverlay = document.getElementById("mobileMenu");
    const menuPanel = document.getElementById("mobileMenuPanel");
    const closeMenuBtn = document.getElementById("closeMobileMenu");

    if (!menuBtn || !menuOverlay || !menuPanel || !closeMenuBtn) return;

    // MOBILE MENU OPEN
    const openMenu = () => {
      menuOverlay.classList.remove("hidden");
      setTimeout(() => menuPanel.classList.remove("-translate-x-full"), 10);
    };

    // MOBILE MENU CLOSE
    const closeMenu = () => {
      menuPanel.classList.add("-translate-x-full");
      setTimeout(() => menuOverlay.classList.add("hidden"), 300);
    };

    menuBtn.addEventListener("click", openMenu);
    closeMenuBtn.addEventListener("click", closeMenu);

    const handleOverlayClick = (e) => {
      if (e.target === menuOverlay) closeMenu();
    };
    menuOverlay.addEventListener("click", handleOverlayClick);

    return () => {
      menuBtn.removeEventListener("click", openMenu);
      closeMenuBtn.removeEventListener("click", closeMenu);
      menuOverlay.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  return (
    <header className="select-none z-50">
      {/* Top Right login + search */}
      <div className="w-full absolute pr-10 xl:pr-20 max-w-430 left-1/2 -translate-x-1/2 h-8.75 top-14 xl:top-6 flex justify-end gap-4 z-50">
        <div className="gap-4 flex">
          <Link href={loginCta.url} className="pointer-events-auto">
            <div className="hidden sm:flex items-center gap-2 font-semibold text-[18px] text-white bg-transparent border-2 border-[#D1DF20] hover:bg-[#D1DF20] hover:text-[#000E47] px-6 py-1 rounded-lg transition">
              {loginCta.label}
            </div>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="pointer-events-auto cursor-pointer flex items-center font-semibold text-[18px] text-white bg-transparent hover:bg-[#38BB3F] rounded-lg transition"
          >
            {/* Search icon */}
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.7587 26.7582L22.2839 22.2834M24.7013 16.4713C24.7013 21.0163 21.0168 24.7009 16.4718 24.7009C11.9267 24.7009 8.24219 21.0163 8.24219 16.4713C8.24219 11.9262 11.9267 8.2417 16.4718 8.2417C21.0168 8.2417 24.7013 11.9262 24.7013 16.4713Z"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-button"
          className="cursor-pointer text-white focus:outline-none xl:hidden pointer-events-auto"
        >
          <svg
            width="33"
            height="20"
            viewBox="0 0 33 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="1"
              x2="31.5"
              y2="1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="9.68"
              x2="31.5"
              y2="9.68"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="18.36"
              x2="31.5"
              y2="18.36"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <nav className="relative bg-[#000E47] shadow px-0 py-6 z-10 font-semibold">
        <div className="max-w-500 px-10 xl:px-20 mx-auto flex items-end justify-between bg-[#000E47]">
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <div className="text-2xl font-bold">
              <Image
                unoptimized
                src={logo}
                alt="Logo"
                width={121}
                height={84}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="relative items-center gap-x-12 2xl:gap-x-18 hidden xl:flex">
            {navigation.map((nav, index) => (
              <MenuItemDesktop key={`header_${index}`} item={nav} />
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobileMenu"
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 hidden"
      >
        <div
          className="w-72 h-full bg-[#000E47] shadow-xl transform -translate-x-full transition-transform duration-300"
          id="mobileMenuPanel"
        >
          <div className="p-5 border-b border-white/20 flex justify-between items-center">
            <Link href="/" onClick={() => closeMenu()}>
              <Image
                unoptimized
                src={logo}
                alt="Logo"
                width={120}
                height={120}
              />
            </Link>
            <button id="closeMobileMenu" className="p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="p-5 space-y-5 font-medium text-[16px]">
            {navigation.map((nav, index) => {
              const dropdownId = `mobileDropdown${index}`;
              return (
                <MobileMenuItem
                  key={dropdownId}
                  item={nav}
                  callback={closeMenu}
                />
              );
            })}

            <Link href={loginCta.url}>
              <button className="cursor-pointer w-full flex justify-center items-center gap-2 text-center font-semibold text-[18px] text-white bg-transparent border-2 border-[#D1DF20] hover:bg-[#D1DF20] hover:text-[#000E47] px-6 py-2 rounded-lg transition">
                {loginCta.label}
              </button>
            </Link>
          </nav>
        </div>
      </div>
      <SearchOverlay isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}
