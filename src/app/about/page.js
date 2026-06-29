"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Sparkles, 
  Award, 
  MapPin, 
  Smile, 
  ShieldAlert, 
  Flame, 
  Heart,
  BookOpen,
  Coffee
} from "lucide-react";

import { GoldMandala, CornerOrnament, SectionDivider } from "@/components/Mandalas";
import StatsCounter from "@/components/StatsCounter";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export default function AboutPage() {
  const whyChooseMe = [
    {
      title: "100% Organic Henna Paste",
      desc: "Our henna paste is hand-mixed with pure organic henna powder, sugar, and essential oils (lavender and tea tree). It contains zero chemicals, PPDA, or synthetic colorants, making it completely safe for sensitive skin and pregnant mothers.",
      icon: ShieldAlert,
    },
    {
      title: "Convenient Home Services",
      desc: "We bring the entire luxury bridal/celebration henna setup directly to your doorstep. You can sit back, relax in the comfort of your own living room, and watch the art unfold without traveling.",
      icon: MapPin,
    },
    {
      title: "Artistic Intricacy & Custom Motifs",
      desc: "Every bridal pattern is uniquely tailored. We weave personalized elements (names, wedding dates, custom portraits of partners, pets, and love stories) into intricate traditional motifs.",
      icon: Sparkles,
    },
    {
      title: "Punctuality & Reliability",
      desc: "Wedding days are tightly scheduled. We respect your timeline and arrive punctually, ensuring that your mehendi session is completed on time with zero rush or stress.",
      icon: Award,
    },
  ];

  const skills = [
    { name: "Traditional Indian & Rajasthani", level: "98%" },
    { name: "Contemporary Arabic & Indo-Arabic", level: "95%" },
    { name: "Intricate Bridal Portrait Art", level: "90%" },
    { name: "Fine Mandalas & Geometric Accents", level: "96%" },
    { name: "Organic Stain Optimization", level: "100%" },
  ];

  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      
      {/* Decorative Ornaments */}
      <div className="absolute top-20 left-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48" />
      </div>
      <div className="absolute top-1/2 right-0 translate-x-1/3 opacity-15">
        <GoldMandala className="w-[500px] h-[500px]" opacity="opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Page Title Section */}
        <div className="text-center mb-16">
          <SectionHeading
            subtitle="The Artist & Founder"
            title="Story of Henna by Naaz"
            description="Discover the passion, experience, and artistic dedication behind custom home-visit henna."
          />
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              className="relative w-full max-w-[350px] aspect-[3/4] border-2 border-accent p-2 shadow-2xl bg-bg-ivory"
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
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="lg:col-span-7 font-sans text-primary/80 space-y-6 text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4">
              Crafting Memories Through Henna
            </h3>
            <p className="leading-relaxed">
              Hello, I am **Tabassum**, the founder and head artist of Henna by Naaz. My journey with henna began years ago as a creative passion, drawing inspiration from rich Indian traditions and complex geometric layouts. What started as sketching layouts for friends quickly grew into a lifelong dedication to celebratory art.
            </p>
            <p className="leading-relaxed">
              For over **4 years**, I have specialized in bringing bespoke bridal and festive henna directly to clients' homes. I believe that mehendi is not just a cosmetic application, but a sacred, beautiful ritual that symbolizes joy, love, and new beginnings.
            </p>
            <p className="leading-relaxed">
              Each bridal layout I sketch is a collaborative experience. By working closely with you, I weave elements of your personal love story—whether it's your partner's initials, your wedding date, or custom portraits—directly into Rajasthan's heritage structures or contemporary Arabic lines.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-accent/20 max-w-md mx-auto lg:mx-0">
              <div>
                <StatsCounter value="4" suffix="+" />
                <p className="text-[10px] tracking-wider uppercase text-secondary font-semibold mt-1">Years Exp</p>
              </div>
              <div>
                <StatsCounter value="500" suffix="+" />
                <p className="text-[10px] tracking-wider uppercase text-secondary font-semibold mt-1">Happy Brides</p>
              </div>
              <div>
                <StatsCounter value="120" suffix="+" />
                <p className="text-[10px] tracking-wider uppercase text-secondary font-semibold mt-1">Events Done</p>
              </div>
            </div>
          </motion.div>
        </div>

        <SectionDivider className="my-16" />

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            className="bg-bg-warm/50 border border-accent/20 p-8 md:p-10 relative group luxury-shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-accent mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Our Mission</h3>
            <p className="font-sans text-sm text-primary/80 leading-relaxed">
              To craft exquisite, bespoke henna designs that reflect tradition, elevate celebrations, and create lifetime stains and memories. We commit to utilizing 100% natural, chemical-free ingredients to deliver a luxurious, safe, and stress-free home service experience for every client.
            </p>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>

          <motion.div 
            className="bg-bg-warm/50 border border-accent/20 p-8 md:p-10 relative group luxury-shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-accent mb-6">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="font-sans text-sm text-primary/80 leading-relaxed">
              To be recognized as the premier destination for custom home-visit henna artistry, renowned for unmatched detail, deep mahogany stains, and exceptional customer service. We aim to preserve Rajasthani and Arabic design heritage while introducing contemporary elements that redefine mehendi as a fine luxury art form.
            </p>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        </div>

        {/* Why Choose Me & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Why Choose Me */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-serif text-3xl font-bold text-primary mb-6">
              Why Choose Henna by Naaz
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseMe.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="p-6 bg-bg-warm/40 border border-accent/15 flex flex-col justify-between"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div>
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-primary mb-4 shrink-0">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <h4 className="font-serif text-base font-semibold text-primary mb-2">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-primary/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Artistic Skills */}
          <motion.div 
            className="lg:col-span-5 bg-bg-warm/60 border border-accent/20 p-8 luxury-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">
              Artistic Skills & Focus
            </h3>
            <p className="font-sans text-xs text-primary/70 leading-relaxed mb-6">
              Our application combines speed, symmetry, and extremely fine lines. We track stains and skin care closely to ensure the richest results.
            </p>
            
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs font-semibold text-primary mb-1">
                    <span className="font-sans">{skill.name}</span>
                    <span className="font-serif text-accent">{skill.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Home Service Details */}
        <div className="bg-[#5B0F1A] text-bg-ivory p-8 md:p-12 relative overflow-hidden rounded-none border border-accent/20">
          <div className="absolute -bottom-16 -right-16 opacity-10 pointer-events-none">
            <GoldMandala className="w-64 h-64" opacity="opacity-30" />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <span className="font-script text-accent text-3xl mb-2 block">
              Luxury Custom Care
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-bg-ivory mb-6">
              Premium Home Service Experience
            </h3>
            <p className="font-sans text-sm text-bg-warm/80 leading-relaxed mb-6">
              We travel directly to your location with all the essential materials (natural henna paste, application oils, aftercare instructions, lemon sugar spray, and breathable tape wrap). All you need to do is arrange a comfortable seating area with good lighting.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs text-bg-warm/90 mb-8 list-none pl-0">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Travel covers all major city limits
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Hygiene guaranteed (freshly-rolled cones)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Includes sealant spray and aftercare oils
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Accommodates group bridal sessions
              </li>
            </ul>

            <Button variant="accent" href="/contact">
              Inquire About Home Booking
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
