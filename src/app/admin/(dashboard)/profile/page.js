"use client";
import React, { useState, useEffect } from "react";
import { Save, Image as ImageIcon, Lock } from "lucide-react";
import { CardSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import MediaPicker from "@/components/admin/MediaPicker";

export default function ProfileCMS() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Media Picker state
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/me");
      const json = await res.json();
      if (res.ok && json.admin) {
        setAdmin(json.admin);
      } else {
        showToast(json.error || "Failed to load admin profile", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (field, value) => {
    setAdmin((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!admin.name || !admin.email) {
      showToast("Name and email are required", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: admin.name,
          email: admin.email,
          profileImage: admin.profileImage,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Profile details saved successfully!");
        fetchProfile();
      } else {
        showToast(data.error || "Save failed", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast("All password fields are required", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }

    if (newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showToast(data.error || "Password update failed", "error");
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
        <h1 className="font-serif text-2xl font-bold uppercase tracking-wider text-primary">Admin Profile</h1>
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-accent/10 pb-4">
        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
          Admin Profile Settings
        </h1>
        <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
          Change admin display credentials, profile avatar, and secure account password.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-4xl">
        {/* Update Details Form */}
        <form onSubmit={handleProfileSubmit} className="border border-accent/15 bg-bg-ivory p-6 md:p-8 rounded-sm shadow-sm space-y-5 relative">
          <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t border-l border-accent/25" />
          <h2 className="font-serif text-base md:text-lg font-bold tracking-wider text-primary uppercase border-b border-accent/10 pb-3">
            Profile Details
          </h2>

          {/* Name */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Display Name *</label>
            <input
              type="text"
              required
              value={admin.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent font-semibold"
              placeholder="Tabassum"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Admin Email *</label>
            <input
              type="email"
              required
              value={admin.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="admin@hennabynaaz.com"
            />
          </div>

          {/* Profile image picker */}
          <div className="space-y-2 border-t border-accent/10 pt-4">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold block">Profile Avatar</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
                {admin.profileImage ? (
                  <img src={admin.profileImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-serif text-lg font-semibold text-primary">{admin.name[0] || "T"}</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-sm"
                >
                  Choose Avatar
                </button>
                {admin.profileImage && (
                  <button
                    type="button"
                    onClick={() => handleInputChange("profileImage", "")}
                    className="text-red-700 hover:text-red-500 font-sans text-[9px] tracking-widest uppercase font-semibold text-left"
                  >
                    Clear Avatar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2 border-t border-accent/10">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent px-5 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Info</span>
            </button>
          </div>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit} className="border border-accent/15 bg-bg-ivory p-6 md:p-8 rounded-sm shadow-sm space-y-5 relative">
          <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t border-l border-accent/25" />
          <h2 className="font-serif text-base md:text-lg font-bold tracking-wider text-primary uppercase border-b border-accent/10 pb-3">
            Change Password
          </h2>

          {/* Current Password */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="••••••••"
            />
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/65 font-bold">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2 border-t border-accent/10">
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent px-5 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Media Picker Overlay */}
      <MediaPicker isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} onSelect={(url) => handleInputChange("profileImage", url)} />
    </div>
  );
}
