"use client";
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import PricingCard from "@/components/PricingCard";
import { CornerOrnament, GoldMandala, SectionDivider } from "@/components/Mandalas";

export default function PricingPage() {
  const packages = [
    {
      name: "Basic Package",
      price: "₹1,200",
      duration: "1.5 - 2 Hours",
      features: [
        "Simple strip designs on palm & back of hand",
        "Simple floral/leafy patterns",
        "100% chemical-free organic henna",
        "Complimentary sealant spray",
        "Home service travel *not included*"
      ],
      isPopular: false
    },
    {
      name: "Classic Package",
      price: "₹2,500",
      duration: "2 - 3 Hours",
      features: [
        "Symmetric designs up to mid-forearm (both sides)",
        "Rajasthani or Arabic style motifs",
        "Basic feet strip pattern",
        "100% chemical-free organic henna",
        "Stain aftercare oil bottle included",
        "Home service travel included (within limits)"
      ],
      isPopular: false
    },
    {
      name: "Premium Package",
      price: "₹4,500",
      duration: "3.5 - 5 Hours",
      features: [
        "Full detailed designs up to elbow (both sides)",
        "Dense Rajasthani jaal, mandala or checks",
        "Intricate feet design up to ankles",
        "Groom's name hidden in design",
        "Sealant spray + stain oil + overnight tape wrap",
        "Home service travel included"
      ],
      isPopular: true
    },
    {
      name: "Luxury Bridal Package",
      price: "₹8,000",
      duration: "6 - 8 Hours",
      features: [
        "Royal heritage bridal dense coverage past elbow",
        "Custom bride & groom portrait sketches",
        "Personalized storytelling motifs (pets, wedding date)",
        "Heavy bridal feet design to mid-calf",
        "Full bridal care kit (sealant, overnight wrap, oils)",
        "Complimentary design trial consultation"
      ],
      isPopular: false
    },
    {
      name: "Custom Package",
      price: "Custom Quote",
      duration: "Based on complexity",
      features: [
        "Fully tailored design from your reference images",
        "Group party discounts (sangeet, corporate, eid)",
        "Baby shower/godh bharai thematic symbols",
        "Flexible length and coverage options",
        "Direct consultation call with Tabassum"
      ],
      isPopular: false
    }
  ];

  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      
      {/* Decors */}
      <div className="absolute top-20 right-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 rotate-90" />
      </div>
      <div className="absolute bottom-20 left-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 -rotate-90" />
      </div>
      <div className="absolute top-[40vh] right-0 translate-x-1/3 opacity-15">
        <GoldMandala className="w-[500px] h-[500px]" opacity="opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Heading */}
        <SectionHeading
          subtitle="The Investment"
          title="Elegant Packages & Pricing"
          description="Select from our curated luxury options, handcrafted to make your celebration memorable. Custom rates available upon request."
        />

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <PricingCard
              key={pkg.name}
              name={pkg.name}
              price={pkg.price}
              duration={pkg.duration}
              features={pkg.features}
              isPopular={pkg.isPopular}
              index={idx}
            />
          ))}
        </div>

        {/* Pricing Notes */}
        <SectionDivider className="my-16" />

        <div className="max-w-3xl mx-auto bg-bg-warm/50 border border-accent/20 p-8 rounded-none luxury-shadow-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-primary text-center">Important Booking Information</h3>
          <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-primary/80 list-disc pl-5">
            <li>
              <strong>Home Service Travel:</strong> Complimentary home visit is included in Classic, Premium, and Bridal bookings within city limits. For locations outside major boundaries, a small travel charge is calculated.
            </li>
            <li>
              <strong>Reservation Deposit:</strong> A 20% advance payment is required to confirm and lock in your appointment date. The balance is payable upon completion.
            </li>
            <li>
              <strong>Bridal Session Preparation:</strong> Bridal sessions can take substantial time. We encourage booking 2 days prior to your main event for optimal stain maturation.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
