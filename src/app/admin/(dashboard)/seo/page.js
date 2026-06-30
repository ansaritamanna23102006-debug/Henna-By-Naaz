"use client";
import React, { useState, useEffect } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import { CardSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import MediaPicker from "@/components/admin/MediaPicker";

export default function SeoCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seo, setSeo] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    openGraphImage: "",
    favicon: "",
    googleAnalyticsId: "",
  });

  // Media Picker states
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState("openGraphImage");

  const fetchSeo = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo");
      const json = await res.json();
      if (res.ok && json.seo) {
        setSeo(json.seo);
      } else {
        showToast(json.error || "Failed to load SEO configuration", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const handleInputChange = (field, value) => {
    setSeo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOpenPicker = (target) => {
    setPickerTarget(target);
    setIsPickerOpen(true);
  };

  const handleMediaSelected = (url) => {
    handleInputChange(pickerTarget, url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seo),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("SEO configuration saved successfully!");
      } else {
        showToast(data.error || "Failed to save configuration", "error");
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
        <h1 className="font-serif text-2xl font-bold uppercase tracking-wider text-primary">SEO Settings</h1>
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
            SEO Configuration
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Manage search engine tags, keyword indexes, social graph metadata, and analytics keys.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-5 py-3 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Tags..." : "Save SEO Details"}</span>
        </button>
      </div>

      {/* SEO Form */}
      <form onSubmit={handleSubmit} className="border border-accent/15 bg-bg-ivory p-6 md:p-8 rounded-sm shadow-sm space-y-6 relative max-w-3xl">
        <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t border-l border-accent/25" />
        <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b border-r border-accent/25" />

        {/* Meta Title */}
        <div className="space-y-1">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Meta Title *</label>
          <input
            type="text"
            required
            value={seo.metaTitle}
            onChange={(e) => handleInputChange("metaTitle", e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent font-semibold"
            placeholder="Henna by Naaz | Premium Luxury Mehendi Artist by Tabassum"
          />
          <p className="text-[10px] text-primary/45 font-sans">Ideal length: 50-60 characters.</p>
        </div>

        {/* Meta Description */}
        <div className="space-y-1">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Meta Description *</label>
          <textarea
            rows={3}
            required
            value={seo.metaDescription}
            onChange={(e) => handleInputChange("metaDescription", e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none leading-relaxed"
            placeholder="Bespoke, premium, and intricate bridal mehendi artistry by Tabassum..."
          />
          <p className="text-[10px] text-primary/45 font-sans">Ideal length: 150-160 characters.</p>
        </div>

        {/* Keywords */}
        <div className="space-y-1">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Search Keywords (Comma separated)</label>
          <textarea
            rows={2}
            value={seo.keywords}
            onChange={(e) => handleInputChange("keywords", e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none"
            placeholder="Henna by Naaz, Tabassum Mehendi Artist, Bridal Mehendi..."
          />
        </div>

        {/* Google Analytics ID */}
        <div className="space-y-1">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Google Analytics Tracking ID (e.g. G-XXXXXXX)</label>
          <input
            type="text"
            value={seo.googleAnalyticsId || ""}
            onChange={(e) => handleInputChange("googleAnalyticsId", e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
            placeholder="G-R28X4H9F9S"
          />
        </div>

        {/* Social Share Image Picker */}
        <div className="space-y-2 border-t border-accent/10 pt-4">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold block">Open Graph Image (Social Sharing Banner)</label>
          <div className="flex items-center gap-4">
            <div className="w-28 h-20 border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
              {seo.openGraphImage ? (
                <img src={seo.openGraphImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-accent/40" />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => handleOpenPicker("openGraphImage")}
                className="bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-sm"
              >
                Choose Image
              </button>
              <p className="font-sans text-[8px] text-primary/45 uppercase tracking-wide">Suggested landscape aspect: 1200 x 630 pixels.</p>
            </div>
          </div>
        </div>

        {/* Favicon picker */}
        <div className="space-y-2 border-t border-accent/10 pt-4">
          <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold block">Website Favicon</label>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
              {seo.favicon ? (
                <img src={seo.favicon} alt="" className="w-full h-full object-contain p-1" />
              ) : (
                <ImageIcon className="w-4 h-4 text-accent/40" />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => handleOpenPicker("favicon")}
                className="bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-sm"
              >
                Choose Favicon
              </button>
              <p className="font-sans text-[8px] text-primary/45 uppercase tracking-wide">Must be square format (.ico, .png, .svg)</p>
            </div>
          </div>
        </div>
      </form>

      {/* Media Picker */}
      <MediaPicker isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} onSelect={handleMediaSelected} />
    </div>
  );
}
