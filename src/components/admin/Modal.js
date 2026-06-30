import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/45 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full ${maxWidth} bg-bg-ivory border-2 border-accent/30 shadow-2xl p-6 md:p-8 flex flex-col z-10 max-h-[90vh] overflow-hidden`}
        style={{ animation: "scaleUp 0.25s ease-out" }}
      >
        {/* Decorative elements */}
        <div className="absolute top-1 left-1 w-4 h-4 border-t border-l border-accent/40" />
        <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r border-accent/40" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-accent/15">
          <h3 className="font-serif text-base md:text-lg font-semibold tracking-wider text-primary uppercase">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-primary/60 hover:text-accent p-1 transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto pr-1">
          {children}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
