"use client";
import React, { useState, useEffect } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import { CardSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import MediaPicker from "@/components/admin/MediaPicker";

export default function SettingsCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "",
    businessLogo: "",
    phone: "",
    whatsApp: "",
    email: "",
    instagram: "",
    facebook: "",
    address: "",
    workingHours: "",
    googleMapsLink: "",
  });

  // Media Picker state
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (res.ok && json.settings) {
        setSettings(json.settings);
      } else {
        showToast(json.error || "Failed to load settings", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Global configurations saved successfully!");
      } else {
        showToast(data.error || "Failed to save configurations", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="font-serif text-2xl font-bold uppercase tracking-wider text-primary">Global Settings</h1>
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-b border-accent/10 pb-4">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
            Global Settings
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Configure default phone numbers, emails, locations, open hours, and social page parameters.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-5 py-3 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Config..." : "Save Settings"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="border border-accent/15 bg-bg-ivory p-6 md:p-8 rounded-sm shadow-sm space-y-6 relative max-w-3xl">
        <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t border-l border-accent/25" />
        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b border-r border-accent/25" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Business Name */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Business Name *</label>
            <input
              type="text"
              required
              value={settings.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent font-semibold"
              placeholder="Henna by Naaz"
            />
          </div>

          {/* Business Hours */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Working Hours</label>
            <input
              type="text"
              value={settings.workingHours}
              onChange={(e) => handleInputChange("workingHours", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="9:00 AM - 9:00 PM (Daily)"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Phone Number</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="+91 91676 00320"
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">WhatsApp Number</label>
            <input
              type="text"
              value={settings.whatsApp}
              onChange={(e) => handleInputChange("whatsApp", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="+91 91676 00320"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="heenabynaaz20@gmail.com"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Office/Service Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="Home-Visit Service available across the region"
            />
          </div>

          {/* Instagram URL */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Instagram Page Link</label>
            <input
              type="text"
              value={settings.instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="https://instagram.com/henna-by-naaz"
            />
          </div>

          {/* Facebook URL */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Facebook Page Link</label>
            <input
              type="text"
              value={settings.facebook}
              onChange={(e) => handleInputChange("facebook", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="https://facebook.com/henna-by-naaz"
            />
          </div>
        </div>

        {/* Google Maps Embed/Link */}
        <div className="space-y-1">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Google Maps Share Link</label>
          <input
            type="text"
            value={settings.googleMapsLink}
            onChange={(e) => handleInputChange("googleMapsLink", e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
            placeholder="https://maps.google.com/?cid=..."
          />
        </div>

        {/* Business Logo picker */}
        <div className="space-y-2 border-t border-accent/10 pt-4">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold block">Business Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
              {settings.businessLogo ? (
                <img src={settings.businessLogo} alt="" className="w-full h-full object-contain p-1" />
              ) : (
                <ImageIcon className="w-5 h-5 text-accent/40" />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-sm"
              >
                Choose Logo
              </button>
              <p className="font-sans text-[8px] text-primary/45 uppercase tracking-wide">Prefer PNG with transparent background.</p>
            </div>
          </div>
        </div>
      </form>

      {/* Media Picker */}
      <MediaPicker isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} onSelect={(url) => handleInputChange("businessLogo", url)} />
    </div>
  );
}
