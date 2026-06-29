"use client";
import React from "react";
import { 
  Heart, 
  Sparkles, 
  Users, 
  Calendar, 
  ShieldCheck, 
  ChevronRight, 
  Clock, 
  Home, 
  User, 
  Brush 
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { GoldMandala, CornerOrnament, SectionDivider } from "@/components/Mandalas";

export default function ServicesPage() {
  const allServices = [
    {
      title: "Bridal Mehendi",
      desc: "Bespoke, heavy traditional patterns covering hands to elbows and feet, weaving in personalized details like partner portraits, wedding dates, and personal love stories.",
      price: "From ₹5,000",
      image: "/images/portfolio_bridal.png",
      duration: "4 - 7 hours",
      suitableFor: "Brides, wedding celebrations",
      icon: Heart,
    },
    {
      title: "Arabic Mehendi",
      desc: "Contemporary, bold outlines and negative space shading with floral and vine patterns. Known for its elegant flow and chic, modern aesthetic.",
      price: "From ₹1,200",
      image: "/images/portfolio_arabic.png",
      duration: "1.5 - 2.5 hours",
      suitableFor: "Bridesmaids, guests, casual events",
      icon: Brush,
    },
    {
      title: "Indo Arabic Mehendi",
      desc: "A beautiful fusion of heavy Indian traditional shading combined with bold Arabic leafy vines, offering a dense yet flowing layout.",
      price: "From ₹1,800",
      image: "/images/portfolio_traditional.png",
      duration: "2 - 3 hours",
      suitableFor: "Festivals, family functions, engagements",
      icon: Sparkles,
    },
    {
      title: "Traditional Mehendi",
      desc: "Classic Indian heritage motifs (peacocks, paisleys, checks, mandalas) covering hands fully with fine, dense, symmetrical execution.",
      price: "From ₹2,000",
      image: "/images/portfolio_traditional.png",
      duration: "2.5 - 4 hours",
      suitableFor: "Traditional ceremonies, Karwa Chauth, Teej",
      icon: Heart,
    },
    {
      title: "Portrait Mehendi",
      desc: "Ultra-detailed custom sketches of the bride and groom, pets, parents, or specific deities rendered with precision into your bridal design.",
      price: "From ₹7,500",
      image: "/images/portfolio_bridal.png",
      duration: "5 - 8 hours",
      suitableFor: "Royal bridal requirements, custom designs",
      icon: User,
    },
    {
      title: "Engagement Mehendi",
      desc: "Graceful designs, balancing modern outlines with traditional centerpieces. Tailored to look clean and show off your engagement ring beautifully.",
      price: "From ₹2,500",
      image: "/images/portfolio_minimalist.png",
      duration: "2 - 3 hours",
      suitableFor: "Engagements, ring ceremonies, roka",
      icon: Sparkles,
    },
    {
      title: "Baby Shower Mehendi",
      desc: "Joyful custom designs featuring pregnancy motifs, cute cradles, baby feet outlines, and elegant lettering to celebrate the mother-to-be.",
      price: "From ₹2,000",
      image: "/images/hero_mehendi.png",
      duration: "2 - 3 hours",
      suitableFor: "Baby shower celebrations, godh bharai",
      icon: ShieldCheck,
    },
    {
      title: "Festival Mehendi",
      desc: "Minimal or semi-heavy patterns celebrating festive joy. Designed with quick-stain properties for Eid, Diwali, Teej, and Karwa Chauth.",
      price: "From ₹500/palm",
      image: "/images/portfolio_festival.png",
      duration: "30 - 60 minutes",
      suitableFor: "Eid, Diwali, Karwa Chauth, Teej celebrations",
      icon: Calendar,
    },
    {
      title: "Group Booking",
      desc: "Fast, precise, and beautiful mehendi application for bridal parties, sangeet functions, corporate gatherings, and family events.",
      price: "From ₹500/hand",
      image: "/images/portfolio_minimalist.png",
      duration: "Varies by group size",
      suitableFor: "Sangeet guests, bridesmaids, party groups",
      icon: Users,
    },
    {
      title: "Home Service",
      desc: "Complete luxury door-to-door service including natural henna setup, sealant sprays, aftercare instructions, and mahogany stain oil.",
      price: "Included in booking",
      image: "/images/hero_mehendi.png",
      duration: "Complimentary setup",
      suitableFor: "All premium wedding & custom bookings",
      icon: Home,
    },
  ];

  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      
      {/* Background Decors */}
      <div className="absolute top-20 right-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 rotate-90" />
      </div>
      <div className="absolute top-[40vh] left-0 -translate-x-1/3 opacity-10">
        <GoldMandala className="w-[600px] h-[600px]" opacity="opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <SectionHeading
          subtitle="Our Premium Artistry"
          title="Henna Services & Offerings"
          description="Explore our curated henna applications, each tailored to blend luxury, comfort, and deep traditional stains."
        />

        {/* Detailed Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              desc={service.desc}
              price={service.price}
              image={service.image}
              duration={service.duration}
              suitableFor={service.suitableFor}
              icon={service.icon}
              index={index}
              full={true}
              priority={index < 3}
            />
          ))}
        </div>

        {/* Note on natural henna */}
        <SectionDivider className="my-16" />
        
        <div className="max-w-3xl mx-auto bg-bg-warm/50 border border-accent/20 p-8 text-center luxury-shadow-sm">
          <span className="font-script text-accent text-3xl block mb-2">Safe & Beautiful</span>
          <h3 className="font-serif text-xl font-bold text-primary mb-3">Our 100% Organic Quality Guarantee</h3>
          <p className="font-sans text-xs sm:text-sm text-primary/80 leading-relaxed">
            All services use hand-made organic henna paste mixed with premium essential oils (tea tree, lavender). We do NOT use chemicals, chemical dyes, or instant black henna. Stains develop over 24-48 hours into a rich, deep mahogany tone.
          </p>
        </div>
      </div>
    </div>
  );
}
