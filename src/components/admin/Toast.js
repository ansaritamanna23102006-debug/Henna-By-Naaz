"use client";
import React, { useState, useEffect } from "react";

let toastCallback = null;

export const showToast = (message, type = "success") => {
  if (toastCallback) {
    toastCallback(message, type);
  } else {
    console.log(`[Toast] ${type}: ${message}`);
  }
};

export default function ToastContainer() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    toastCallback = (message, type) => {
      setToast({ message, type });
    };
    return () => {
      toastCallback = null;
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const bgStyles = {
    success: "bg-primary border-accent text-bg-ivory shadow-accent/15",
    error: "bg-[#3D0A11] border-red-800 text-red-200 shadow-red-950/20",
    info: "bg-[#2A2421] border-secondary text-bg-warm shadow-black/10",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] transition-all duration-300 transform translate-y-0 scale-100">
      <div className={`px-5 py-3.5 border luxury-shadow flex items-center gap-3 bg-opacity-98 ${bgStyles[toast.type] || bgStyles.success}`}>
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <p className="font-sans text-xs tracking-wider uppercase font-medium">{toast.message}</p>
        <button 
          onClick={() => setToast(null)}
          className="ml-3 text-[10px] text-accent/60 hover:text-accent font-semibold focus:outline-none uppercase"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
