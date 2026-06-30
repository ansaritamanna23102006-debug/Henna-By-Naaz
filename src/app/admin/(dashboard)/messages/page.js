"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Phone, Mail, Trash2, Edit2, Check, Eye } from "lucide-react";
import { TableSkeleton } from "@/components/admin/Skeleton";
import { showToast } from "@/components/admin/Toast";
import Modal from "@/components/admin/Modal";

export default function MessagesCMS() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selection states
  const [selectedIds, setSelectedIds] = useState([]);

  // Detail Modal states
  const [activeMessage, setActiveMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      const json = await res.json();
      if (res.ok) {
        setMessages(json.messages || []);
      } else {
        showToast(json.error || "Failed to load messages", "error");
      }
    } catch (err) {
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenDetails = async (msg) => {
    setActiveMessage(msg);
    // Mark as Read if Unread
    if (msg.status === "Unread") {
      try {
        const res = await fetch("/api/admin/messages", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: msg._id, status: "Read" }),
        });
        if (res.ok) {
          fetchMessages();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleReplied = async (msg) => {
    const newStatus = msg.status === "Replied" ? "Read" : "Replied";
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: msg._id, status: newStatus }),
      });
      if (res.ok) {
        showToast(`Message marked as ${newStatus}!`);
        if (activeMessage && activeMessage._id === msg._id) {
          setActiveMessage((prev) => ({ ...prev, status: newStatus }));
        }
        fetchMessages();
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Message deleted successfully!");
        setActiveMessage(null);
        fetchMessages();
      } else {
        showToast("Failed to delete message", "error");
      }
    } catch (err) {
      showToast("Request failed", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete these ${selectedIds.length} messages?`)) return;

    try {
      const res = await fetch(`/api/admin/messages?ids=${selectedIds.join(",")}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Selected messages deleted successfully!");
        setSelectedIds([]);
        fetchMessages();
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

  const handleSelectAll = () => {
    if (selectedIds.length === filteredMessages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMessages.map((m) => m._id));
    }
  };

  // Filter Messages
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (m.email && m.email.toLowerCase().includes(search.toLowerCase())) ||
      (m.phone && m.phone.includes(search)) ||
      m.message.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase">
          Inbox & Messages
        </h1>
        <p className="font-sans text-[10px] md:text-xs text-primary/60 uppercase tracking-widest">
          Manage contact inquiries submitted from the website form.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-bg-ivory border border-accent/15 p-4 rounded-sm shadow-sm justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-xs flex items-center">
          <Search className="w-4 h-4 text-accent absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search inquiries..."
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
            {["All", "Unread", "Read", "Replied"].map((st) => (
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

      {/* Messages Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={6} />
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-16 border border-accent/15 bg-bg-ivory">
          <Mail className="w-8 h-8 text-accent/40 mx-auto mb-3" />
          <p className="font-serif text-primary/50 text-md italic mb-1">Your inbox is empty.</p>
          <p className="font-sans text-[10px] text-primary/40 uppercase tracking-widest">
            New contact submissions will be displayed here.
          </p>
        </div>
      ) : (
        <div className="bg-bg-ivory border border-accent/15 overflow-x-auto shadow-sm rounded-sm">
          <table className="w-full min-w-[800px] border-collapse text-left">
            <thead>
              <tr className="bg-bg-warm/75 border-b border-accent/15">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredMessages.length}
                    onChange={handleSelectAll}
                    className="accent-accent cursor-pointer"
                  />
                </th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Client</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Subject</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary">Message</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary text-center">Status</th>
                <th className="p-4 font-sans text-[10px] tracking-widest uppercase font-semibold text-secondary text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((m) => (
                <tr key={m._id} className="border-b border-primary/5 hover:bg-bg-warm/30 transition-colors">
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(m._id)}
                      onChange={() => handleSelectRow(m._id)}
                      className="accent-accent cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className={`font-serif text-sm ${m.status === "Unread" ? "font-bold text-primary" : "font-semibold text-primary/80"}`}>{m.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="flex items-center text-[10px] text-secondary hover:text-accent font-sans">
                          <Phone className="w-2.5 h-2.5 mr-1 shrink-0" /> {m.phone}
                        </a>
                      )}
                      <a href={`mailto:${m.email}`} className="flex items-center text-[10px] text-secondary hover:text-accent font-sans border-l border-accent/20 pl-2">
                        <Mail className="w-2.5 h-2.5 mr-1 shrink-0" /> {m.email}
                      </a>
                    </div>
                  </td>
                  <td className={`p-4 font-sans text-xs ${m.status === "Unread" ? "font-semibold text-primary" : "text-primary/75"}`}>{m.subject}</td>
                  <td className="p-4 font-sans text-xs text-primary/70 max-w-[250px] truncate">{m.message}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex px-2 py-0.5 font-sans text-[8px] font-bold tracking-widest uppercase border ${
                        m.status === "Unread"
                          ? "bg-[#3D0A11]/10 text-primary border-primary/25"
                          : m.status === "Read"
                          ? "bg-gray-50 text-gray-500 border-gray-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleOpenDetails(m)}
                        className="text-primary hover:text-accent p-1.5 border border-primary/5 hover:border-accent transition-colors cursor-pointer"
                        title="Read Message"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleReplied(m)}
                        className={`p-1.5 border transition-colors cursor-pointer ${
                          m.status === "Replied"
                            ? "bg-green-50 border-green-200 text-green-700 hover:bg-transparent"
                            : "border-primary/5 text-primary/45 hover:text-accent hover:border-accent"
                        }`}
                        title={m.status === "Replied" ? "Mark Unreplied" : "Mark Replied"}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="text-red-800 hover:text-red-500 p-1.5 border border-primary/5 hover:border-red-300 transition-colors cursor-pointer"
                        title="Delete Message"
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

      {/* Message Reader Modal */}
      <Modal isOpen={!!activeMessage} onClose={() => setActiveMessage(null)} title="Read Message">
        {activeMessage && (
          <div className="space-y-6">
            {/* Meta */}
            <div className="border border-accent/15 bg-bg-warm/50 p-4 rounded-sm space-y-3.5 font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Sender Name</span>
                  <p className="font-serif text-sm font-semibold text-primary">{activeMessage.name}</p>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Received At</span>
                  <p className="text-xs text-primary/80">{new Date(activeMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-accent/10 pt-3">
                <div className="space-y-1">
                  <span className="text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Email Address</span>
                  <a href={`mailto:${activeMessage.email}`} className="text-xs text-accent hover:underline font-medium block">
                    {activeMessage.email}
                  </a>
                </div>
                {activeMessage.phone && (
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Phone Number</span>
                    <a href={`tel:${activeMessage.phone}`} className="text-xs text-primary/80 hover:text-accent font-medium block">
                      {activeMessage.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <span className="font-sans text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Inquiry Subject</span>
              <p className="font-sans text-xs font-semibold text-primary">{activeMessage.subject}</p>
            </div>

            {/* Content */}
            <div className="space-y-1.5 border-t border-accent/10 pt-4">
              <span className="font-sans text-[8px] uppercase tracking-widest text-primary/50 font-bold block">Message Body</span>
              <p className="font-sans text-xs text-primary/85 leading-relaxed bg-bg-warm/30 p-4 border border-accent/10 rounded-sm whitespace-pre-wrap">
                {activeMessage.message}
              </p>
            </div>

            {/* Actions footer */}
            <div className="flex justify-between items-center border-t border-accent/10 pt-4">
              <button
                onClick={() => handleToggleReplied(activeMessage)}
                className={`bg-transparent px-4 py-2 border font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer ${
                  activeMessage.status === "Replied"
                    ? "border-green-200 text-green-700 hover:border-accent hover:text-accent"
                    : "border-primary/20 text-primary hover:border-accent hover:text-accent"
                }`}
              >
                {activeMessage.status === "Replied" ? "Mark Unreplied" : "Mark as Replied"}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(activeMessage._id)}
                  className="bg-red-700 text-bg-ivory border border-red-700 hover:bg-transparent hover:text-red-700 px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setActiveMessage(null)}
                  className="bg-primary text-bg-ivory border border-primary hover:bg-accent hover:text-primary hover:border-accent px-4 py-2 font-sans text-xs tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
