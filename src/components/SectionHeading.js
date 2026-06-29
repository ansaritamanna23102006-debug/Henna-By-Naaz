import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ subtitle, title, description, align = "center", className = "" }) {
  const isLeft = align === "left";

  return (
    <div className={`max-w-3xl ${isLeft ? "text-left lg:mx-0" : "text-center mx-auto"} mb-12 md:mb-16 ${className}`}>
      {subtitle && (
        <motion.span 
          className="font-script text-accent text-3xl md:text-4xl block mb-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.span>
      )}
      
      {title && (
        <motion.h2 
          className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h2>
      )}

      {/* Decorative Line Accent */}
      <motion.div 
        className={`h-[1px] bg-accent/40 mt-4 mb-4 ${isLeft ? "w-16 mr-auto" : "w-16 mx-auto"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      
      {description && (
        <motion.p 
          className="font-sans text-sm md:text-base text-primary/70 max-w-xl leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
