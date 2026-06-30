"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  CalendarDays,
  Mail,
  Search,
  Settings as SettingsIcon,
  User,
  LogOut,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { showToast } from "./Toast";

export default function Sidebar({ admin }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Content (Hero/About)", href: "/admin/content", icon: FileText },
    { label: "Services", href: "/admin/services", icon: Briefcase },
    { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
    { label: "Messages", href: "/admin/messages", icon: Mail },
    { label: "SEO Config", href: "/admin/seo", icon: Search },
    { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
    { label: "Profile", href: "/admin/profile", icon: User },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth/logout", { method: "POST" });
      if (res.ok) {
        showToast("Logged out successfully");
        router.push("/admin/login");
        router.refresh();
      } else {
        showToast("Logout failed", "error");
      }
    } catch (err) {
      showToast("Logout failed", "error");
    }
  };

  const activeClass = "bg-accent/15 border-l-4 border-accent text-accent font-semibold";
  const inactiveClass = "text-bg-warm/75 hover:bg-white/5 hover:text-bg-ivory border-l-4 border-transparent";

  return (
    <>
      {/* Mobile top navigation header */}
      <div className="xl:hidden bg-primary border-b border-accent/20 px-6 py-4 flex items-center justify-between z-40 fixed top-0 left-0 right-0">
        <Link href="/admin/dashboard" className="flex flex-col select-none">
          <span className="font-serif text-lg font-bold text-accent tracking-wider">Henna by Naaz</span>
          <span className="text-[8px] tracking-widest text-bg-warm/60 uppercase -mt-1 font-sans">CMS Control</span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-bg-ivory hover:text-accent p-1 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar background overlay on mobile */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-primary/45 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-primary border-r border-accent/15 flex flex-col justify-between w-64 transform xl:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } pt-20 xl:pt-8 pb-6`}
      >
        <div className="flex flex-col flex-1">
          {/* Logo / Header */}
          <div className="hidden xl:flex flex-col px-7 mb-8 select-none">
            <span className="font-serif text-xl font-semibold tracking-wider text-accent text-glow">
              Henna by Naaz
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-bg-warm/70 font-sans -mt-1">
              CMS Admin Panel
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 font-sans text-xs tracking-wider uppercase transition-all duration-300 ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile Card & Logout */}
        <div className="px-3 border-t border-accent/10 pt-4 mt-4 space-y-2">
          {admin && (
            <div className="flex items-center gap-3.5 px-4 py-2 border border-accent/10 bg-black/10 rounded-sm">
              <div className="w-9 h-9 rounded-full border border-accent/30 overflow-hidden shrink-0 bg-secondary flex items-center justify-center">
                {admin.profileImage ? (
                  <img src={admin.profileImage} alt={admin.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif text-bg-ivory text-sm font-semibold">{admin.name[0]}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-sm font-medium text-bg-ivory truncate">{admin.name}</p>
                <p className="text-[10px] text-bg-warm/50 truncate font-sans">{admin.email}</p>
              </div>
            </div>
          )}

          {/* View Website Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 px-4 py-2.5 font-sans text-xs tracking-wider uppercase text-accent hover:bg-accent/10 transition-all"
          >
            <Compass className="w-4 h-4 text-accent" />
            <span>View Website</span>
          </a>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 font-sans text-xs tracking-wider uppercase text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all border-l-4 border-transparent cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
