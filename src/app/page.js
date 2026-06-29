"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Phone, 
  MessageCircle, 
  Check, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Star,
  ChevronRight,
  Heart,
  Mail
} from "lucide-react";

import { GoldMandala, CornerOrnament, PaisleyMotif } from "@/components/Mandalas";
import StatsCounter from "@/components/StatsCounter";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import GalleryCard from "@/components/GalleryCard";
import TestimonialCard from "@/components/TestimonialCard";

// SVG Instagram Icon
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Home() {
  
  // Featured services subset
  const featuredServices = [
    {
      title: "Bridal Mehendi",
      desc: "Intricate, heavy, and bespoke traditional patterns extending from hands to elbows and feet, detailing personal love stories and traditional motifs.",
      price: "From ₹5,000",
      icon: Heart,
    },
    {
      title: "Engagement Mehendi",
      desc: "Elegant and graceful designs, balancing modern aesthetics with classic motifs. Perfect for making your rings stand out.",
      price: "From ₹2,500",
      icon: Sparkles,
    },
    {
      title: "Custom Mehendi Designs",
      desc: "Fully personalized creations. Bring your reference, portrait design, or unique concept, and see it crafted with precision.",
      price: "Custom Quote",
      icon: ChevronRight,
    },
  ];

  // Featured portfolio subset
  const featuredPortfolio = [
    {
      src: "/images/portfolio_bridal.png",
      title: "Royal Bridal Artistry",
      category: "Bridal",
    },
    {
      src: "/images/portfolio_arabic.png",
      title: "Contemporary Silhouette",
      category: "Arabic",
    },
    {
      src: "/images/portfolio_traditional.png",
      title: "Intricate Heritage Pattern",
      category: "Traditional",
    },
  ];

  // Featured reviews
  const featuredTestimonials = [
    {
      text: "Tabassum made my wedding day extra special. The bridal mehendi she did was so intricate, and the stain turned out to be a gorgeous dark mahogany! Everyone kept asking who my artist was.",
      name: "Naazneen Patel",
      role: "Bridal Client",
      rating: 5,
    },
    {
      text: "Extremely professional, punctual, and patient. She listened to all my ideas and custom-made a portrait design that was perfect. Having her come home was so convenient!",
      name: "Ananya Sharma",
      role: "Engagement Client",
      rating: 5,
    },
  ];

  // Instagram feed simulator
  const instagramFeed = [
    { src: "/images/portfolio_festival.png", title: "Eid Floral Minimalist" },
    { src: "/images/portfolio_minimalist.png", title: "Modern Minimal Accent" },
    { src: "/images/portfolio_feet.png", title: "Royal Feet Henna" },
    { src: "/images/hero_mehendi.png", title: "Luxury Henna Stain" },
  ];

  return (
    <div className="flex-1 flex flex-col relative bg-bg-ivory selection:bg-primary selection:text-bg-ivory">
      
      {/* Decorative Floating Elements (Parallax) */}
      <div className="absolute top-[15vh] left-[5%] opacity-15 animate-bounce duration-1000">
        <PaisleyMotif className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute top-[60vh] right-[8%] opacity-20">
        <GoldMandala className="w-48 h-48" opacity="opacity-30" />
      </div>
      <div className="absolute top-[130vh] left-[3%] opacity-10">
        <GoldMandala className="w-72 h-72" opacity="opacity-25" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-bg-tan/40 to-bg-ivory">
        {/* Background Mandala overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
          <GoldMandala className="w-[400px] h-[400px] md:w-[700px] md:h-[700px]" opacity="opacity-25" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Left Column Text */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-script text-accent text-3xl md:text-5xl mb-4 tracking-wide">
              Traditional Elegance, Modern Luxury
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.15] mb-6">
              Bringing Art To Your Hands,<br />
              <span className="text-secondary">Beauty To Your Celebrations</span>
            </h1>
            <p className="font-sans text-md md:text-lg text-primary/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Professional Mehendi Artist with <span className="font-semibold text-accent">4+ Years of Experience</span>, creating elegant, handcrafted, and intricate henna designs in the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                href="/contact"
                className="w-full sm:w-auto"
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                href="/gallery"
                className="w-full sm:w-auto"
              >
                View Portfolio
              </Button>
            </div>
          </motion.div>

          {/* Right Column Image Frame */}
          <motion.div 
            className="lg:col-span-5 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Elegant Luxury Frame */}
            <div className="relative w-80 h-[450px] md:w-[350px] md:h-[500px] border-[12px] border-primary/10 shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-color z-10 pointer-events-none transition-opacity group-hover:opacity-0 duration-500" />
              {/* Corner Ornaments inside frame */}
              <div className="absolute top-2 left-2 z-20 w-8 h-8 opacity-75">
                <CornerOrnament className="w-full h-full" />
              </div>
              <div className="absolute bottom-2 right-2 z-20 w-8 h-8 opacity-75 rotate-180">
                <CornerOrnament className="w-full h-full" />
              </div>
              
              <Image
                src="/images/hero_mehendi.png"
                alt="Luxury Henna Design"
                fill
                sizes="(max-width: 768px) 320px, 350px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                loading="eager"
              />
            </div>
            
            {/* Floating flower elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 animate-[spin_40s_linear_infinite] opacity-60">
              <PaisleyMotif className="w-full h-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 animate-[spin_55s_linear_infinite] opacity-60">
              <PaisleyMotif className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-20 relative bg-bg-warm">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <CornerOrnament className="w-32 h-32 rotate-90" />
        </div>
        <div className="absolute bottom-0 left-0 p-4 opacity-10">
          <CornerOrnament className="w-32 h-32 -rotate-90" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              className="relative w-80 h-[450px] md:w-[350px] md:h-[500px] border-2 border-accent p-2 shadow-xl bg-bg-ivory"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/about_tabassum.png"
                  alt="Tabassum - Henna by Naaz Founder"
                  fill
                  sizes="(max-width: 768px) 320px, 350px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Bio Preview Column */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-script text-accent text-3xl md:text-4xl mb-2">Hello, I'm Tabassum</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary mb-6">
              Founder of Henna by Naaz
            </h2>
            <div className="w-16 h-[2px] bg-accent mx-auto lg:mx-0 mb-8" />
            <p className="font-sans text-md md:text-lg text-primary/80 mb-6 leading-relaxed">
              For over 4 years, I have been bringing beautiful, custom mehendi artistry directly to my clients' homes, making weddings, engagements, festivals and celebrations even more memorable.
            </p>
            <p className="font-sans text-md md:text-lg text-primary/80 mb-8 leading-relaxed font-light italic">
              "My goal is not just applying mehendi, but creating designs that become an integral, beautiful part of your most special life moments."
            </p>
            
            <div className="mb-10">
              <Button variant="outline" href="/about">
                Read My Full Story
              </Button>
            </div>

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-accent/20">
              <div className="text-center lg:text-left">
                <p className="mb-1">
                  <StatsCounter value="4" suffix="+" />
                </p>
                <p className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-secondary font-semibold">Years Exp</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="mb-1">
                  <StatsCounter value="500" suffix="+" />
                </p>
                <p className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-secondary font-semibold">Happy Brides</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="mb-1">
                  <StatsCounter value="120" suffix="+" />
                </p>
                <p className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-secondary font-semibold">Events Covered</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <SectionHeading
            subtitle="Luxury Offerings"
            title="Featured Services"
            description="Providing exquisite, customized henna experiences with chemical-free organic mixtures."
          />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                desc={service.desc}
                price={service.price}
                icon={service.icon}
                index={index}
                full={false}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" href="/services">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED GALLERY SECTION */}
      <section className="py-20 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <SectionHeading
            subtitle="The Art Portfolio"
            title="Featured Creations"
            description="A glimpse of my detailed henna artistry, customized to reflect elegance and luxury."
          />

          {/* Balanced Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPortfolio.map((item, index) => (
              <GalleryCard
                key={item.title}
                src={item.src}
                title={item.title}
                category={item.category}
                index={index}
                href="/gallery"
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" href="/gallery">
              Explore Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* 5. FEATURED TESTIMONIALS SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-[10%] left-[2%] opacity-15 animate-[spin_80s_linear_infinite]">
          <GoldMandala className="w-56 h-56" opacity="opacity-25" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <SectionHeading
            subtitle="Kind Words"
            title="Loved by Clients"
            description="Nothing makes me happier than being a beautiful part of my clients' special days."
          />

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredTestimonials.map((test, index) => (
              <TestimonialCard
                key={test.name}
                text={test.text}
                name={test.name}
                role={test.role}
                rating={test.rating}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" href="/testimonials">
              Read All Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM FEED PREVIEW */}
      <section className="py-20 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeading
            subtitle="Follow @henna_by_naaz"
            title="Instagram Gallery"
            description="Stay connected and browse through my daily creative work and beautiful stains on Instagram."
          />

          {/* Instagram grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramFeed.map((item, index) => (
              <motion.a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden border border-accent/20 bg-bg-ivory group block cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 280px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-bg-ivory text-xs tracking-wider uppercase gap-2 font-sans">
                  <InstagramIcon className="w-5 h-5 text-accent" />
                  <span>View Post</span>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              href="https://instagram.com"
              className="inline-flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4 text-accent fill-none" />
              Follow On Instagram
            </Button>
          </div>
        </div>
      </section>

      {/* 7. BOOKING CTA SECTION */}
      <section className="py-24 bg-[#5B0F1A] text-bg-ivory relative overflow-hidden">
        {/* Background Decorative Mandala */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
          <GoldMandala className="w-[500px] h-[500px] md:w-[800px] md:h-[800px]" opacity="opacity-30" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="font-script text-accent text-3xl md:text-5xl block mb-4">
            Reservation & Inquiries
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-bg-ivory mb-6 leading-tight">
            Let's Create Something Beautiful Together
          </h2>
          <p className="font-sans text-bg-warm/80 max-w-xl mx-auto mb-10 text-md md:text-lg leading-relaxed">
            Ready to adorn your hands with custom organic mehendi artistry? Schedule your home consultation or request a direct quote today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="accent"
              href="https://wa.me/919167600320?text=Hello%20Tabassum,%20I%20would%20like%20to%20book%20a%20mehendi%20session."
              className="w-full sm:w-auto inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              WhatsApp Now
            </Button>
            <Button
              variant="accentOutline"
              href="tel:+919167600320"
              className="w-full sm:w-auto inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Appointment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
