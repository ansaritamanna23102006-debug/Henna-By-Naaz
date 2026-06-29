"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({
  text,
  name,
  role,
  rating = 5,
  index = 0,
}) {
  return (
    <motion.div
      className="bg-bg-warm/40 border border-accent/15 p-8 flex flex-col justify-between luxury-shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Decorative Quote Icon on background */}
      <div className="absolute -top-4 -right-4 text-accent/10 opacity-30 pointer-events-none group-hover:scale-110 transition-transform duration-500">
        <Quote className="w-24 h-24" />
      </div>

      <div>
        <div className="flex text-accent gap-1 mb-4 relative z-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-accent text-accent" : "text-accent/30"}`}
            />
          ))}
        </div>
        
        <p className="font-sans text-sm sm:text-base text-primary/80 italic leading-relaxed mb-6 relative z-10">
          "{text}"
        </p>
      </div>

      <div className="border-t border-accent/10 pt-4 relative z-10">
        <h4 className="font-serif text-sm sm:text-base font-semibold text-primary">
          {name}
        </h4>
        {role && (
          <span className="font-sans text-[10px] tracking-wider uppercase text-secondary font-semibold">
            {role}
          </span>
        )}
      </div>
    </motion.div>
  );
}
