"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQAccordion({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto w-full">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="border border-accent/20 bg-bg-warm/40 overflow-hidden luxury-shadow-sm hover:border-accent/40 transition-colors duration-300"
          >
            {/* Header Trigger */}
            <button
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between p-5 text-left font-serif text-md sm:text-lg font-semibold text-primary hover:text-accent transition-colors duration-300 select-none"
            >
              <span>{item.question}</span>
              <span className="shrink-0 ml-4 w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center text-accent">
                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </span>
            </button>

            {/* Expandable Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-accent/10 font-sans text-xs sm:text-sm text-primary/80 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
