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
  Heart
} from "lucide-react";

const Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

import Navbar from "@/components/Navbar";
import { GoldMandala, CornerOrnament, SectionDivider, PaisleyMotif } from "@/components/Mandalas";
import StatsCounter from "@/components/StatsCounter";

export default function Home() {
  
  // Services configuration
  const services = [
    {
      title: "Bridal Mehendi",
      desc: "Intricate, heavy, and bespoke traditional patterns extending from hands to elbows and feet, detailing personal love stories and traditional motifs.",
      price: "From $250",
      icon: Heart,
    },
    {
      title: "Engagement Mehendi",
      desc: "Elegant and graceful designs, balancing modern aesthetics with classic motifs. Perfect for making your rings stand out.",
      price: "From $120",
      icon: Sparkles,
    },
    {
      title: "Family Mehendi",
      desc: "Delicate and beautiful party designs tailored for bridesmaids, wedding guests, and family members during celebrations.",
      price: "From $40/hand",
      icon: Star,
    },
    {
      title: "Festival Mehendi",
      desc: "Traditional designs for Eid, Karwa Chauth, Diwali, and Teej. Infusing festive joy and color onto your palms.",
      price: "From $30/palm",
      icon: Calendar,
    },
    {
      title: "Baby Shower Mehendi",
      desc: "Charming, customized designs featuring motherhood symbols, cute cradles, and elegant borders for the mom-to-be.",
      price: "From $100",
      icon: ShieldCheck,
    },
    {
      title: "Custom Mehendi Designs",
      desc: "Fully personalized creations. Bring your reference, portrait design, or unique concept, and see it crafted with precision.",
      price: "Custom Quote",
      icon: ChevronRight,
    },
  ];

  // Portfolio items
  const portfolio = [
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
      src: "/images/portfolio_festival.png",
      title: "Eid Floral Minimalist",
      category: "Festival",
    },
    {
      src: "/images/portfolio_traditional.png",
      title: "Intricate Heritage Pattern",
      category: "Traditional",
    },
    {
      src: "/images/portfolio_minimalist.png",
      title: "Modern Minimal Accent",
      category: "Minimalist",
    },
    {
      src: "/images/portfolio_feet.png",
      title: "Royal Feet Henna",
      category: "Bridal Feet",
    },
  ];

  // Why choose features
  const features = [
    { title: "4+ Years Experience", desc: "Crafting flawless mehendi art with passion and professional precision." },
    { title: "Home Service Available", desc: "Enjoy luxury custom henna application in the absolute comfort of your home." },
    { title: "Premium Quality Mehendi", desc: "100% organic, chemical-free henna paste for safe application and deep dark stain." },
    { title: "Intricate Custom Designs", desc: "Personalized elements (portraits, dates, wedding motifs) woven into designs." },
    { title: "Timely Appointments", desc: "Punctual arrivals to respect your tight wedding/festival schedule." },
    { title: "Hygienic Application", desc: "Strict hygiene protocols followed to ensure your safety and comfort." },
    { title: "Personalized Consultation", desc: "Complimentary design consultation to align on patterns, coverage, and details." },
    { title: "Bridal Specialists", desc: "Experts in creating rich bridal stains and managing large bridal groups." }
  ];

  // Timeline process steps
  const steps = [
    { num: "01", title: "Consultation", desc: "We discuss your vision, outfits, preferred styles, and required coverage." },
    { num: "02", title: "Design Selection", desc: "Choose from our portfolio or co-create a bespoke layout tailored to you." },
    { num: "03", title: "Home Visit", desc: "I travel directly to your location with all the premium tools and materials." },
    { num: "04", title: "Application", desc: "Relax and watch the intricate design bring your hands to life with organic henna." },
    { num: "05", title: "Beautiful Results", desc: "Follow our post-care guidelines to achieve a rich, deep mahogany stain." },
  ];

  // Testimonials
  const testimonials = [
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
    {
      text: "We booked Henna by Naaz for a family Eid event and she was so quick yet precise. The children's minimal patterns and the heavy traditional designs were both outstanding.",
      name: "Farida Ahmed",
      role: "Festival Client",
      rating: 5,
    },
  ];

  return (
    <div className="flex-1 flex flex-col relative bg-bg-ivory selection:bg-primary selection:text-bg-ivory">
      <Navbar />

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
      <section id="home" className="min-h-screen pt-24 pb-16 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-bg-tan/40 to-bg-ivory">
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
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.1] mb-6">
              Bringing Art To Your Hands,<br />
              <span className="text-secondary">Beauty To Your Celebrations</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-primary/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Professional Mehendi Artist with <span className="font-semibold text-accent">4+ Years of Experience</span>, creating elegant, handcrafted, and intricate henna designs at the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#booking"
                className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-bg-ivory hover:bg-accent hover:text-primary transition-all duration-300 font-sans uppercase text-sm tracking-widest border border-primary hover:border-accent shadow-md"
              >
                Book Appointment
              </a>
              <a
                href="#gallery"
                className="w-full sm:w-auto text-center px-8 py-4 bg-transparent text-primary hover:text-accent font-sans uppercase text-sm tracking-widest border border-primary/20 hover:border-accent transition-all duration-300"
              >
                View Portfolio
              </a>
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
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
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

      <SectionDivider />

      {/* 2. ABOUT TABASSUM */}
      <section id="about" className="py-20 relative bg-bg-warm">
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
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Bio Column */}
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
              For over 4 years, I have been bringing beautiful mehendi artistry directly to my clients' homes, making weddings, engagements, festivals and celebrations even more memorable.
            </p>
            <p className="font-sans text-md md:text-lg text-primary/80 mb-10 leading-relaxed font-light italic">
              "My goal is not just applying mehendi, but creating designs that become an integral, beautiful part of your most special life moments."
            </p>

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

      <SectionDivider />

      {/* 3. SPECIALIZATION SECTION */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-script text-accent text-3xl">Luxury Offerings</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary mt-2">
              Our Curated Specializations
            </h2>
            <p className="font-sans text-primary/70 mt-4">
              Providing exquisite, customized henna experiences with chemical-free organic mixtures.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComp = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="bg-bg-warm/50 border border-accent/20 p-8 flex flex-col justify-between hover:bg-bg-tan/30 transition-all duration-300 luxury-shadow-sm hover:shadow-md relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Subtle top border decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  <div>
                    <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-accent mb-6 group-hover:bg-primary/10 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-primary/70 leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-accent/10 pt-4 mt-auto">
                    <span className="font-sans text-xs tracking-wider uppercase text-secondary font-semibold">
                      Starting Price
                    </span>
                    <span className="font-serif text-md text-accent font-semibold">
                      {service.price}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 4. FEATURED WORK (Masonry Portfolio) */}
      <section id="gallery" className="py-20 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-script text-accent text-3xl">The Art Portfolio</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary mt-2">
              Featured Work
            </h2>
            <div className="w-12 h-[1px] bg-accent mx-auto mt-4" />
          </div>

          {/* Balanced Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item, index) => (
              <motion.div
                key={item.title}
                className="relative overflow-hidden group border border-accent/20 bg-bg-ivory aspect-[4/3] w-full"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Luxury Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                  <span className="font-script text-accent text-xl mb-1">{item.category}</span>
                  <h3 className="font-serif text-xl font-bold text-bg-ivory">{item.title}</h3>
                  <div className="w-8 h-[1px] bg-accent mt-3 transition-all duration-500 group-hover:w-16" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-primary text-primary hover:bg-primary hover:text-bg-ivory transition-all duration-300 font-sans uppercase text-xs tracking-widest"
            >
              <Instagram className="w-4 h-4" />
              View Full Gallery
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 5. WHY CHOOSE HENNA BY NAAZ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text/Showcase */}
          <div className="lg:col-span-7">
            <span className="font-script text-accent text-3xl">Unmatched Quality</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary mt-2 mb-8">
              Why Choose Henna by Naaz
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feat, index) => (
                <motion.div
                  key={feat.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-primary shrink-0 mt-1">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-md font-semibold text-primary mb-1">{feat.title}</h3>
                    <p className="font-sans text-xs text-primary/70 leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Graphic Side */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-bg-warm flex items-center justify-center border border-accent/30 luxury-shadow">
              <GoldMandala className="w-full h-full scale-90" opacity="opacity-30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                <span className="font-script text-accent text-4xl mb-2">4+ Years</span>
                <span className="font-serif text-xl uppercase tracking-widest text-primary font-semibold">Of Artistry</span>
                <div className="w-8 h-[1px] bg-accent my-3" />
                <span className="font-sans text-xs text-primary/80 max-w-[200px]">Creating rich stains and memories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 6. PROCESS SECTION */}
      <section id="process" className="py-20 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-script text-accent text-3xl">The Experience Journey</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary mt-2">
              Our Bridal & Client Process
            </h2>
            <p className="font-sans text-primary/70 mt-4 text-sm">
              From the initial consultation to the final dark stain, we guarantee a luxurious, stress-free experience.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-4 justify-between items-stretch">
            {/* Timeline connector line (Desktop only) */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-accent/10 via-accent to-accent/10 -z-10" />

            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="flex-1 bg-bg-ivory border border-accent/25 p-8 relative flex flex-col luxury-shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="font-serif text-3xl font-bold text-accent/20 mb-4 block">
                  {step.num}
                </span>
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-primary/70 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-[10%] left-[2%] opacity-15 animate-[spin_80s_linear_infinite]">
          <GoldMandala className="w-56 h-56" opacity="opacity-25" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-script text-accent text-3xl">Kind Words</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary mt-2">
              From Our Beautiful Clients
            </h2>
            <div className="w-12 h-[1px] bg-accent mx-auto mt-4" />
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <motion.div
                key={test.name}
                className="bg-bg-warm/40 border border-accent/15 p-8 flex flex-col justify-between luxury-shadow-sm hover:shadow-md transition-shadow relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex text-accent gap-1 mb-4">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent" />
                  ))}
                </div>
                
                <p className="font-sans text-sm text-primary/80 italic leading-relaxed mb-6">
                  "{test.text}"
                </p>

                <div className="border-t border-accent/10 pt-4">
                  <h4 className="font-serif text-sm font-semibold text-primary">{test.name}</h4>
                  <span className="font-sans text-[10px] tracking-wider uppercase text-secondary font-semibold">
                    {test.role}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOOKING CTA SECTION */}
      <section id="booking" className="py-24 bg-[#5B0F1A] text-bg-ivory relative overflow-hidden">
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
            <a
              href="https://wa.me/919999999999?text=Hello%20Tabassum,%20I%20would%20like%20to%20book%20a%20mehendi%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-bg-ivory text-primary font-sans uppercase text-sm tracking-widest font-semibold border border-accent hover:border-bg-ivory transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              WhatsApp Now
            </a>
            <a
              href="tel:+919999999999"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-bg-ivory/10 text-bg-ivory border border-bg-ivory/40 hover:border-bg-ivory transition-all duration-300 font-sans uppercase text-sm tracking-widest flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Appointment
            </a>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-primary text-bg-ivory pt-16 pb-8 border-t border-accent/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-wider text-accent">Henna by Naaz</span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-bg-warm/80 font-sans -mt-1 mb-4">
              BY TABASSUM
            </span>
            <p className="font-sans text-xs text-bg-warm/70 max-w-sm leading-relaxed mb-6">
              Handcrafted premium bridal and celebratory mehendi designs applied in the comfort of your home. Creating deep stains and beautiful memories for 4+ years.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-bg-warm/30 flex items-center justify-center hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/919999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-bg-warm/30 flex items-center justify-center hover:text-accent hover:border-accent transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-md text-accent font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="#home" className="font-sans text-xs text-bg-warm/80 hover:text-accent transition-colors">Home</a>
              <a href="#about" className="font-sans text-xs text-bg-warm/80 hover:text-accent transition-colors">About Tabassum</a>
              <a href="#services" className="font-sans text-xs text-bg-warm/80 hover:text-accent transition-colors">Services</a>
              <a href="#gallery" className="font-sans text-xs text-bg-warm/80 hover:text-accent transition-colors">Portfolio</a>
              <a href="#process" className="font-sans text-xs text-bg-warm/80 hover:text-accent transition-colors">Client Process</a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-md text-accent font-semibold mb-4">Contact Information</h4>
            <div className="flex flex-col gap-3 font-sans text-xs text-bg-warm/80">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                Home-Visit Service available across the region
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                +91 99999 99999
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                WhatsApp: +91 99999 99999
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent my-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center font-sans text-[11px] text-bg-warm/60">
            <p>&copy; {new Date().getFullYear()} Henna by Naaz. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              Handcrafted with <Heart className="w-3 h-3 text-accent fill-accent animate-pulse" /> by Tabassum
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
