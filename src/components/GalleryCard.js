"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

export default function GalleryCard({
  src,
  title,
  category,
  index = 0,
  onClick,
  priority = false,
}) {
  return (
    <motion.div
      className="relative overflow-hidden group border border-accent/20 bg-bg-ivory aspect-[4/3] w-full cursor-pointer"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={title || "Henna Artwork"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />
      
      {/* Luxury Hover Overlay */}
      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
        <div className="absolute top-4 right-4 text-accent/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <ZoomIn className="w-5 h-5" />
        </div>
        
        {category && (
          <span className="font-script text-accent text-xl sm:text-2xl mb-1">
            {category}
          </span>
        )}
        
        {title && (
          <h3 className="font-serif text-lg sm:text-xl font-bold text-bg-ivory">
            {title}
          </h3>
        )}
        
        <div className="w-8 h-[1px] bg-accent mt-3 transition-all duration-500 group-hover:w-16" />
      </div>
    </motion.div>
  );
}
