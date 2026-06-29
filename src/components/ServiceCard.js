"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Clock, Users } from "lucide-react";
import Button from "./Button";

export default function ServiceCard({
  title,
  desc,
  price,
  image,
  duration,
  suitableFor,
  icon: IconComp = Sparkles,
  index = 0,
  full = false,
  priority = false,
}) {
  if (full) {
    return (
      <motion.div
        className="bg-bg-warm/60 border border-accent/25 flex flex-col justify-between hover:bg-bg-tan/20 transition-all duration-500 luxury-shadow-sm hover:shadow-lg relative group overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
        
        {/* Service Image */}
        {image && (
          <div className="relative w-full h-64 overflow-hidden border-b border-accent/20">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-accent group-hover:bg-primary/10 transition-colors">
                <IconComp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                {title}
              </h3>
            </div>
            
            <p className="font-sans text-sm text-primary/80 leading-relaxed mb-6">
              {desc}
            </p>

            {/* Service Details */}
            <div className="space-y-3 mb-6 pt-4 border-t border-accent/10">
              {duration && (
                <div className="flex items-center gap-2 text-xs text-primary/70">
                  <Clock className="w-4 h-4 text-secondary shrink-0" />
                  <span><strong>Duration:</strong> {duration}</span>
                </div>
              )}
              {suitableFor && (
                <div className="flex items-center gap-2 text-xs text-primary/70">
                  <Users className="w-4 h-4 text-secondary shrink-0" />
                  <span><strong>Suitable for:</strong> {suitableFor}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            {/* Price and Book Action */}
            <div className="flex items-center justify-between border-t border-accent/15 pt-4 mt-4">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] tracking-wider uppercase text-secondary font-semibold">
                  Starting Price
                </span>
                <span className="font-serif text-lg text-accent font-bold">
                  {price}
                </span>
              </div>
              <Button
                variant="primary"
                href={`/contact?service=${encodeURIComponent(title)}`}
                className="px-5 py-2.5 text-xs tracking-wider"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Minimal Home Page Style
  return (
    <motion.div
      className="bg-bg-warm/50 border border-accent/20 p-8 flex flex-col justify-between hover:bg-bg-tan/30 transition-all duration-300 luxury-shadow-sm hover:shadow-md relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      <div>
        <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-accent mb-6 group-hover:bg-primary/10 transition-colors">
          <IconComp className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-primary mb-3">
          {title}
        </h3>
        <p className="font-sans text-sm text-primary/70 leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-accent/10 pt-4 mt-auto">
        <span className="font-sans text-xs tracking-wider uppercase text-secondary font-semibold">
          Starting Price
        </span>
        <span className="font-serif text-md text-accent font-semibold">
          {price}
        </span>
      </div>
    </motion.div>
  );
}
