"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import StatsCounter from "@/components/StatsCounter";
import { CornerOrnament, GoldMandala, SectionDivider } from "@/components/Mandalas";

export default function TestimonialsPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [dbTestimonials, setDbTestimonials] = useState(null);

  useEffect(() => {
    fetch("/api/admin/testimonials?public=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && data.testimonials.length > 0) {
          setDbTestimonials(data.testimonials);
        }
      })
      .catch((err) => console.log("Failed to load CMS reviews:", err));
  }, []);

  const defaultTestimonials = [
    {
      text: "Tabassum made my wedding day extra special. The bridal mehendi she did was so intricate, and the stain turned out to be a gorgeous dark mahogany! Everyone kept asking who my artist was.",
      name: "Naazneen Patel",
      role: "Bridal Client",
      rating: 5,
      image: "/images/portfolio_bridal.png"
    },
    {
      text: "Extremely professional, punctual, and patient. She listened to all my ideas and custom-made a portrait design that was perfect. Having her come home was so convenient!",
      name: "Ananya Sharma",
      role: "Engagement Client",
      rating: 5,
      image: "/images/portfolio_minimalist.png"
    },
    {
      text: "We booked Henna by Naaz for a family Eid event and she was so quick yet precise. The children's minimal patterns and the heavy traditional designs were both outstanding.",
      name: "Farida Ahmed",
      role: "Festival Client",
      rating: 5,
      image: "/images/portfolio_festival.png"
    },
    {
      text: "I was worried about skin allergies, but Tabassum's organic henna paste was completely safe and smelled amazing like lavender. The stain developed into a beautiful deep reddish-brown.",
      name: "Meera Joshi",
      role: "Bridal Client",
      rating: 5,
      image: "/images/hero_mehendi.png"
    },
    {
      text: "Excellent service! We booked her for our sangeet ceremony. She managed to apply henna for 15 guests with incredible speed and neatness. Highly recommend for group bookings.",
      name: "Saba Shaikh",
      role: "Sangeet Host",
      rating: 5,
      image: "/images/portfolio_traditional.png"
    },
    {
      text: "Tabassum was so patient with my baby shower mehendi. She drew a beautiful pregnancy symbol and baby feet on my palms. It was such a special experience.",
      name: "Priyanka Sen",
      role: "Baby Shower Client",
      rating: 5,
      image: "/images/about_tabassum.png"
    }
  ];

  const testimonials = useMemo(() => {
    if (dbTestimonials) {
      return dbTestimonials.map((t) => ({
        text: t.review,
        name: t.clientName,
        role: `${t.eventType || "Bridal"} Client`,
        rating: t.rating || 5,
        image: t.image || "",
      }));
    }
    return defaultTestimonials;
  }, [dbTestimonials]);

  // Adjust slideIndex if testimonials length changes dynamically
  useEffect(() => {
    if (slideIndex >= testimonials.length) {
      setSlideIndex(0);
    }
  }, [testimonials, slideIndex]);

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      
      {/* Decors */}
      <div className="absolute top-20 left-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48" />
      </div>
      <div className="absolute bottom-20 right-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 rotate-180" />
      </div>
      <div className="absolute top-[30vh] right-0 translate-x-1/4 opacity-10">
        <GoldMandala className="w-[500px] h-[500px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <SectionHeading
          subtitle="Kind Words"
          title="Client Testimonials"
          description="Read through the lovely reviews left by our brides and clients who experienced our premium home mehendi services."
        />

        {/* Statistics section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-bg-warm/50 border border-accent/20 p-8 text-center luxury-shadow-sm mb-20">
          <div>
            <StatsCounter value="99" suffix="%" />
            <p className="font-sans text-xs tracking-wider uppercase text-secondary font-semibold mt-2">Satisfaction</p>
          </div>
          <div>
            <StatsCounter value="500" suffix="+" />
            <p className="font-sans text-xs tracking-wider uppercase text-secondary font-semibold mt-2">Brides Adorned</p>
          </div>
          <div>
            <StatsCounter value="120" suffix="+" />
            <p className="font-sans text-xs tracking-wider uppercase text-secondary font-semibold mt-2">Events Covered</p>
          </div>
          <div>
            <StatsCounter value="5" suffix=" / 5" />
            <p className="font-sans text-xs tracking-wider uppercase text-secondary font-semibold mt-2">Average Rating</p>
          </div>
        </div>

        {/* Animated Slider Showcase */}
        {testimonials.length > 0 && testimonials[slideIndex] && (
          <div className="mb-20 bg-bg-warm/30 border border-accent/15 p-8 md:p-12 relative max-w-4xl mx-auto luxury-shadow">
            <div className="absolute top-4 left-4 text-accent/20">
              <Quote className="w-16 h-16 transform -scale-y-100" />
            </div>

            <div className="relative min-h-[250px] flex flex-col justify-between items-center text-center px-4 md:px-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  {/* Rating */}
                  <div className="flex text-accent gap-1 mb-6">
                    {Array.from({ length: testimonials[slideIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-serif text-lg sm:text-xl md:text-2xl text-primary leading-relaxed mb-6 italic max-w-2xl">
                    "{testimonials[slideIndex].text}"
                  </p>

                  {/* Profile Pic Placeholder or Initial Circle */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent/30 mb-3 bg-bg-ivory flex items-center justify-center font-serif text-accent font-bold">
                    {testimonials[slideIndex].image ? (
                      <Image
                        src={testimonials[slideIndex].image}
                        alt={testimonials[slideIndex].name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      testimonials[slideIndex].name[0]
                    )}
                  </div>

                  {/* Client Metadata */}
                  <h4 className="font-serif text-base font-bold text-primary">
                    {testimonials[slideIndex].name}
                  </h4>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-secondary font-semibold">
                    {testimonials[slideIndex].role}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation */}
              <div className="flex items-center gap-6 mt-8">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-primary hover:bg-accent/10 hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-sans text-xs text-primary/60">
                  {slideIndex + 1} / {testimonials.length}
                </span>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-accent/20 flex items-center justify-center text-primary hover:bg-accent/10 hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        <div>
          <div className="text-center mb-10">
            <span className="font-script text-accent text-3xl">All Feedback</span>
            <h3 className="font-serif text-2xl font-bold text-primary">Client Reviews</h3>
            <div className="w-12 h-[1px] bg-accent mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <TestimonialCard
                key={index}
                text={test.text}
                name={test.name}
                role={test.role}
                rating={test.rating}
                index={index}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
