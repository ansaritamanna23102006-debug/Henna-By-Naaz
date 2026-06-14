import React from "react";

// Premium detailed luxury gold Mandala
export const GoldMandala = ({ className = "w-64 h-64", opacity = "opacity-20" }) => (
  <svg
    className={`${className} ${opacity} animate-[spin_120s_linear_infinite] pointer-events-none`}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="100" cy="100" r="95" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="2 2" />
    <circle cx="100" cy="100" r="90" stroke="url(#goldGradient)" strokeWidth="1" />
    
    {/* Inner decorative petals/rings */}
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12;
      return (
        <path
          key={`petal-1-${i}`}
          d="M100 100 C110 70 120 70 100 40 C80 70 90 70 100 100 Z"
          transform={`rotate(${angle} 100 100)`}
          stroke="url(#goldGradient)"
          strokeWidth="0.75"
          fill="none"
        />
      );
    })}

    {/* Secondary ring of petals */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      return (
        <path
          key={`petal-2-${i}`}
          d="M100 100 C105 80 110 80 100 60 C90 80 95 80 100 100 Z"
          transform={`rotate(${angle + 7.5} 100 100)`}
          stroke="url(#goldGradient)"
          strokeWidth="0.5"
          fill="none"
        />
      );
    })}

    {/* Outer decorative arcs */}
    {Array.from({ length: 36 }).map((_, i) => {
      const angle = (i * 360) / 36;
      return (
        <circle
          key={`dot-${i}`}
          cx="100"
          cy="15"
          r="1.5"
          transform={`rotate(${angle} 100 100)`}
          fill="url(#goldGradient)"
        />
      );
    })}

    {/* Center flower */}
    <circle cx="100" cy="100" r="15" stroke="url(#goldGradient)" strokeWidth="1" fill="none" />
    <circle cx="100" cy="100" r="8" fill="url(#goldGradient)" opacity="0.4" />
    <circle cx="100" cy="100" r="3" fill="url(#goldGradient)" />

    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#FFF8F1" />
        <stop offset="100%" stopColor="#8B5E3C" />
      </linearGradient>
    </defs>
  </svg>
);

// Ornamental corner border divider
export const CornerOrnament = ({ className = "w-32 h-32" }) => (
  <svg
    className={`${className} pointer-events-none`}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5 H95 M5 5 V95 M12 12 H80 M12 12 V80"
      stroke="url(#goldGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M5 5 C 25 25, 25 25, 45 12 C 45 45, 45 45, 12 45 C 25 25, 25 25, 5 5 Z"
      fill="url(#goldGradient)"
      opacity="0.8"
    />
    <circle cx="12" cy="12" r="3" fill="url(#goldGradient)" />
    <circle cx="25" cy="25" r="2" fill="url(#goldGradient)" />
  </svg>
);

// Elegant Section Divider line with a center motif
export const SectionDivider = ({ className = "my-12" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-[1px] w-24 md:w-48 bg-gradient-to-r from-transparent to-accent" />
    <svg
      className="w-8 h-8 text-accent animate-pulse"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" opacity="0.8" />
    </svg>
    <div className="h-[1px] w-24 md:w-48 bg-gradient-to-l from-transparent to-accent" />
  </div>
);

// Hand-drawn-style floating henna leaf/paisley motif
export const PaisleyMotif = ({ className = "w-16 h-16", delay = "0s" }) => (
  <svg
    className={`${className} pointer-events-none`}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ animationDelay: delay }}
  >
    <path
      d="M50 90 C10 70, 10 30, 50 10 C90 30, 90 70, 50 90 Z"
      stroke="url(#goldGradient)"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M50 80 C30 65, 30 40, 50 25 C70 40, 70 65, 50 80 Z"
      stroke="url(#goldGradient)"
      strokeWidth="1"
      fill="url(#goldGradient)"
      fillOpacity="0.1"
    />
    <path
      d="M50 25 V80"
      stroke="url(#goldGradient)"
      strokeWidth="0.75"
      strokeDasharray="2 2"
    />
    <circle cx="50" cy="50" r="4" fill="url(#goldGradient)" />
  </svg>
);
