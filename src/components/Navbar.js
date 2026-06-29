"use client";
import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Hover states for desktop dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null); // 'services' | 'more' | null
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile navbar and dropdowns when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // slight delay to prevent flickering
  };

  const servicesDropdownItems = [
    { label: "All Services", href: "/services" },
    { label: "Bridal Mehendi", href: "/bridal-mehendi" },
  ];

  const moreDropdownItems = [
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
  ];

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { 
      label: "Services", 
      type: "dropdown", 
      id: "services", 
      items: servicesDropdownItems,
      isActiveGroup: pathname === "/services" || pathname === "/bridal-mehendi"
    },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
    { 
      label: "More", 
      type: "dropdown", 
      id: "more", 
      items: moreDropdownItems,
      isActiveGroup: pathname === "/testimonials" || pathname === "/faq"
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "backdrop-blur-md py-4 shadow-lg border-b border-accent/20"
            : "py-6"
        }`}
        style={{
          backgroundColor: scrolled || isOpen ? "rgba(91, 15, 26, 0.98)" : "transparent",
        }}
      >
        <div className="max-w-[92rem] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Name / Logo */}
          <Link href="/" className="flex flex-col select-none group">
            <span className={`font-serif text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide transition-colors duration-300 ${
              scrolled || isOpen ? "text-accent text-glow" : "text-primary"
            }`}>
              Henna by Naaz
            </span>
            <span className={`text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-sans -mt-1 transition-colors duration-300 ${
              scrolled || isOpen ? "text-bg-ivory/80" : "text-secondary"
            }`}>
              BY TABASSUM
            </span>
          </Link>

          {/* Desktop Links with Dropdowns */}
          <div className="hidden xl:flex items-center gap-9">
            {mainLinks.map((link) => {
              if (link.type === "dropdown") {
                return (
                  <div
                    key={link.label}
                    className="relative py-1.5"
                    onMouseEnter={() => handleMouseEnter(link.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      className={`font-sans text-xs tracking-widest uppercase flex items-center gap-1 transition-all duration-300 select-none cursor-pointer ${
                        scrolled
                          ? link.isActiveGroup
                            ? "text-accent font-semibold"
                            : "text-bg-warm hover:text-accent"
                          : link.isActiveGroup
                          ? "text-accent font-bold"
                          : "text-primary hover:text-accent"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeDropdown === link.id ? "rotate-180 text-accent" : ""
                      }`} />
                    </button>

                    {/* Animated Dropdown Menu Card */}
                    <AnimatePresence>
                      {activeDropdown === link.id && (
                        <motion.div
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 border luxury-shadow-sm p-2 flex flex-col gap-1 z-50 ${
                            scrolled
                              ? "bg-primary border-accent/30 text-bg-ivory"
                              : "bg-bg-ivory border-accent/20 text-primary"
                          }`}
                          initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                          animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                          exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.items.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className={`px-4 py-2.5 text-xs tracking-wider uppercase font-sans transition-colors duration-200 text-left ${
                                  scrolled
                                    ? isSubActive
                                      ? "bg-accent/10 text-accent font-bold"
                                      : "hover:bg-accent/10 hover:text-accent"
                                    : isSubActive
                                    ? "bg-bg-warm text-accent font-bold"
                                    : "hover:bg-bg-warm hover:text-accent"
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-sans text-xs tracking-widest uppercase transition-all duration-300 relative py-1.5 group ${
                    scrolled
                      ? isActive
                        ? "text-accent font-semibold"
                        : "text-bg-warm hover:text-accent"
                      : isActive
                      ? "text-accent font-bold"
                      : "text-primary hover:text-accent"
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
            
            <Link
              href="/contact"
              className="ml-2 px-6 py-3 bg-primary hover:bg-accent text-bg-ivory hover:text-primary font-sans text-xs tracking-widest uppercase border border-primary hover:border-accent transition-all duration-300 shadow-md font-semibold"
            >
              Book Session
            </Link>
          </div>

          {/* Tablet/Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`xl:hidden transition-colors relative z-50 p-2 ${
              scrolled || isOpen ? "text-accent hover:text-bg-warm" : "text-primary hover:text-accent"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`xl:hidden fixed inset-0 top-[73px] z-50 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ backgroundColor: "#5B0F1A" }}
      >
        <div className="flex flex-col items-center justify-start h-[calc(100vh-73px)] gap-5 px-6 overflow-y-auto py-10">
          {mainLinks.map((link) => {
            if (link.type === "dropdown") {
              return (
                <div key={link.label} className="w-full flex flex-col items-center gap-3 py-1">
                  <span className="font-serif text-lg tracking-wider text-accent/60 uppercase font-semibold">
                    {link.label}
                  </span>
                  <div className="flex flex-col items-center gap-3 bg-primary-dark/10 w-full py-2">
                    {link.items.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className={`font-serif text-lg tracking-wide transition-colors ${
                            isSubActive ? "text-accent font-bold" : "text-bg-warm hover:text-accent"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-serif text-xl tracking-wide transition-colors ${
                  isActive ? "text-accent font-semibold" : "text-bg-warm hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="w-full max-w-xs text-center px-6 py-3.5 bg-accent text-primary font-sans text-sm tracking-wider uppercase border border-accent hover:bg-transparent hover:text-accent transition-all duration-300 mt-4 shrink-0"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </>
  );
}
