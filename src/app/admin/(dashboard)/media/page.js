"use client";
import React, { useState, useEffect } from "react";
import { Upload, Trash2, Search, Image as ImageIcon, Loader2 } from "lucide-react";
import { ImageGridSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";

export default function MediaManagerCMS() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?search=${search}`);
      const json = await res.json();
      if (res.ok) {
        setMedia(json.media || []);
      } else {
        showToast(json.error || "Failed to load media items", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMedia();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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
      if (file.size > 15 * 1024 * 1024) {
        showToast(`File ${file.name} is too large. Max size 15MB.`, "error");
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          successCount++;
        }
      } catch (err) {
        console.error(err);
      }
    }

    setUploading(false);
    if (successCount > 0) {
      showToast(`Successfully uploaded ${successCount} assets!`);
      fetchMedia();
    } else {
      showToast("Upload failed", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset from the library? Any content pages referencing it will display broken links.")) return;
    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Asset deleted from library!");
        fetchMedia();
      } else {
        showToast("Failed to delete asset", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
          Media Manager
        </h1>
        <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
          Browse, upload, search, and delete image assets in your central media library.
        </p>
      </div>

      {/* Drag & Drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-sm p-8 text-center transition-colors cursor-pointer relative ${
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
                Uploading assets to database...
              </p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-accent/60" />
              <p className="font-serif text-primary/70 text-md font-medium">
                Drag & Drop Images here, or <span className="text-accent underline">Browse files</span>
              </p>
              <p className="font-sans text-[9px] text-primary/45 uppercase tracking-widest mt-1">
                Supports JPG, PNG, WEBP (Max 15MB each)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-bg-ivory border border-accent/15 p-4 rounded-sm shadow-sm justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs flex items-center">
          <Search className="w-4 h-4 text-accent absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search filenames..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary placeholder-primary/40 pl-10 pr-4 py-2 font-sans text-xs tracking-wider outline-none focus:border-accent transition-colors"
          />
        </div>
        <p className="font-sans text-[10px] text-primary/50 uppercase tracking-widest">
          Showing {media.length} library assets
        </p>
      </div>

      {/* Media Grid */}
      {loading && media.length === 0 ? (
        <ImageGridSkeleton count={12} />
      ) : media.length === 0 ? (
        <div className="text-center py-16 border border-accent/15 bg-bg-ivory">
          <ImageIcon className="w-8 h-8 text-accent/40 mx-auto mb-3" />
          <p className="font-serif text-primary/50 text-md italic mb-1">No media files found.</p>
          <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest">
            Drag files in the dropzone above to upload.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {media.map((item) => {
            const url = `/api/media/${item._id}`;
            return (
              <div key={item._id} className="group relative border border-accent/15 hover:border-accent bg-bg-ivory rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                {/* Actions */}
                <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 bg-bg-ivory/95 hover:bg-red-700 border border-accent/20 hover:border-red-700 text-primary hover:text-bg-ivory transition-all cursor-pointer shadow-sm"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Picture */}
                <div className="aspect-square bg-bg-warm flex items-center justify-center overflow-hidden">
                  <img src={url} alt={item.filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>

                {/* Detail bar */}
                <div className="p-3 border-t border-accent/10 bg-bg-warm/30 font-sans text-[10px] space-y-0.5">
                  <p className="text-primary font-semibold truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <div className="flex justify-between text-primary/50">
                    <span>{formatBytes(item.size)}</span>
                    <span className="uppercase">{item.mimeType.split("/")[1]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
