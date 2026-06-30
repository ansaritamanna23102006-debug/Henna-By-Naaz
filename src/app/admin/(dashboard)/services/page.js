"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Filter, Image as ImageIcon, Check, X, ArrowUpDown } from "lucide-react";
import { TableSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";
import MediaPicker from "@/components/admin/MediaPicker";

export default function ServicesCMS() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Selection states
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal control states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "Bridal",
    featuredImage: "",
    displayOrder: 0,
    isActive: true,
  });

  // Media Picker states
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState("featuredImage"); // target field for picked media

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (res.ok) {
        setServices(json.services || []);
      } else {
        showToast(json.error || "Failed to load services", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || service.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Unique categories
  const categories = ["All", ...new Set(services.map((s) => s.category))];

  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      category: "Bridal",
      featuredImage: "",
      displayOrder: 0,
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration || "",
      category: service.category || "Bridal",
      featuredImage: service.featuredImage || "",
      displayOrder: service.displayOrder || 0,
      isActive: service.isActive !== false,
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price) {
      showToast("Title, description, and price are required", "error");
      return;
    }

    try {
      const method = editingService ? "PUT" : "POST";
      const payload = editingService ? { ...formData, _id: editingService._id } : formData;

      const res = await fetch("/api/admin/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Saved successfully!");
        setIsFormOpen(false);
        fetchServices();
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
      const res = await fetch(`/api/admin/services?id=${deletingId}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        showToast("Service deleted successfully!");
        setIsDeleteOpen(false);
        fetchServices();
      } else {
        showToast(data.error || "Delete failed", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete these ${selectedIds.length} services?`)) return;

    try {
      const res = await fetch(`/api/admin/services?ids=${selectedIds.join(",")}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        showToast("Selected services deleted successfully!");
        setSelectedIds([]);
        fetchServices();
      } else {
        showToast(data.error || "Bulk delete failed", "error");
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

  const handleSelectAll = () => {
    if (selectedIds.length === filteredServices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredServices.map((s) => s._id));
    }
  };

  const handlePickMedia = (targetField) => {
    setPickerTarget(targetField);
    setIsPickerOpen(true);
  };

  const handleMediaSelected = (url) => {
    setFormData((prev) => ({
      ...prev,
      [pickerTarget]: url,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
            Services Management
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Create, update, and sort mehendi services in your catalog.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-4 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Catalog Item</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-bg-ivory border border-accent/15 p-4 rounded-sm shadow-sm justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs flex items-center">
          <Search className="w-4 h-4 text-accent absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search catalogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary placeholder-primary/40 pl-10 pr-4 py-2 font-sans text-xs tracking-wider outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-accent shrink-0" />
          <span className="font-sans text-[10px] uppercase tracking-wider text-primary/60 font-semibold">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-8 py-2 font-sans text-xs outline-none focus:border-accent cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk Action */}
        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="w-full md:w-auto bg-red-950/10 text-red-700 hover:bg-red-700 hover:text-bg-ivory border border-red-200 hover:border-red-700 px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shrink-0"
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Services Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-16 border border-accent/15 bg-bg-ivory">
          <p className="font-serif text-primary/50 text-md italic mb-1">No services found match criteria.</p>
          <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest">
            Create a new one to populate the list.
          </p>
        </div>
      ) : (
        <div className="bg-bg-ivory border border-accent/15 overflow-x-auto shadow-sm rounded-sm">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="bg-bg-warm/75 border-b border-accent/15">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredServices.length}
                    onChange={handleSelectAll}
                    className="accent-accent cursor-pointer"
                  />
                </th>
                <th className="p-4 w-16">Image</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Title</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Category</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Price</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Duration</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary text-center">Status</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service._id} className="border-b border-primary/5 hover:bg-bg-warm/30 transition-colors">
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(service._id)}
                      onChange={() => handleSelectRow(service._id)}
                      className="accent-accent cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="w-10 h-10 border border-accent/10 overflow-hidden bg-bg-warm flex items-center justify-center shrink-0">
                      {service.featuredImage ? (
                        <img src={service.featuredImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-accent/40" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-serif text-sm font-semibold text-primary">{service.title}</div>
                    <div className="font-sans text-[10px] text-primary/50 line-clamp-1 w-[200px]">{service.description}</div>
                  </td>
                  <td className="p-4 font-sans text-xs text-primary/80 uppercase tracking-wider">{service.category}</td>
                  <td className="p-4 font-sans text-xs font-semibold text-primary">{service.price}</td>
                  <td className="p-4 font-sans text-xs text-primary/80">{service.duration || "N/A"}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex px-2 py-0.5 font-sans text-[8px] tracking-widest uppercase border font-semibold ${
                        service.isActive
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(service)}
                        className="text-primary hover:text-accent p-1.5 border border-primary/5 hover:border-accent transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(service._id)}
                        className="text-red-800 hover:text-red-500 p-1.5 border border-primary/5 hover:border-red-300 transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Dialog */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingService ? "Edit Service" : "Add New Service"}>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Service Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
                placeholder="Bridal Mehendi"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
                placeholder="Bridal / Festival / Custom"
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Pricing (e.g. From ₹5,000) *</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
                placeholder="From ₹5,000"
              />
            </div>

            {/* Duration */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Duration (e.g. 3-4 Hours)</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
                placeholder="3-4 Hours"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Description *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none"
              placeholder="Detailed description of the service..."
            />
          </div>

          {/* Featured Image Pick */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold block">Featured Image</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 border border-accent/15 bg-bg-warm flex items-center justify-center overflow-hidden shrink-0">
                {formData.featuredImage ? (
                  <img src={formData.featuredImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-accent/40" />
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePickMedia("featuredImage")}
                  className="bg-accent text-primary border border-accent hover:bg-transparent hover:text-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-sm"
                >
                  Choose Image
                </button>
                {formData.featuredImage && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, featuredImage: "" }))}
                    className="text-red-700 hover:text-red-500 font-sans text-[9px] tracking-widest uppercase font-semibold text-left"
                  >
                    Clear Image
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-accent/10 pt-4">
            {/* Display Order */}
            <div className="space-y-1">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent"
              />
            </div>

            {/* Status Switch */}
            <div className="flex items-center h-full pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 rounded-sm accent-accent"
                />
                <span className="font-sans text-[10px] tracking-widest uppercase text-primary/65 font-semibold">
                  Publish (Active status)
                </span>
              </label>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-end gap-3 border-t border-accent/15 pt-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="bg-transparent text-primary hover:text-accent border border-primary/20 hover:border-accent px-5 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent px-5 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-md"
            >
              Save Catalog
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Confirm Deletion" maxWidth="max-w-md">
        <div className="space-y-5">
          <p className="font-sans text-xs text-primary/80 leading-relaxed">
            Are you sure you want to permanently delete this catalog service? This action is irreversible and the catalog item will disappear from the homepage services list immediately.
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

      {/* Media Picker Overlay */}
      <MediaPicker isOpen={isPickerOpen} onClose={() => setIsPickerOpen(false)} onSelect={handleMediaSelected} />
    </div>
  );
}
