"use client";
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { CornerOrnament } from "@/components/Mandalas";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex-1 bg-bg-ivory pt-32 pb-20 relative selection:bg-primary selection:text-bg-ivory overflow-hidden">
      <div className="absolute top-20 left-0 p-4 opacity-5">
        <CornerOrnament className="w-48 h-48" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 font-sans text-sm text-primary/80 space-y-6 leading-relaxed">
        <SectionHeading
          subtitle="Legal"
          title="Terms & Conditions"
          description="Last Updated: June 2026"
        />

        <p>
          Welcome to Henna by Naaz! By accessing our website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">1. Booking & Reservation Deposits</h3>
        <p>
          Appointments are only locked in and confirmed upon receipt of a 20% advance reservation deposit. The remaining balance must be paid in full immediately upon completion of the henna service on the day of the appointment.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">2. Rescheduling & Cancellations</h3>
        <p>
          Rescheduling requests must be made at least 7 days before the scheduled appointment. Deposits for cancellations made within 7 days of the appointment are non-refundable but can be converted to credit for future bookings within 6 months.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">3. Home Service Logistics</h3>
        <p>
          Clients must provide a comfortable, well-lit seating space with a low table or pillows for arms. Henna application takes time; we require the client to remain seated comfortably to prevent smears. We are not responsible for smears, stains on clothing/furniture, or design damage caused by movement after application.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">4. organic Stain Guarantee</h3>
        <p>
          We use 100% natural, chemical-free henna paste. Because skin chemistry varies, stain outcome is dependent on skin type and adherence to aftercare instructions (e.g. keeping paste on for 6-10 hours, avoiding water for 24 hours). We do not guarantee a specific shade of stain.
        </p>

        <h3 className="font-serif text-xl font-bold text-primary pt-4">5. Intellectual Property</h3>
        <p>
          All design elements, images, and content displayed on this website are the property of Henna by Naaz (by Tabassum) and may not be reproduced, copied, or used for commercial purposes without explicit permission.
        </p>
      </div>
    </div>
  );
}
