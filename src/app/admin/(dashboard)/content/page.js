"use client";
import React, { useState, useEffect } from "react";
import { Save, Image as ImageIcon } from "lucide-react";
import { CardSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import MediaPicker from "@/components/admin/MediaPicker";

export default function ContentCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(null);

  // Media Picker states
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState(""); // "heroImage" or "aboutImage"

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      const json = await res.json();
      if (res.ok) {
        setContent(json.content || {});
      } else {
        showToast(json.error || "Failed to load page content", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleInputChange = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handlePickImage = (target) => {
    setPickerTarget(target);
    setIsPickerOpen(true);
  };

  const handleMediaSelected = (url) => {
    if (pickerTarget === "heroImage") {
      handleInputChange("hero", "heroImage", url);
    } else if (pickerTarget === "aboutImage") {
      handleInputChange("about", "aboutImage", url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Homepage content saved successfully!");
      } else {
        showToast(data.error || "Failed to save content", "error");
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
        <h1 className="font-serif text-2xl font-bold uppercase tracking-wider text-primary">Website Content</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-b border-accent/10 pb-4">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
            Website Content
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Modify structural copy blocks, visual banners, and counters for the main home page.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-5 py-3 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Content"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* HERO SECTION CMS CARD */}
        <div className="border border-accent/15 bg-bg-ivory p-6 md:p-8 rounded-sm shadow-sm space-y-5 relative">
          <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t border-l border-accent/25" />
          <h2 className="font-serif text-base md:text-lg font-bold tracking-wider text-primary uppercase border-b border-accent/10 pb-3">
            Hero Section Editor
          </h2>

          {/* Heading */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Main Heading</label>
            <textarea
              rows={2}
              value={content?.hero?.heading || ""}
              onChange={(e) => handleInputChange("hero", "heading", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none font-semibold"
            />
          </div>

          {/* Subheading */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Tagline / Subheading</label>
            <input
              type="text"
              value={content?.hero?.subHeading || ""}
              onChange={(e) => handleInputChange("hero", "subHeading", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Paragraph Description</label>
            <textarea
              rows={3}
              value={content?.hero?.description || ""}
              onChange={(e) => handleInputChange("hero", "description", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Button text */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">CTA Button Text</label>
              <input
                type="text"
                value={content?.hero?.ctaButtonText || ""}
                onChange={(e) => handleInputChange("hero", "ctaButtonText", e.target.value)}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              />
            </div>
            {/* Button Link */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">CTA Button Link</label>
              <input
                type="text"
                value={content?.hero?.ctaButtonLink || ""}
                onChange={(e) => handleInputChange("hero", "ctaButtonLink", e.target.value)}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Hero Banner image picker */}
          <div className="space-y-2 border-t border-accent/10 pt-4">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold block">Hero Banner Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-24 border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
                {content?.hero?.heroImage ? (
                  <img src={content.hero.heroImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-accent/40" />
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePickImage("heroImage")}
                  className="bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-sm"
                >
                  Choose Image
                </button>
                <p className="font-sans text-[8px] text-primary/45 uppercase tracking-wide">Vertical portrait aspect suggested.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT SECTION CMS CARD */}
        <div className="border border-accent/15 bg-bg-ivory p-6 md:p-8 rounded-sm shadow-sm space-y-5 relative">
          <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t border-l border-accent/25" />
          <h2 className="font-serif text-base md:text-lg font-bold tracking-wider text-primary uppercase border-b border-accent/10 pb-3">
            About Section Editor
          </h2>

          {/* Heading */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Founder Title</label>
            <input
              type="text"
              value={content?.about?.heading || ""}
              onChange={(e) => handleInputChange("about", "heading", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent font-semibold"
            />
          </div>

          {/* Subheading */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Introduction greeting</label>
            <input
              type="text"
              value={content?.about?.subHeading || ""}
              onChange={(e) => handleInputChange("about", "subHeading", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Founder Biography</label>
            <textarea
              rows={3}
              value={content?.about?.description || ""}
              onChange={(e) => handleInputChange("about", "description", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none leading-relaxed"
            />
          </div>

          {/* Quote */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Philosophy Quote</label>
            <textarea
              rows={2}
              value={content?.about?.quote || ""}
              onChange={(e) => handleInputChange("about", "quote", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none font-light italic"
            />
          </div>

          {/* Statistics widgets */}
          <div className="grid grid-cols-3 gap-4 border-t border-accent/10 pt-4">
            <div className="space-y-1">
              <label className="font-sans text-[9px] tracking-wider uppercase text-primary/65 font-bold">Years Experience</label>
              <input
                type="text"
                value={content?.about?.experience || ""}
                onChange={(e) => handleInputChange("about", "experience", e.target.value)}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent text-center font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-sans text-[9px] tracking-wider uppercase text-primary/65 font-bold">Happy Brides</label>
              <input
                type="text"
                value={content?.about?.happyBrides || ""}
                onChange={(e) => handleInputChange("about", "happyBrides", e.target.value)}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent text-center font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="font-sans text-[9px] tracking-wider uppercase text-primary/65 font-bold">Events Covered</label>
              <input
                type="text"
                value={content?.about?.eventsCovered || ""}
                onChange={(e) => handleInputChange("about", "eventsCovered", e.target.value)}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent text-center font-bold"
              />
            </div>
          </div>

          {/* About photo picker */}
          <div className="space-y-2 border-t border-accent/10 pt-4">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold block">Founder Portrait Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-24 border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
                {content?.about?.aboutImage ? (
                  <img src={content.about.aboutImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-accent/40" />
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePickImage("aboutImage")}
                  className="bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-sm"
                >
                  Choose Image
                </button>
                <p className="font-sans text-[8px] text-primary/45 uppercase tracking-wide">Vertical portrait aspect suggested.</p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Media Picker */}
      <MediaPicker isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} onSelect={handleMediaSelected} />
    </div>
  );
}
