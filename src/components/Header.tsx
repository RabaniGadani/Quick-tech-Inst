"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/Logo.jpg";
import { IoIosArrowDown, IoIosMenu, IoIosClose } from "react-icons/io";
import { compulsoryDetailedData } from "./data/main/compulsoryDetailed";
import { usePathname } from "next/navigation";

const navLinks = [
  { title: "home", link: "/", id: "1" },
  { title: "apply", link: "/Apply", id: "2a" },
  { title: "portal", link: "https://poratl-quick-tech.vercel.app/", id: "2b" },
  { title: "jobs", link: "/Jobs", id: "3" },
  { title: "result", link: "/Result", id: "4" },
  { title: "contact", link: "/Contact", id: "5" },
  { title: "gallery", link: "/gallery", id: "6" },
];

function Header() {
  const [open, setOpen] = useState(false); // For mobile menu
  const [showMenu, setShowMenu] = useState(false); // For courses dropdown
  const pathname = usePathname();

  // For click-outside detection on desktop Courses dropdown
  const coursesDropdownRef = useRef<HTMLDivElement>(null);

  // For click-outside detection for mobile Courses dropdown
  const mobileCoursesDropdownRef = useRef<HTMLDivElement>(null);

  // For click-outside detection for tab menu (applies to both desktop and mobile menu)
  const tabMenuRef = useRef<HTMLDivElement>(null);

  // Detect width for handling desktop/mobile menu separately
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 640 : true
  );

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 640);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    // Handle click outside for ALL menus
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      // 1. Close tab menu if open and click is outside
      if (open) {
        // Click-outside for tab/mobile menu (the colored block menu)
        if (tabMenuRef.current && !tabMenuRef.current.contains(event.target as Node)) {
          setOpen(false);
          setShowMenu(false); // Also close the submenu if open
          return; // Don't continue with submenu
        }
      }
      // 2. Close Courses Dropdown if open and click is outside
      if (showMenu) {
        if (isDesktop) {
          if (
            !coursesDropdownRef.current?.contains(event.target as Node)
          ) {
            setShowMenu(false);
          }
        } else {
          // MOBILE & SMALL SCREEN DROPDOWN
          if (
            !mobileCoursesDropdownRef.current?.contains(event.target as Node)
          ) {
            setShowMenu(false);
          }
        }
      }
    }

    if (showMenu || open) {
      document.addEventListener("mousedown", handleClickOutside as EventListener);
      document.addEventListener("touchstart", handleClickOutside as EventListener);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
      document.removeEventListener("touchstart", handleClickOutside as EventListener);
    };
  }, [showMenu, isDesktop, open]);

  // Close mobile menu (tab menu) automatically when tab link is clicked (i.e., when route changes)
  useEffect(() => {
    if (open) {
      setOpen(false);
      setShowMenu(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // whenever route changes, close menu

  return (
    <div className="sticky top-0 z-30 w-full bg-[#044e83] backdrop-blur-3xl print:hidden">
      <div className="m-auto flex h-16 w-[95%] items-center justify-between md:h-20 lg:w-[90%] xl:w-[1300px]">
        {/* Left section: Logo and Headings */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              width={90}
              className="w-[70px] sm:w-[80px] md:w-[90px]"
            />
          </Link>
          {/* Headings */}
          <>
            <h1 className="text_shadow hidden text-[15px] font-extrabold text-[#b9d8f3] lg:block xl-lg:text-xl xl:text-2xl">
              Quick Tech Institute of Information Technology
            </h1>
            <h1 className="text_shadow text-[1.125rem] font-extrabold text-[#b9d8f3] lg:hidden">
              Quick Tech Institute 
            </h1>
          </>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-5 text-[#FAF9F6] sm:flex lg:gap-10">
          {navLinks.map((item) => (
            <Link href={item.link} key={item.id}>
              <div className="capitalize border-b-2 border-transparent hover:border-white transition-all duration-300">{item.title}</div>
            </Link>
          ))}

          {/* Courses Dropdown */}
          <div
            className="relative cursor-pointer"
            ref={coursesDropdownRef}
          >
            <div
              className="flex items-center capitalize"
              onClick={() => setShowMenu((show) => !show)}
            >
              Courses <IoIosArrowDown className="pl-2 size-5" />
            </div>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg bg-white text-black shadow-lg z-40">
                <div className="p-4">
                  <h1 className="text-left text-lg font-bold text-black pb-3">
                    Core Courses
                  </h1>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(compulsoryDetailedData).map(([id, course]) => (
                      <Link href={`/compulsory/${id}`} key={id}>
                        <div className="p-3 border rounded-lg hover:shadow-md transition-shadow duration-300">
                          <h3 className="text-base font-semibold text-gray-800">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.duration}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle (either hamburger or close icon) */}
        <div
          className="sm:hidden text-[#FAF9F6] cursor-pointer"
          onClick={() => {
            setOpen(prevOpen => {
              // Always close submenu when toggling mobile menu
              if (prevOpen) setShowMenu(false);
              return !prevOpen;
            });
          }}
          aria-label="Toggle navigation menu"
        >
          {open ? (
            <IoIosClose size={30} data-testid="close-icon" />
          ) : (
            <IoIosMenu size={30} data-testid="menu-icon" />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={
          `sm:hidden bg-[#044e83] text-[#FAF9F6] flex flex-col gap-4 p-5 absolute top-full left-0 w-full z-20` +
          (open ? "" : " hidden")
        }
        ref={tabMenuRef}
      >
        {/* Remove the redundant close button here */}

        {navLinks.map((item) => (
          <Link href={item.link} key={item.id}>
            <div className="capitalize border-b-2 border-transparent hover:border-white transition-all duration-300">{item.title}</div>
          </Link>
        ))}
        <div className="relative" ref={mobileCoursesDropdownRef}>
          <div
            className="flex items-center capitalize"
            onClick={() => setShowMenu((show) => !show)}
          >
            Courses <IoIosArrowDown className="pl-2 size-5" />
          </div>
          {showMenu && (
            <div className="mt-2 rounded-lg bg-white text-black shadow-lg z-40">
              <div className="p-4">
                <h1 className="text-left text-lg font-bold text-black pb-3">
                  Core Courses
                </h1>
                <div className="flex flex-col space-y-2 text-base text-gray-800">
                  {Object.entries(compulsoryDetailedData).map(([id, course]) => (
                    <Link
                      href={`/compulsory/${id}`}
                      key={id}
                      className="block"
                    >
                      <span>
                        {course.title}
                        {course.duration && (
                          <span className="text-sm text-gray-600"> ({course.duration})</span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
