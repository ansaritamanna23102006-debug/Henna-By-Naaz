"use client";
import React, { useState, useEffect } from "react";
import { Upload, Trash2, Edit2, Search, Filter, Image as ImageIcon, Check, Loader2 } from "lucide-react";
import { ImageGridSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";

export default function GalleryCMS() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Selection states
  const [selectedIds, setSelectedIds] = useState([]);

  // Drag and drop states
  const [dragOver, setDragOver] = useState(false);

  // Edit states
  const [editingImage, setEditingImage] = useState(null);
  const [editFormData, setEditFormData] = useState({
    category: "Bridal",
    altText: "",
    displayOrder: 0,
  });

  const categories = ["Bridal", "Traditional", "Arabic", "Feet", "Festival", "Minimalist"];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const json = await res.json();
      if (res.ok) {
        setImages(json.images || []);
      } else {
        showToast(json.error || "Failed to load gallery items", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleUploadFiles(files);
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleUploadFiles(files);
    }
  };

  const handleUploadFiles = async (files) => {
    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Step 1: Upload file to media library
      const formData = new FormData();
      formData.append("file", file);

      try {
        const mediaRes = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });
        const mediaData = await mediaRes.json();

        if (mediaRes.ok && mediaData.media) {
          // Step 2: Create Gallery record for this media uploader URL
          const galleryRes = await fetch("/api/admin/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: mediaData.media.url,
              category: categoryFilter !== "All" ? categoryFilter : "Bridal",
              altText: file.name.split(".")[0],
              displayOrder: images.length + successCount,
            }),
          });

          if (galleryRes.ok) {
            successCount++;
          }
        }
      } catch (err) {
        console.error("Failed to upload image index: " + i, err);
      }
    }

    setUploading(false);
    if (successCount > 0) {
      showToast(`Successfully uploaded ${successCount} images!`);
      fetchGallery();
    } else {
      showToast("Upload failed", "error");
    }
  };

  const handleOpenEdit = (img) => {
    setEditingImage(img);
    setEditFormData({
      category: img.category || "Bridal",
      altText: img.altText || "",
      displayOrder: img.displayOrder || 0,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: editingImage._id,
          ...editFormData,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Gallery item updated successfully!");
        setEditingImage(null);
        fetchGallery();
      } else {
        showToast(data.error || "Failed to update item", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery photo?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Image deleted successfully!");
        fetchGallery();
      } else {
        showToast("Failed to delete image", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete these ${selectedIds.length} gallery photos?`)) return;

    try {
      const res = await fetch(`/api/admin/gallery?ids=${selectedIds.join(",")}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Selected photos deleted successfully!");
        setSelectedIds([]);
        fetchGallery();
      } else {
        showToast("Bulk delete failed", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const filteredImages = images.filter((img) => {
    return categoryFilter === "All" || img.category === categoryFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
            Gallery Management
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Upload multiple gallery images, set categories, and write alt descriptions.
          </p>
        </div>
      </div>

      {/* Drag & Drop Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-sm p-10 text-center transition-colors cursor-pointer relative ${
          dragOver ? "border-accent bg-accent/5" : "border-accent/25 bg-bg-ivory hover:border-accent"
        }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploading}
        />
        <div className="flex flex-col items-center justify-center gap-3">
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
              <p className="font-sans text-xs tracking-wider uppercase text-primary/75 font-semibold">
                Uploading and saving files...
              </p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-accent/60" />
              <p className="font-serif text-primary/70 text-md font-medium">
                Drag & Drop Multiple Images here, or <span className="text-accent underline">Browse files</span>
              </p>
              <p className="font-sans text-[9px] text-primary/45 uppercase tracking-widest mt-1">
                Supports JPG, PNG, WEBP (Max 15MB each)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Category Bar & Bulk Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-accent/15 pb-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setCategoryFilter("All")}
            className={`px-4 py-2 font-sans text-[10px] tracking-widest uppercase transition-all font-semibold rounded-sm border cursor-pointer ${
              categoryFilter === "All"
                ? "bg-primary border-primary text-bg-ivory"
                : "bg-bg-ivory border-accent/15 text-primary hover:border-accent"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 font-sans text-[10px] tracking-widest uppercase transition-all font-semibold rounded-sm border cursor-pointer ${
                categoryFilter === cat
                  ? "bg-primary border-primary text-bg-ivory"
                  : "bg-bg-ivory border-accent/15 text-primary hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bulk Action */}
        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="w-full md:w-auto bg-red-950/10 text-red-700 hover:bg-red-700 hover:text-bg-ivory border border-red-200 hover:border-red-700 px-4 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shrink-0"
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <ImageGridSkeleton count={12} />
      ) : filteredImages.length === 0 ? (
        <div className="text-center py-16 border border-accent/15 bg-bg-ivory">
          <ImageIcon className="w-8 h-8 text-accent/40 mx-auto mb-3" />
          <p className="font-serif text-primary/50 text-md italic mb-1">No gallery items found in this category.</p>
          <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest">
            Upload images above or choose a different tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {filteredImages.map((img) => {
            const isSelected = selectedIds.includes(img._id);
            return (
              <div
                key={img._id}
                className={`group relative border transition-all bg-bg-ivory rounded-sm overflow-hidden flex flex-col justify-between ${
                  isSelected ? "border-accent shadow-md shadow-accent/5 ring-1 ring-accent" : "border-accent/15 hover:border-accent"
                }`}
              >
                {/* Select Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelectRow(img._id)}
                  className="absolute top-2.5 left-2.5 w-4 h-4 rounded-sm accent-accent cursor-pointer z-10"
                />

                {/* Action Hover Panel */}
                <div className="absolute top-2.5 right-2.5 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(img)}
                    className="p-1.5 bg-bg-ivory/95 hover:bg-accent border border-accent/20 hover:border-accent text-primary transition-all cursor-pointer shadow-sm"
                    title="Edit Info"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="p-1.5 bg-bg-ivory/95 hover:bg-red-700 border border-accent/20 hover:border-red-700 text-primary hover:text-bg-ivory transition-all cursor-pointer shadow-sm"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Picture */}
                <div className="aspect-square bg-bg-warm flex items-center justify-center overflow-hidden relative">
                  <img src={img.url} alt={img.altText} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Description bar */}
                <div className="p-3 border-t border-accent/10 bg-bg-warm/30">
                  <p className="font-sans text-[10px] text-secondary font-bold uppercase tracking-wider truncate">
                    {img.category}
                  </p>
                  <p className="font-sans text-[10px] text-primary/60 truncate mt-0.5" title={img.altText || "No Alt text"}>
                    {img.altText || "No description"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Form Modal */}
      <Modal isOpen={!!editingImage} onClose={() => setEditingImage(null)} title="Edit Image Info" maxWidth="max-w-md">
        <form onSubmit={handleEditSubmit} className="space-y-5">
          {/* Category */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Category</label>
            <select
              value={editFormData.category}
              onChange={(e) => setEditFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-8 py-2.5 font-sans text-xs outline-none focus:border-accent cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Alt Text */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Alt Text (SEO Description)</label>
            <input
              type="text"
              value={editFormData.altText}
              onChange={(e) => setEditFormData((prev) => ({ ...prev, altText: e.target.value }))}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              placeholder="e.g. Bridal Henna Pattern with peacock motif"
            />
          </div>

          {/* Display Order */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Display Order</label>
            <input
              type="number"
              value={editFormData.displayOrder}
              onChange={(e) => setEditFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 border-t border-accent/10 pt-4">
            <button
              type="button"
              onClick={() => setEditingImage(null)}
              className="bg-transparent text-primary hover:text-accent border border-primary/20 hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-md"
            >
              Save Details
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
