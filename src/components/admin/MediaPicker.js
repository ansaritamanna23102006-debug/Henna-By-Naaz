import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { ImageGridSkeleton } from "./Skeleton";
import { showToast } from "./Toast";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function MediaPicker({ isOpen, onClose, onSelect }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.media) {
        setMedia(data.media);
      }
    } catch (e) {
      showToast("Failed to fetch media", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen]);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (say 15MB to be safe for Base64 MongoDB uploader)
    if (file.size > 15 * 1024 * 1024) {
      showToast("File size too large. Maximum size is 15MB.", "error");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.media) {
        showToast("Image uploaded successfully!");
        onSelect(data.media.url);
        onClose();
      } else {
        showToast(data.error || "Upload failed", "error");
      }
    } catch (err) {
      showToast("Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Media Asset" maxWidth="max-w-4xl">
      <div className="flex flex-col gap-6">
        {/* Upload Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-accent/15 pb-4">
          <p className="font-sans text-xs text-primary/60 uppercase tracking-wider">
            Choose an existing image or upload a new one to select.
          </p>
          <label className="flex items-center gap-2 bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-5 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-md font-semibold shrink-0">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? "Uploading..." : "Upload File"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Media Assets List */}
        {loading ? (
          <div className="py-6">
            <ImageGridSkeleton count={12} />
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-accent/15 bg-bg-warm/40">
            <ImageIcon className="w-8 h-8 text-accent/50 mx-auto mb-3" />
            <p className="font-serif text-primary/50 text-md italic mb-1">Your media library is empty.</p>
            <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest">
              Upload files using the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3.5 overflow-y-auto max-h-[50vh] p-0.5">
            {media.map((item) => {
              const url = `/api/media/${item._id}`;
              return (
                <button
                  key={item._id}
                  onClick={() => {
                    onSelect(url);
                    onClose();
                  }}
                  className="group relative aspect-square bg-bg-warm border border-accent/10 hover:border-accent hover:shadow-lg transition-all overflow-hidden flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={url}
                    alt={item.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                    <span className="bg-bg-ivory/95 border border-accent/25 px-2 py-1 font-sans text-[9px] tracking-wider uppercase truncate max-w-full font-semibold">
                      Use Asset
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
