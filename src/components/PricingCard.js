"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Button from "./Button";

export default function PricingCard({
  name,
  price,
  duration,
  features = [],
  isPopular = false,
  index = 0,
}) {
  return (
    <motion.div
      className={`relative flex flex-col justify-between p-8 bg-bg-warm/60 border ${
        isPopular ? "border-accent border-2 luxury-shadow" : "border-accent/20 luxury-shadow-sm"
      } hover:bg-bg-tan/10 transition-all duration-500 group overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Top golden light decoration */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Popular tag */}
      {isPopular && (
        <div className="absolute top-0 right-0 bg-accent text-primary text-[10px] tracking-wider uppercase font-sans font-bold px-4 py-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      <div>
        <div className="mb-6">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-secondary font-semibold block mb-1">
            Package Name
          </span>
          <h3 className="font-serif text-2xl font-bold text-primary">
            {name}
          </h3>
        </div>

        <div className="mb-6 pb-6 border-b border-accent/15">
          <div className="flex items-baseline text-primary">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-accent mr-2">
              {price}
            </span>
          </div>
          {duration && (
            <span className="font-sans text-xs text-primary/60 italic block mt-1">
              Estimated Duration: {duration}
            </span>
          )}
        </div>

        {/* Feature List */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-sans text-xs sm:text-sm text-primary/80 leading-tight">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={isPopular ? "primary" : "outline"}
        href={`/contact?package=${encodeURIComponent(name)}`}
        className="w-full"
      >
        Book Package
      </Button>
    </motion.div>
  );
}
