"use client";
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { CornerOrnament } from "@/components/Mandalas";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      <div className="absolute top-20 right-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48 rotate-90" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 font-sans text-sm text-primary/80 space-y-6 leading-relaxed">
        <SectionHeading
          subtitle="Legal"
          title="Privacy Policy"
          description="Last Updated: June 2026"
        />

        <p>
          At Henna by Naaz, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Henna by Naaz and how we use it.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">1. Information We Collect</h3>
        <p>
          When you fill out the booking form on our contact page, we collect details such as your name, phone number, email address, occasion, event date, and location. This details is used exclusively to facilitate your booking and coordinates travel logistics for home services.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">2. How We Use Your Information</h3>
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Check availability and schedule appointments.</li>
          <li>Communicate with you regarding booking confirmations and rescheduling.</li>
          <li>Provide customer service, answer inquiries, and deliver aftercare guidance.</li>
          <li>Optimize and improve our service delivery.</li>
        </ul>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">3. Natural Stain Safety</h3>
        <p>
          We are committed to providing 100% natural, chemical-free henna. We do not share customer details with third-party advertising networks. Your booking details are confidential.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">4. Consent</h3>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </div>
    </div>
  );
}
