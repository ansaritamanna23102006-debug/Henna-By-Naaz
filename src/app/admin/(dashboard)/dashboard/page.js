"use client";
import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  CalendarDays,
  Mail,
  Plus,
  Compass,
} from "lucide-react";
import { CardSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = await res.json();
        if (res.ok) {
          setData(json);
        } else {
          showToast(json.error || "Failed to load dashboard statistics", "error");
        }
      } catch (err) {
        showToast("Error connecting to database server", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl font-bold uppercase tracking-wider text-primary">Dashboard</h1>
          <div className="h-2 w-12 bg-accent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Services", count: data?.counts?.services || 0, icon: Briefcase, href: "/admin/services" },
    { label: "Gallery Photos", count: data?.counts?.gallery || 0, icon: ImageIcon, href: "/admin/gallery" },
    { label: "Reviews", count: data?.counts?.testimonials || 0, icon: MessageSquare, href: "/admin/testimonials" },
    { label: "Bookings", count: data?.counts?.bookings || 0, icon: CalendarDays, href: "/admin/bookings" },
    { label: "Inquiries", count: data?.counts?.messages || 0, icon: Mail, href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Widget */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
            Dashboard
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Overview of your portfolio website metrics and customer requests.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/services"
            className="bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-4 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </Link>
        </div>
      </div>

      {/* Grid Stats Widget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link
              key={i}
              href={stat.href}
              className="border border-accent/20 bg-bg-warm/65 hover:bg-bg-warm/95 hover:border-accent hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group rounded-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-sans text-[10px] tracking-wider uppercase text-secondary font-semibold">
                  {stat.label}
                </p>
                <Icon className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="font-serif text-3xl font-bold text-primary mt-4 select-none">
                {stat.count}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recents Splits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="border border-accent/15 bg-bg-ivory p-6 md:p-8 flex flex-col gap-6 rounded-sm shadow-sm relative">
          <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-accent/25" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-accent/25" />

          <div className="flex items-center justify-between border-b border-accent/10 pb-4">
            <h2 className="font-serif text-sm md:text-base font-semibold tracking-wider text-primary uppercase">
              Recent Bookings
            </h2>
            <Link
              href="/admin/bookings"
              className="font-sans text-[9px] text-accent hover:underline uppercase tracking-widest font-semibold"
            >
              View Catalog
            </Link>
          </div>

          {data?.recentBookings?.length === 0 ? (
            <p className="text-center py-8 text-xs text-primary/45 font-sans uppercase tracking-widest italic">
              No booking applications received yet.
            </p>
          ) : (
            <div className="space-y-4">
              {data?.recentBookings?.map((booking) => (
                <div
                  key={booking._id}
                  className="flex justify-between items-center border-b border-primary/5 pb-3.5 last:border-b-0 last:pb-0"
                >
                  <div className="min-w-0 pr-3">
                    <h3 className="font-serif text-sm font-semibold text-primary truncate">
                      {booking.name}
                    </h3>
                    <p className="font-sans text-[10px] text-secondary font-medium tracking-wide uppercase mt-0.5 truncate">
                      {booking.service} • {new Date(booking.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 font-sans text-[8px] font-semibold tracking-widest uppercase border shrink-0 ${
                      booking.status === "Pending"
                        ? "bg-yellow-50/50 text-yellow-700 border-yellow-200"
                        : booking.status === "Confirmed"
                        ? "bg-green-50/50 text-green-700 border-green-200"
                        : booking.status === "Completed"
                        ? "bg-blue-50/50 text-blue-700 border-blue-200"
                        : "bg-red-50/50 text-red-700 border-red-200"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="border border-accent/15 bg-bg-ivory p-6 md:p-8 flex flex-col gap-6 rounded-sm shadow-sm relative">
          <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-accent/25" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-accent/25" />

          <div className="flex items-center justify-between border-b border-accent/10 pb-4">
            <h2 className="font-serif text-sm md:text-base font-semibold tracking-wider text-primary uppercase">
              Recent Messages
            </h2>
            <Link
              href="/admin/messages"
              className="font-sans text-[9px] text-accent hover:underline uppercase tracking-widest font-semibold"
            >
              View Mailbox
            </Link>
          </div>

          {data?.recentMessages?.length === 0 ? (
            <p className="text-center py-8 text-xs text-primary/45 font-sans uppercase tracking-widest italic">
              No inquiries received yet.
            </p>
          ) : (
            <div className="space-y-4">
              {data?.recentMessages?.map((msg) => (
                <div
                  key={msg._id}
                  className="flex justify-between items-start border-b border-primary/5 pb-3.5 last:border-b-0 last:pb-0"
                >
                  <div className="min-w-0 flex-1 pr-4">
                    <h3 className="font-serif text-sm font-semibold text-primary truncate">
                      {msg.name}
                    </h3>
                    <p className="font-sans text-[10px] text-secondary font-medium tracking-wide uppercase mt-0.5 truncate">
                      {msg.subject}
                    </p>
                    <p className="font-sans text-[11px] text-primary/75 line-clamp-1 mt-1 font-light italic">
                      "{msg.message}"
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 font-sans text-[8px] font-semibold tracking-widest uppercase border shrink-0 ${
                      msg.status === "Unread"
                        ? "bg-[#3D0A11]/10 text-primary border-primary/25 font-bold animate-pulse"
                        : msg.status === "Read"
                        ? "bg-gray-50 text-gray-600 border-gray-200"
                        : "bg-green-50/50 text-green-700 border-green-200"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
