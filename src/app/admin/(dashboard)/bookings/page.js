"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, CalendarDays, Phone, Mail, MapPin, Download, Trash2, Edit2, Check, X, ArrowUpDown } from "lucide-react";
import { TableSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";

export default function BookingsCMS() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selection states
  const [selectedIds, setSelectedIds] = useState([]);

  // Detail Modal states
  const [activeBooking, setActiveBooking] = useState(null);
  const [notesInput, setNotesInput] = useState("");
  const [statusInput, setStatusInput] = useState("Pending");
  const [updating, setUpdating] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const json = await res.json();
      if (res.ok) {
        setBookings(json.bookings || []);
      } else {
        showToast(json.error || "Failed to load bookings", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleOpenDetails = (b) => {
    setActiveBooking(b);
    setNotesInput(b.notes || "");
    setStatusInput(b.status || "Pending");
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: activeBooking._id,
          status: statusInput,
          notes: notesInput,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Booking updated successfully!");
        setActiveBooking(null);
        fetchBookings();
      } else {
        showToast(data.error || "Failed to update booking", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking request?")) return;
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Booking request deleted successfully!");
        fetchBookings();
      } else {
        showToast("Failed to delete booking", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete these ${selectedIds.length} booking requests?`)) return;

    try {
      const res = await fetch(`/api/admin/bookings?ids=${selectedIds.join(",")}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Selected bookings deleted successfully!");
        setSelectedIds([]);
        fetchBookings();
      } else {
        showToast("Bulk delete failed", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;

    const headers = ["Name", "Phone", "Email", "Event Date", "Location", "Requested Service", "Status", "Notes", "Created At"];
    const rows = bookings.map((b) => [
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.phone}"`,
      `"${(b.email || "").replace(/"/g, '""')}"`,
      new Date(b.eventDate).toLocaleDateString(),
      `"${b.location.replace(/"/g, '""')}"`,
      `"${b.service}"`,
      b.status,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
      new Date(b.createdAt).toLocaleDateString(),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `henna_bookings_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV Exported successfully!");
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredBookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBookings.map((b) => b._id));
    }
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      (b.email && b.email.toLowerCase().includes(search.toLowerCase())) ||
      b.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
            Bookings Catalog
          </h1>
          <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
            Browse and schedule client appointments, edit statuses, and export database files.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-primary text-bg-ivory hover:bg-accent hover:text-primary border border-primary hover:border-accent px-4 py-2.5 font-sans text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-bg-ivory border border-accent/15 p-4 rounded-sm shadow-sm justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs flex items-center">
          <Search className="w-4 h-4 text-accent absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-warm/50 border border-accent/15 text-primary placeholder-primary/40 pl-10 pr-4 py-2 font-sans text-xs tracking-wider outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-accent shrink-0" />
          <span className="font-sans text-[10px] uppercase tracking-wider text-primary/60 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-8 py-2 font-sans text-xs outline-none focus:border-accent cursor-pointer"
          >
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Bulk delete */}
        {selectedIds.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="w-full md:w-auto bg-red-950/10 text-red-700 hover:bg-red-700 hover:text-bg-ivory border border-red-200 hover:border-red-700 px-4 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shrink-0"
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>

      {/* Bookings Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={7} />
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-16 border border-accent/15 bg-bg-ivory">
          <p className="font-serif text-primary/50 text-md italic mb-1">No booking requests found.</p>
          <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest">
            New requests from the website forms will show up here automatically.
          </p>
        </div>
      ) : (
        <div className="bg-bg-ivory border border-accent/15 overflow-x-auto shadow-sm rounded-sm">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="bg-bg-warm/75 border-b border-accent/15">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredBookings.length}
                    onChange={handleSelectAll}
                    className="accent-accent cursor-pointer"
                  />
                </th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Client</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Service</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Date</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Location</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary text-center">Status</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b._id} className="border-b border-primary/5 hover:bg-bg-warm/30 transition-colors">
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(b._id)}
                      onChange={() => handleSelectRow(b._id)}
                      className="accent-accent cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-serif text-sm font-semibold text-primary">{b.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <a href={`tel:${b.phone}`} className="flex items-center text-[10px] text-secondary hover:text-accent font-sans">
                        <Phone className="w-2.5 h-2.5 mr-1 shrink-0" /> {b.phone}
                      </a>
                      {b.email && (
                        <a href={`mailto:${b.email}`} className="flex items-center text-[10px] text-secondary hover:text-accent font-sans border-l border-accent/20 pl-2">
                          <Mail className="w-2.5 h-2.5 mr-1 shrink-0" /> {b.email}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-sans text-xs text-primary/80 font-semibold">{b.service}</td>
                  <td className="p-4 font-sans text-xs text-primary/80">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-accent shrink-0" />
                      {new Date(b.eventDate).toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </td>
                  <td className="p-4 font-sans text-xs text-primary/80">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span className="truncate max-w-[200px]" title={b.location}>{b.location}</span>
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-0.5 font-sans text-[8px] font-bold tracking-widest uppercase border ${
                        b.status === "Pending"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : b.status === "Confirmed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : b.status === "Completed"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenDetails(b)}
                        className="text-primary hover:text-accent p-1.5 border border-primary/5 hover:border-accent transition-colors cursor-pointer"
                        title="Edit Booking Status"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="text-red-800 hover:text-red-500 p-1.5 border border-primary/5 hover:border-red-300 transition-colors cursor-pointer"
                        title="Delete Booking"
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

      {/* Details / Status Update Modal */}
      <Modal isOpen={!!activeBooking} onClose={() => setActiveBooking(null)} title="Booking Request Status">
        {activeBooking && (
          <form onSubmit={handleUpdateBooking} className="space-y-6">
            {/* Meta client information card */}
            <div className="border border-accent/15 bg-bg-warm/50 p-4 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="font-sans text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Client Name</span>
                <p className="font-serif text-sm font-semibold text-primary">{activeBooking.name}</p>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Requested Service</span>
                <p className="font-sans text-xs font-semibold text-primary uppercase tracking-wider">{activeBooking.service}</p>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Event Date</span>
                <p className="font-sans text-xs text-primary/80">{new Date(activeBooking.eventDate).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Location</span>
                <p className="font-sans text-xs text-primary/80 truncate">{activeBooking.location}</p>
              </div>
            </div>

            {/* Status Select */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Update Status</label>
              <select
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-8 py-2.5 font-sans text-xs outline-none focus:border-accent cursor-pointer"
              >
                {["Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] tracking-wider uppercase text-primary/60 font-semibold">Admin Notes & Comments</label>
              <textarea
                rows={4}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="w-full bg-bg-warm/50 border border-accent/15 text-primary pl-3 pr-3 py-2.5 font-sans text-xs outline-none focus:border-accent resize-none"
                placeholder="Add special instructions, client requests, payment status, etc..."
              />
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-3 border-t border-accent/10 pt-4">
              <button
                type="button"
                onClick={() => setActiveBooking(null)}
                className="bg-transparent text-primary hover:text-accent border border-primary/20 hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer shadow-md"
              >
                {updating ? "Saving..." : "Save Status"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
