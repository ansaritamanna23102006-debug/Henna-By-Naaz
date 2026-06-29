"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Heart, 
  Sparkles, 
  Check, 
  Clock, 
  Calendar, 
  Gift, 
  Flame, 
  ChevronRight,
  MessageCircle,
  Phone
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import FAQAccordion from "@/components/FAQAccordion";
import { GoldMandala, CornerOrnament, SectionDivider } from "@/components/Mandalas";
import Button from "@/components/Button";

export default function BridalMehendiPage() {
  
  const bridalPackages = [
    {
      title: "Elegant Modern Bridal",
      price: "₹5,000",
      desc: "Perfect for modern brides who prefer clean, graceful lines and airy layouts.",
      coverage: "Wrists to mid-forearm (both sides) + basic feet design",
      duration: "3 - 4 hours",
      features: [
        "Delicate floral/mandala patterns",
        "Classic elements with negative space",
        "Includes lemon-sugar sealant spray",
        "Stain aftercare oil bottle",
        "Natural organic henna paste"
      ]
    },
    {
      title: "Classic Royal Bridal",
      price: "₹8,000",
      desc: "Our most popular package, balancing dense traditional layout with modern flow.",
      coverage: "Elbow-length hands (both sides) + detailed feet design to ankles",
      duration: "5 - 6 hours",
      features: [
        "Symmetrical Rajasthani/Indo-Arabic design",
        "Includes groom's initials and wedding date",
        "Detailed floral borders and paisleys",
        "Sealant spray + breathable overnight wrap",
        "Stain aftercare oil bottle"
      ],
      featured: true
    },
    {
      title: "Rajasthani Heritage Bridal",
      price: "₹12,000",
      desc: "For the ultimate luxury experience. Intricate, dense, and fully personalized art.",
      coverage: "Past-elbow hands (both sides) + heavy bridal feet design to mid-calf",
      duration: "7 - 9 hours",
      features: [
        "Custom bride & groom portrait motifs",
        "Bespoke love story elements (pets, dates, city skylines)",
        "Traditional micro-intricacy (jaal, checks, peacocks)",
        "Premium sealant spray + overnight wrap",
        "Stain aftercare oil & post-care support"
      ]
    }
  ];

  const whatIsIncluded = [
    { title: "Bespoke Design Mapping", desc: "A complimentary pre-wedding design consultation to align on patterns, elements, and coverage." },
    { title: "Organic Stain Quality", desc: "Handcrafted 100% natural, chemical-free henna paste mixed with organic lavender and tea tree oils." },
    { title: "Luxury Care Kit", desc: "Includes aftercare oil, lemon-sugar sealant spray, and specialized breathable tape for wraps." },
    { title: "Professional Convenience", desc: "A luxury home visit with customized equipment and posture supports for comfort." },
  ];

  const timelineSteps = [
    {
      step: "01",
      title: "Inquiry & Date Reservation",
      desc: "Reach out via WhatsApp or call to check availability. Secure your date with an advance deposit."
    },
    {
      step: "02",
      title: "Design Consultation",
      desc: "2-3 weeks before your wedding, we map your design elements, portraits, and preferences."
    },
    {
      step: "03",
      title: "The Mehendi Day",
      desc: "Applied in the comfort of your home. Usually scheduled 2 days before the wedding ceremony."
    },
    {
      step: "04",
      title: "Aftercare & Stain Development",
      desc: "Keep paste on overnight. Follow our guide to see the stain deepen from orange to rich mahogany."
    }
  ];

  const careTips = [
    {
      title: "1. Let it Dry & Set",
      desc: "Keep the henna paste on your skin for at least 6 to 10 hours (overnight is best) to allow the natural dye to penetrate."
    },
    {
      title: "2. Avoid Water for 24 Hours",
      desc: "When removing the paste, scrape it off gently with a butter knife or card. Do not wash with water. Keep water away for the first 24 hours."
    },
    {
      title: "3. Apply Aftercare Oil",
      desc: "Apply the complimentary stain oil or coconut oil generously after scraping the paste off to protect the stain from moisture."
    },
    {
      title: "4. Gentle Heat (Clove Fuming)",
      desc: "Fuming your hands over warm cloves (on a pan) helps the stain darken into a rich, deep mahogany tone."
    }
  ];

  const bridalFAQs = [
    {
      question: "When should the bridal mehendi be applied?",
      answer: "We highly recommend scheduling your bridal mehendi application 2 days prior to your wedding day. This gives the natural organic henna stain the full 48 hours it needs to reach its peak deep mahogany color."
    },
    {
      question: "Can I customize the bridal designs?",
      answer: "Absolutely! Bridal henna is all about you. You can share your story and we can integrate custom portraits, names, wedding dates, skylines of cities, pets, or any significant symbols that represent your journey."
    },
    {
      question: "Do you travel to venues outside the city?",
      answer: "Yes, we provide home-visit services for bridal bookings. Travel charges may apply depending on the exact location of your home or venue."
    },
    {
      question: "How should I prepare for my bridal session?",
      answer: "Ensure your skin is clean, waxed, and free from any oils, lotions, or moisturizers. Wear comfortable clothing, eat beforehand, and arrange a well-lit seating area with a low table or cushions for arm support."
    }
  ];

  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[10vh] left-0 -translate-x-1/4 opacity-10">
        <GoldMandala className="w-[500px] h-[500px]" opacity="opacity-25" />
      </div>
      <div className="absolute top-[120vh] right-0 translate-x-1/4 opacity-10">
        <GoldMandala className="w-[500px] h-[500px]" opacity="opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <SectionHeading
            subtitle="The Royal Heritage"
            title="Luxury Bridal Mehendi Artistry"
            description="Bespoke, handcrafted henna designs made from pure organic mixtures to adorn your hands on your most beautiful day."
          />
        </div>

        {/* Gallery Preview Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div className="relative h-[300px] sm:h-[450px] border border-accent/25 overflow-hidden group">
            <Image
              src="/images/portfolio_bridal.png"
              alt="Bridal Hand Henna Art"
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-bg-ivory">
              <span className="font-script text-accent text-2xl">Exquisite Layout</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold">Royal Rajasthani Detail</h3>
            </div>
          </div>
          
          <div className="relative h-[300px] sm:h-[450px] border border-accent/25 overflow-hidden group">
            <Image
              src="/images/portfolio_feet.png"
              alt="Bridal Feet Henna Art"
              fill
              sizes="(max-width: 768px) 100vw, 550px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-bg-ivory">
              <span className="font-script text-accent text-2xl">Adorning the Feet</span>
              <h3 className="font-serif text-lg sm:text-xl font-bold">Royal Elephant Motifs</h3>
            </div>
          </div>
        </div>

        {/* Bridal Packages */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="font-script text-accent text-3xl block">The Packages</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-primary">Curated Bridal Tiers</h3>
            <div className="w-12 h-[1px] bg-accent mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {bridalPackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                className={`relative p-8 flex flex-col justify-between border bg-bg-warm/50 ${
                  pkg.featured ? "border-accent border-2 luxury-shadow" : "border-accent/20"
                } hover:bg-bg-tan/10 transition-all duration-500`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {pkg.featured && (
                  <div className="absolute top-0 right-0 bg-accent text-primary text-[10px] tracking-wider uppercase font-sans font-bold px-4 py-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 fill-current" />
                    Most Popular
                  </div>
                )}
                
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-2">{pkg.title}</h4>
                  <span className="font-serif text-2xl sm:text-3xl text-accent font-bold block mb-4">{pkg.price}</span>
                  <p className="font-sans text-xs text-primary/75 leading-relaxed mb-6 border-b border-accent/15 pb-4">
                    {pkg.desc}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="text-xs text-primary/80 leading-relaxed font-sans">
                      <strong>Coverage:</strong> {pkg.coverage}
                    </div>
                    <div className="text-xs text-primary/80 leading-relaxed font-sans flex items-center gap-1">
                      <Clock className="w-4 h-4 text-secondary shrink-0" />
                      <span><strong>Duration:</strong> {pkg.duration}</span>
                    </div>
                    
                    <ul className="space-y-2.5 pt-4 border-t border-accent/10">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="font-sans text-xs sm:text-sm text-primary/85">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant={pkg.featured ? "primary" : "outline"}
                  href={`/contact?package=${encodeURIComponent(pkg.title)}`}
                  className="w-full"
                >
                  Book Package
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-24 bg-bg-warm p-8 md:p-12 border border-accent/25 luxury-shadow-sm">
          <div className="text-center mb-10">
            <span className="font-script text-accent text-3xl">Bridal Luxury Services</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mt-1">What's Included In Every Package</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whatIsIncluded.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-primary mb-4">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h4 className="font-serif text-base font-semibold text-primary mb-2">{item.title}</h4>
                <p className="font-sans text-xs text-primary/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking Timeline */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="font-script text-accent text-3xl block">The Journey</span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-primary">Your Bridal Booking Timeline</h3>
            <div className="w-12 h-[1px] bg-accent mx-auto mt-3" />
          </div>

          <div className="relative flex flex-col lg:flex-row gap-6 justify-between items-stretch">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-accent/30 -z-10" />

            {timelineSteps.map((step, idx) => (
              <motion.div
                key={idx}
                className="flex-1 bg-bg-warm/40 border border-accent/20 p-6 relative flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div>
                  <span className="font-serif text-2xl font-bold text-accent/30 mb-3 block">{step.step}</span>
                  <h4 className="font-serif text-base font-semibold text-primary mb-2">{step.title}</h4>
                  <p className="font-sans text-xs text-primary/70 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mehendi Care Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 bg-bg-warm/50 border border-accent/20 p-8 md:p-12">
          <div className="lg:col-span-5 relative h-64 lg:h-[400px] w-full border border-accent/30 p-2 bg-bg-ivory shadow-lg">
            <Image
              src="/images/hero_mehendi.png"
              alt="Henna Stain Stain Art"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-script text-accent text-3xl block">Stain Excellence</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Mehendi Aftercare Tips</h3>
              <p className="font-sans text-xs sm:text-sm text-primary/75 mt-2">
                Pure natural henna requires warmth and time to mature. Follow these steps to guarantee a jaw-dropping dark stain:
              </p>
            </div>

            <div className="space-y-4">
              {careTips.map((tip, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-primary shrink-0 mt-0.5 text-xs font-serif font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-primary">{tip.title}</h4>
                    <p className="font-sans text-xs text-primary/70 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bridal FAQ Accordion */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="font-script text-accent text-3xl">Common Questions</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Bridal Mehendi FAQ</h3>
          </div>
          
          <FAQAccordion items={bridalFAQs} />
        </div>

        {/* Consultation CTA */}
        <div className="bg-[#5B0F1A] text-bg-ivory text-center p-12 relative overflow-hidden border border-accent/20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
            <GoldMandala className="w-80 h-80 animate-spin" />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="font-script text-accent text-3xl md:text-4xl block">Personalized Consultation</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-bg-ivory">Let's Design Your Dream Henna</h3>
            <p className="font-sans text-sm text-bg-warm/80 leading-relaxed">
              We offer a complimentary digital call or session to review design options, placement sizes, and package customization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="accent"
                href="https://wa.me/919167600320?text=Hello%20Tabassum,%20I%20would%20like%20to%20consult%20for%20my%20bridal%20mehendi."
                className="w-full sm:w-auto inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                WhatsApp Consultation
              </Button>
              <Button
                variant="accentOutline"
                href="tel:+919167600320"
                className="w-full sm:w-auto inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Directly
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
