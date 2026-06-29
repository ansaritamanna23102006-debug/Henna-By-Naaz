"use client";
import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Heart
} from "lucide-react";

// Reusable SVG Instagram Icon
const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Bridal Mehendi", href: "/bridal-mehendi" },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  const services = [
    { label: "Bridal Mehendi", href: "/bridal-mehendi" },
    { label: "Arabic Mehendi", href: "/services" },
    { label: "Indo Arabic Mehendi", href: "/services" },
    { label: "Traditional Designs", href: "/services" },
    { label: "Portrait Mehendi", href: "/services" },
    { label: "Engagement Mehendi", href: "/services" },
  ];

  return (
    <footer className="bg-primary text-bg-ivory pt-16 pb-8 border-t border-accent/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Brand Info */}
        <div className="md:col-span-4 flex flex-col">
          <Link href="/" className="flex flex-col group mb-4">
            <span className="font-serif text-2xl font-semibold tracking-wider text-accent text-glow">
              Henna by Naaz
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-bg-warm/85 font-sans -mt-1">
              BY TABASSUM
            </span>
          </Link>
          <p className="font-sans text-xs text-bg-warm/75 max-w-sm leading-relaxed mb-6">
            Handcrafted premium bridal and celebratory mehendi designs applied in the comfort of your home. Creating deep stains and beautiful memories for 4+ years.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-bg-warm/30 flex items-center justify-center text-bg-warm/80 hover:text-accent hover:border-accent transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/919167600320?text=Hello%20Tabassum,%20I%20would%20like%20to%20book%20a%20mehendi%20session." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-bg-warm/30 flex items-center justify-center text-bg-warm/80 hover:text-accent hover:border-accent transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="font-serif text-md text-accent font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="font-sans text-xs text-bg-warm/80 hover:text-accent transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services Links */}
        <div className="md:col-span-2">
          <h4 className="font-serif text-md text-accent font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2.5">
            {services.map((service, i) => (
              <Link 
                key={i} 
                href={service.href}
                className="font-sans text-xs text-bg-warm/80 hover:text-accent transition-colors w-fit"
              >
                {service.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="md:col-span-4">
          <h4 className="font-serif text-md text-accent font-semibold mb-4">Contact Information</h4>
          <div className="flex flex-col gap-3.5 font-sans text-xs text-bg-warm/80">
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span>Home-Visit Service available across the region</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-accent shrink-0" />
              <span>+91 91676 00320</span>
            </p>
            <p className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-accent shrink-0" />
              <span>WhatsApp: +91 91676 00320</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-accent shrink-0" />
              <a href="mailto:heenabynaaz20@gmail.com" className="hover:text-accent transition-colors">
                heenabynaaz20@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent my-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center font-sans text-[11px] text-bg-warm/60">
          <p>&copy; {currentYear} Henna by Naaz. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3 h-3 text-accent fill-accent animate-pulse" /> by Tabassum
          </p>
        </div>
      </div>
    </footer>
  );
}
