"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { GoldMandala } from "@/components/Mandalas";
import ToastContainer, { showToast } from "@/components/admin/Toast";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter both email and password", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Welcome back, Tabassum!", "success");
        setTimeout(() => {
          router.push("/admin/dashboard");
          router.refresh();
        }, 1000);
      } else {
        showToast(data.error || "Invalid credentials", "error");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <GoldMandala className="w-[500px] h-[500px] md:w-[700px] md:h-[700px]" opacity="opacity-30" />
      </div>

      <div className="relative w-full max-w-md bg-[#4A0A12] border border-accent/25 px-8 py-10 shadow-2xl z-10">
        {/* Corner Decors */}
        <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-accent/30" />
        <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-accent/30" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-accent text-glow">
            Henna by Naaz
          </h1>
          <p className="text-[10px] tracking-[0.25em] uppercase text-bg-warm/75 font-sans mt-0.5">
            CMS Admin Control
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] tracking-widest uppercase text-bg-warm/80 font-medium">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-accent/60 absolute left-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hennabynaaz.com"
                className="w-full bg-primary/40 border border-accent/20 text-bg-ivory placeholder-bg-warm/30 pl-10 pr-4 py-3 font-sans text-xs tracking-wider outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] tracking-widest uppercase text-bg-warm/80 font-medium">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-accent/60 absolute left-3" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-primary/40 border border-accent/20 text-bg-ivory placeholder-bg-warm/30 pl-10 pr-10 py-3 font-sans text-xs tracking-wider outline-none focus:border-accent transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-accent/60 hover:text-accent p-1 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me check */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-3.5 h-3.5 rounded-sm accent-accent border-accent bg-transparent focus:ring-0 focus:outline-none outline-none"
              />
              <span className="font-sans text-[10px] tracking-widest uppercase text-bg-warm/75">
                Remember login
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent font-sans text-xs tracking-widest uppercase py-4 font-semibold shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? "Authenticating..." : "Login Session"}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-bg-warm/45 tracking-wider uppercase font-sans border-t border-accent/10 pt-4">
          Secured with JWT Session authentication
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
