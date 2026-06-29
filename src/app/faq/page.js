"use client";
import React, { useState, useMemo } from "react";
import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import { CornerOrnament, GoldMandala } from "@/components/Mandalas";

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Booking & Policies",
    "Pricing & Payments",
    "Home Service & Travel",
    "Aftercare & Quality"
  ];

  const faqItems = [
    // Booking
    {
      question: "How do I book an appointment with you?",
      answer: "You can book directly by filling out the form on our Contact page, calling us, or clicking the WhatsApp button. Provide your event date, occasion type, location, and preferred package, and we will confirm availability.",
      category: "Booking & Policies"
    },
    {
      question: "How far in advance should I secure my date?",
      answer: "For bridal mehendi, we recommend booking 3 to 6 months in advance, especially during the wedding season. For festivals or casual bookings, 2 to 4 weeks is usually sufficient.",
      category: "Booking & Policies"
    },
    {
      question: "Is there an advance payment required?",
      answer: "Yes, to confirm and lock in your appointment date, we require a 20% advance reservation deposit. The remaining balance is payable on the day of the service after completion.",
      category: "Pricing & Payments"
    },
    {
      question: "What is your cancellation and rescheduling policy?",
      answer: "We understand plans can change. Cancellations made at least 7 days prior to your booking will receive a full refund of the deposit. Cancellations within 7 days are non-refundable, but the deposit can be transferred as credit for any rescheduled appointment within 6 months.",
      category: "Booking & Policies"
    },
    // Home Service
    {
      question: "Do you provide home-visit services?",
      answer: "Yes, we travel directly to your home, hotel room, or wedding venue. We bring all the necessary tools and organic henna paste. You just need to arrange a comfortable seating area with good lighting.",
      category: "Home Service & Travel"
    },
    {
      question: "Are there travel fees for home service?",
      answer: "Our home service is complimentary for Classic, Premium, and Bridal packages within major city limits. For locations outside these boundaries or nearby suburbs, a small travel charge is calculated based on mileage.",
      category: "Home Service & Travel"
    },
    // Pricing
    {
      question: "Do you offer discounts for group bookings?",
      answer: "Yes! For sangeet parties, Eid groups, or baby shower family bookings, we offer discounted rates depending on the number of hands and density. Group rates start from ₹500 per hand.",
      category: "Pricing & Payments"
    },
    // Duration
    {
      question: "How long does the application take?",
      answer: "The duration depends on the density. A basic pattern takes 30-45 minutes. A classic forearm design takes 2-3 hours. A complete royal bridal mehendi (including palms, arms, and feet) takes 5 to 8 hours depending on how intricate you want the portraits to be.",
      category: "Aftercare & Quality"
    },
    // Aftercare
    {
      question: "Is your henna natural and safe for skin?",
      answer: "Yes, we only use 100% natural, chemical-free henna paste. It is freshly mixed using organic Rajasthani henna powder, sugar, and pure essential oils (lavender and tea tree). It contains no chemical dyes, PPDA, or ammonia, and is safe for kids, sensitive skin, and pregnant women.",
      category: "Aftercare & Quality"
    },
    {
      question: "How can I achieve a dark mahogany stain?",
      answer: "To ensure a rich, deep stain: (1) Leave the dried paste on your skin for 6 to 10 hours. (2) Protect it from cracking with our sealant spray. (3) Do not wash with water; scrape the paste off instead. (4) Apply aftercare oil or coconut oil. (5) Keep water away from the area for 24 hours.",
      category: "Aftercare & Quality"
    }
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return faqItems;
    return faqItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      
      {/* Decors */}
      <div className="absolute top-20 right-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 rotate-90" />
      </div>
      <div className="absolute bottom-20 left-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 -rotate-90" />
      </div>
      <div className="absolute top-[30vh] left-0 -translate-x-1/4 opacity-10">
        <GoldMandala className="w-[500px] h-[500px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <SectionHeading
          subtitle="Help Center"
          title="Frequently Asked Questions"
          description="Find answers to common questions about reservation deposits, organic henna, home services, and stain instructions."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs sm:text-sm tracking-wider uppercase font-sans border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-bg-ivory border-primary shadow-sm"
                  : "bg-transparent text-primary/80 border-accent/20 hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="min-h-[300px]">
          <FAQAccordion items={filteredItems} />
        </div>

        {/* Contact CTA banner */}
        <div className="max-w-3xl mx-auto bg-bg-warm/50 border border-accent/20 p-8 text-center mt-20 luxury-shadow-sm">
          <span className="font-script text-accent text-3xl block mb-1">Still Have Questions?</span>
          <h3 className="font-serif text-xl font-bold text-primary mb-3">Get In Touch With Tabassum</h3>
          <p className="font-sans text-xs sm:text-sm text-primary/70 leading-relaxed mb-6">
            If you have unique requests or details not covered in the FAQ, feel free to contact us. We are happy to help you plan your design.
          </p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="px-6 py-3 bg-primary text-bg-ivory hover:bg-accent hover:text-primary transition-colors font-sans uppercase text-xs tracking-widest border border-primary hover:border-accent"
            >
              Contact Us Directly
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
