"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion.create(Link);

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  target,
  rel,
  disabled = false,
}) {
  const baseStyles = "inline-flex items-center justify-center font-sans uppercase text-xs sm:text-sm tracking-widest transition-all duration-300 select-none cursor-pointer focus:outline-none";
  
  const variants = {
    primary: "px-8 py-4 bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent shadow-md",
    outline: "px-8 py-4 bg-transparent text-primary border border-primary/20 hover:border-accent hover:text-accent",
    accent: "px-8 py-4 bg-accent text-primary border border-accent hover:bg-bg-ivory hover:text-primary hover:border-bg-ivory shadow-lg font-semibold",
    accentOutline: "px-8 py-4 bg-transparent text-bg-ivory border border-bg-ivory/40 hover:border-bg-ivory hover:bg-bg-ivory/10",
    text: "p-2 bg-transparent text-primary hover:text-accent font-semibold tracking-wider",
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`;

  const hoverAnimation = disabled ? {} : { scale: 1.02 };
  const tapAnimation = disabled ? {} : { scale: 0.98 };

  if (href) {
    // Check if it's an external link
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("https://wa.me");

    if (isExternal) {
      return (
        <motion.a
          href={href}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className={buttonStyles}
          whileHover={hoverAnimation}
          whileTap={tapAnimation}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <MotionLink
        href={href}
        className={buttonStyles}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      {children}
    </motion.button>
  );
}
