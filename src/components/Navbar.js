"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Process", href: "#process" },
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
          backgroundColor: scrolled || isOpen ? "rgba(91, 15, 26, 0.95)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Name */}
          <a href="#home" className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-accent text-glow">
              Henna by Naaz
            </span>
            <span className={`text-[10px] tracking-[0.25em] uppercase font-sans -mt-1 transition-colors duration-300 ${
              scrolled ? "text-bg-ivory/80" : "text-primary/75"
            }`}>
              BY TABASSUM
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-sans text-sm tracking-wider uppercase transition-colors duration-300 relative group ${
                  scrolled ? "text-bg-warm hover:text-accent" : "text-primary hover:text-secondary"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#booking"
              className="px-6 py-2.5 bg-accent hover:bg-bg-ivory text-primary hover:text-primary font-sans text-sm tracking-wider uppercase rounded-none border border-accent transition-all duration-300 shadow-md"
            >
              Book Session
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors relative z-50 ${
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
        className={`md:hidden fixed inset-0 top-[73px] z-50 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ backgroundColor: "#5B0F1A" }}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-73px)] gap-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-2xl tracking-wide text-bg-warm hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs text-center px-6 py-4 bg-accent text-primary font-sans text-md tracking-wider uppercase border border-accent hover:bg-transparent hover:text-accent transition-all duration-300"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </>
  );
}
