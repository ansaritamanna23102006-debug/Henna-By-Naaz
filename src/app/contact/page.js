"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Mail, 
  Heart,
  CheckCircle,
  FileText
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { CornerOrnament, GoldMandala, SectionDivider } from "@/components/Mandalas";

// SVG Instagram Icon
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

function ContactForm() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    occasion: "",
    location: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Pre-fill fields from URL parameters if they exist
  useEffect(() => {
    const service = searchParams.get("service");
    const pkg = searchParams.get("package");
    
    if (service) {
      setFormData(prev => ({
        ...prev,
        occasion: service,
        message: `Hi Tabassum, I am interested in booking the "${service}" service.`
      }));
    } else if (pkg) {
      setFormData(prev => ({
        ...prev,
        occasion: pkg,
        message: `Hi Tabassum, I am interested in booking the "${pkg}" package.`
      }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-12 digits)";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.date) newErrors.date = "Event date is required";
    if (!formData.occasion.trim()) newErrors.occasion = "Occasion type is required";
    if (!formData.location.trim()) newErrors.location = "Location/address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          eventDate: formData.date,
          location: formData.location,
          service: formData.occasion,
          notes: formData.message
        })
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const json = await res.json();
        alert(json.error || "Failed to submit booking request. Please WhatsApp us.");
      }
    } catch (err) {
      alert("Failed to submit request. Please WhatsApp us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to generate WhatsApp URL with form content pre-filled
  const getWhatsAppURL = () => {
    const text = `Hello Tabassum! I would like to book a mehendi session.%0A%0A*Details:*%0A- Name: ${formData.name}%0A- Phone: ${formData.phone}%0A- Date: ${formData.date}%0A- Occasion: ${formData.occasion}%0A- Location: ${formData.location}%0A- Message: ${formData.message}`;
    return `https://wa.me/919167600320?text=${text}`;
  };

  if (success) {
    return (
      <motion.div
        className="bg-bg-warm/40 border border-accent/25 p-8 text-center luxury-shadow-sm flex flex-col items-center justify-center min-h-[450px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-16 h-16 text-accent mb-6" />
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-3">Booking Request Received!</h3>
        <p className="font-sans text-sm text-primary/75 max-w-md mb-8 leading-relaxed">
          Thank you for reaching out, <strong>{formData.name}</strong>. We will check availability for <strong>{formData.date}</strong> and contact you shortly.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Button
            variant="accent"
            href={getWhatsAppURL()}
            className="w-full sm:w-auto inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Send Instantly via WhatsApp
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSuccess(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                date: "",
                occasion: "",
                location: "",
                message: ""
              });
            }}
            className="w-full sm:w-auto"
          >
            Submit Another Request
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-warm/30 border border-accent/15 p-6 sm:p-8 space-y-5 luxury-shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="font-sans text-xs tracking-wider uppercase font-semibold text-secondary mb-1.5 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-accent" />
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="p-3 bg-bg-ivory border border-accent/25 focus:border-primary focus:outline-none font-sans text-sm text-primary placeholder:text-primary/30"
          />
          {errors.name && <span className="font-sans text-[10px] text-red-600 mt-1">{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="font-sans text-xs tracking-wider uppercase font-semibold text-secondary mb-1.5 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-accent" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +91 91676 00320"
            className="p-3 bg-bg-ivory border border-accent/25 focus:border-primary focus:outline-none font-sans text-sm text-primary placeholder:text-primary/30"
          />
          {errors.phone && <span className="font-sans text-[10px] text-red-600 mt-1">{errors.phone}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="flex flex-col">
          <label className="font-sans text-xs tracking-wider uppercase font-semibold text-secondary mb-1.5 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-accent" />
            Email Address (Optional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="yourname@gmail.com"
            className="p-3 bg-bg-ivory border border-accent/25 focus:border-primary focus:outline-none font-sans text-sm text-primary placeholder:text-primary/30"
          />
          {errors.email && <span className="font-sans text-[10px] text-red-600 mt-1">{errors.email}</span>}
        </div>

        {/* Event Date */}
        <div className="flex flex-col">
          <label className="font-sans text-xs tracking-wider uppercase font-semibold text-secondary mb-1.5 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            Event Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-3 bg-bg-ivory border border-accent/25 focus:border-primary focus:outline-none font-sans text-sm text-primary uppercase"
          />
          {errors.date && <span className="font-sans text-[10px] text-red-600 mt-1">{errors.date}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Occasion */}
        <div className="flex flex-col">
          <label className="font-sans text-xs tracking-wider uppercase font-semibold text-secondary mb-1.5 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-accent" />
            Occasion / Service Type *
          </label>
          <input
            type="text"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            placeholder="e.g. Bridal, Baby Shower, Eid"
            className="p-3 bg-bg-ivory border border-accent/25 focus:border-primary focus:outline-none font-sans text-sm text-primary placeholder:text-primary/30"
          />
          {errors.occasion && <span className="font-sans text-[10px] text-red-600 mt-1">{errors.occasion}</span>}
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="font-sans text-xs tracking-wider uppercase font-semibold text-secondary mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            Service Location (Address) *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Area, city name"
            className="p-3 bg-bg-ivory border border-accent/25 focus:border-primary focus:outline-none font-sans text-sm text-primary placeholder:text-primary/30"
          />
          {errors.location && <span className="font-sans text-[10px] text-red-600 mt-1">{errors.location}</span>}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label className="font-sans text-xs tracking-wider uppercase font-semibold text-secondary mb-1.5 flex items-center gap-1">
          <FileText className="w-3.5 h-3.5 text-accent" />
          Special Instructions & Message
        </label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          placeholder="Any details, coverage required, or customized design motifs you want to add"
          className="p-3 bg-bg-ivory border border-accent/25 focus:border-primary focus:outline-none font-sans text-sm text-primary placeholder:text-primary/30"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Send Booking Inquiry"}
        </Button>
      </div>
    </form>
  );
}

export default function ContactPage() {
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
          subtitle="Get In Touch"
          title="Reservation & Inquiries"
          description="Ready to schedule your premium home mehendi session? Complete the form below, or reach out directly to check availability."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Info (Left Column) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-primary">Direct Contact Info</h3>
              <p className="font-sans text-sm text-primary/75 leading-relaxed">
                Connect with Tabassum for quick questions, customized package pricing, sangeet group calculations, or emergency bookings.
              </p>
            </div>

            {/* Quick buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="accent"
                href="https://wa.me/919167600320?text=Hello%20Tabassum,%20I%20would%20like%20to%20inquire%20about%20booking%25."
                className="w-full inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Us
              </Button>
              <Button
                variant="outline"
                href="tel:+919167600320"
                className="w-full inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Appointment
              </Button>
            </div>

            {/* Business Hours & Service Areas */}
            <div className="border-t border-accent/20 pt-6 space-y-6">
              {/* Business Hours */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-primary mb-1">Business & Consultation Hours</h4>
                  <p className="font-sans text-xs text-primary/75 leading-normal">Monday - Sunday: 9:00 AM - 8:00 PM</p>
                  <p className="font-sans text-[10px] text-secondary font-semibold italic mt-1">
                    * Home application sessions adapt to wedding/ceremony timings.
                  </p>
                </div>
              </div>

              {/* Service Areas */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-accent shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-primary mb-1">Service & Travel Areas</h4>
                  <p className="font-sans text-xs text-primary/75 leading-relaxed">
                    Complimentary home visit available within major city boundaries. Premium travel service covers suburbs, surrounding districts, and hotel venues.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="border-t border-accent/20 pt-6">
              <h4 className="font-serif text-base font-semibold text-primary mb-3">Connect on Social Media</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-accent/20 hover:border-accent text-primary hover:text-accent font-sans text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-colors duration-300"
                >
                  <InstagramIcon className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href="https://wa.me/919167600320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-accent/20 hover:border-accent text-primary hover:text-accent font-sans text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  WhatsApp Group
                </a>
              </div>
            </div>
          </div>

          {/* Form Column (Right Column) */}
          <div className="lg:col-span-7 w-full">
            <Suspense fallback={<div className="font-sans text-sm text-primary/60 text-center py-20">Loading reservation form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        {/* Map Section */}
        <SectionDivider className="my-16" />
        
        <div className="space-y-4">
          <div className="text-center mb-6">
            <span className="font-script text-accent text-3xl">Our Coverage Region</span>
            <h3 className="font-serif text-2xl font-bold text-primary">Service Area Map</h3>
          </div>
          
          <div className="relative w-full h-[350px] sm:h-[450px] border border-accent/25 overflow-hidden">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120615.72230623348!2d72.8258162!3d19.0825223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mumbai and surrounding service areas"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
