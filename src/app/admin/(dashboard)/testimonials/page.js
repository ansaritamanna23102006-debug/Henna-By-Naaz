"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Star, Image as ImageIcon, MapPin, Gift, Check, X } from "lucide-react";
import { TableSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";
import MediaPicker from "@/components/admin/MediaPicker";

export default function TestimonialsCMS() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal Control
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    clientName: "",
    review: "",
    rating: 5,
    image: "",
    location: "",
    eventType: "",
    isFeatured: false,
  });

  // Media Picker State
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const json = await res.json();
      if (res.ok) {
        setTestimonials(json.testimonials || []);
      } else {
        showToast(json.error || "Failed to fetch reviews", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenCreate = () => {
    setEditingTestimonial(null);
    setFormData({
      clientName: "",
      review: "",
      rating: 5,
      image: "",
      location: "",
      eventType: "",
      isFeatured: false,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTestimonial(t);
    setFormData({
      clientName: t.clientName,
      review: t.review,
      rating: t.rating || 5,
      image: t.image || "",
      location: t.location || "",
      eventType: t.eventType || "",
      isFeatured: !!t.isFeatured,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.review) {
      showToast("Client name and review are required", "error");
      return;
    }

    try {
      const method = editingTestimonial ? "PUT" : "POST";
      const payload = editingTestimonial ? { ...formData, _id: editingTestimonial._id } : formData;

      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Review saved successfully!");
        setIsFormOpen(false);
        fetchTestimonials();
      } else {
        showToast(data.error || "Save failed", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`/api/admin/testimonials?id=${deletingId}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Review deleted successfully!");
        setIsDeleteOpen(false);
        fetchTestimonials();
      } else {
        showToast("Failed to delete review", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleToggleFeatured = async (t) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: t._id,
          isFeatured: !t.isFeatured,
        }),
      });
      if (res.ok) {
        showToast(`Review ${!t.isFeatured ? "featured" : "unfeatured"}!`);
        fetchTestimonials();
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
            Testimonials & Reviews
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Manage client feedback, toggle featured recommendations on the homepage.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-4 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Testimonial</span>
        </button>
      </div>

      {/* Grid of Testimonials */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TableSkeleton rows={3} cols={2} />
          <TableSkeleton rows={3} cols={2} />
          <TableSkeleton rows={3} cols={2} />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16 border border-accent/15 bg-bg-ivory">
          <MessageSquare className="w-8 h-8 text-accent/40 mx-auto mb-3" />
          <p className="font-serif text-primary/50 text-md italic mb-1">No reviews found.</p>
          <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest">
            Click the button above to add a client review.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className={`relative border p-6 bg-bg-ivory rounded-sm shadow-sm flex flex-col justify-between group transition-all duration-300 ${
                t.isFeatured ? "border-accent ring-1 ring-accent/30" : "border-accent/15 hover:border-accent"
              }`}
            >
              {/* Featured Ribbon Badge */}
              {t.isFeatured && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-accent text-primary border border-accent font-sans text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-sm">
                  Featured
                </div>
              )}

              {/* Review Text */}
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent" />
                  ))}
                </div>

                <p className="font-sans text-xs text-primary/85 leading-relaxed font-light italic">
                  "{t.review}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-between border-t border-accent/10 pt-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-accent/25 overflow-hidden shrink-0 bg-bg-warm flex items-center justify-center">
                    {t.image ? (
                      <img src={t.image} alt={t.clientName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-serif text-sm font-semibold text-primary">{t.clientName[0]}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-semibold text-primary truncate">{t.clientName}</h4>
                    <div className="flex items-center gap-2 font-sans text-[9px] text-primary/55 uppercase tracking-wider mt-0.5">
                      {t.location && (
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-accent shrink-0" />
                          <span className="truncate">{t.location}</span>
                        </span>
                      )}
                      {t.eventType && (
                        <span className="flex items-center gap-0.5">
                          <Gift className="w-2.5 h-2.5 text-accent shrink-0" />
                          <span className="truncate">{t.eventType}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Operations */}
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => handleToggleFeatured(t)}
                    className={`p-1 border transition-colors cursor-pointer ${
                      t.isFeatured
                        ? "bg-accent/15 border-accent text-accent"
                        : "bg-transparent border-primary/5 text-primary/45 hover:text-accent hover:border-accent"
                    }`}
                    title={t.isFeatured ? "Unfeature" : "Feature"}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1 border border-primary/5 hover:border-accent text-primary/45 hover:text-accent bg-transparent transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(t._id)}
                    className="p-1 border border-primary/5 hover:border-red-300 text-primary/45 hover:text-red-700 bg-transparent transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Form Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingTestimonial ? "Edit Review" : "Add Review"}>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Name */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Client Name *</label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData((prev) => ({ ...prev, clientName: e.target.value }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
                placeholder="Jane Doe"
              />
            </div>

            {/* Rating */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Rating (1-5 Stars)</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: parseInt(e.target.value) || 5 }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-8 py-2.5 font-sans text-xs outline-none focus:border-accent cursor-pointer"
              >
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>
                    {val} Stars
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Client Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
                placeholder="Mumbai, IN"
              />
            </div>

            {/* Event Type */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Event Type</label>
              <input
                type="text"
                value={formData.eventType}
                onChange={(e) => setFormData((prev) => ({ ...prev, eventType: e.target.value }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
                placeholder="Bridal / Engagement / Festival"
              />
            </div>
          </div>

          {/* Review text */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Review content *</label>
            <textarea
              required
              rows={4}
              value={formData.review}
              onChange={(e) => setFormData((prev) => ({ ...prev, review: e.target.value }))}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none"
              placeholder="Write the client's detailed feedback here..."
            />
          </div>

          {/* Client profile image */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold block">Client Image</label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
                {formData.image ? (
                  <img src={formData.image} alt="" className="w-full h-full object-cover" />
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
                  Choose Photo
                </button>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                    className="text-red-700 hover:text-red-500 font-sans text-[9px] tracking-widest uppercase font-semibold text-left"
                  >
                    Clear Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 rounded-sm accent-accent"
              />
              <span className="font-sans text-[10px] tracking-widest uppercase text-primary/65 font-semibold">
                Feature on Homepage
              </span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 border-t border-accent/10 pt-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-transparent text-primary hover:text-accent border border-primary/20 hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-md"
            >
              Save Feedback
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Review" maxWidth="max-w-md">
        <div className="space-y-5">
          <p className="font-sans text-xs text-primary/80 leading-relaxed">
            Are you sure you want to delete this review? This action is permanent and cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="bg-transparent text-primary hover:text-accent border border-primary/20 hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-700 text-bg-ivory border border-red-700 hover:bg-transparent hover:text-red-700 px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-md"
            >
              Delete Permanently
            </button>
          </div>
        </div>
      </Modal>

      {/* Media Picker */}
      <MediaPicker isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} onSelect={(url) => setFormData(prev => ({ ...prev, image: url }))} />
    </div>
  );
}
