"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  X, Mail, Phone, Building2, Globe, MapPin, Clock, DollarSign,
  CircleDot, ChevronDown, Check, Hash, Tag, FileText, AlertCircle,
  Loader2, StickyNote
} from "lucide-react";

const STATUS_OPTIONS = [
  "NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"
] as const;

const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

const statusColors: Record<string, string> = {
  NEW: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  CONTACTED: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  QUALIFIED: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  PROPOSAL_SENT: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  NEGOTIATION: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  WON: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.15)]",
  LOST: "text-neutral-500 bg-neutral-500/10 border-neutral-500/30",
};

const priorityColors: Record<string, string> = {
  LOW: "text-neutral-400 bg-neutral-400/10 border-neutral-400/30",
  MEDIUM: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  HIGH: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  URGENT: "text-rose-400 bg-rose-400/10 border-rose-400/30 shadow-[0_0_15px_rgba(251,113,133,0.2)]",
};

interface LeadDetailModalProps {
  lead: any;
  onClose: () => void;
  onUpdate: (id: string, updates: { status?: string; priority?: string }) => void;
}

export function LeadDetailModal({ lead, onClose, onUpdate }: LeadDetailModalProps) {
  const [status, setStatus] = useState<string>(lead.status);
  const [priority, setPriority] = useState<string>(lead.priority);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  const inquiry = lead.serviceInquiries?.[0];
  const estimatedPrice = inquiry?.estimatedPrice
    ? Number(inquiry.estimatedPrice)
    : null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const body: Record<string, string> = {};
      if (status !== lead.status) body.status = status;
      if (priority !== lead.priority) body.priority = priority;
      if (note.trim()) body.note = note.trim();

      if (Object.keys(body).length === 0) {
        setSaving(false);
        return;
      }

      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onUpdate(lead.id, { status, priority });
        setNote("");
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
      />
      <motion.aside
        key="panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xl bg-[#07070A] border-l border-white/[0.07] shadow-[-40px_0_80px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-lg text-white shrink-0">
              {lead.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">{lead.fullName}</h2>
              {lead.company && (
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">{lead.company}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
          >
            <X className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Inquiry ID + date */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
              <Hash className="w-3 h-3" />
              {lead.inquiryId}
            </div>
            <div className="flex items-center gap-2 text-neutral-500 text-xs">
              <Clock className="w-3 h-3" />
              {format(new Date(lead.createdAt), "MMM dd, yyyy · HH:mm")}
            </div>
          </div>

          {/* Status & Priority row */}
          <div className="px-6 py-5 grid grid-cols-2 gap-4 border-b border-white/5">
            {/* Status selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={`w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wide bg-transparent cursor-pointer focus:outline-none transition-all ${statusColors[status] || statusColors.NEW}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-[#111] text-white normal-case tracking-normal font-normal">{s.replace("_", " ")}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
              </div>
            </div>

            {/* Priority selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">Priority</label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wide bg-transparent cursor-pointer focus:outline-none transition-all ${priorityColors[priority] || priorityColors.MEDIUM}`}
                >
                  {PRIORITY_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-[#111] text-white normal-case tracking-normal font-normal">{p}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-60" />
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="px-6 py-5 border-b border-white/5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Contact Information</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors group">
                <Mail className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                {lead.email}
              </a>
              {lead.phone && (
                <a href={`tel:${lead.phone}`} className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors group">
                  <Phone className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  {lead.phone}
                </a>
              )}
              {lead.company && (
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <Building2 className="w-4 h-4 text-neutral-500" />
                  {lead.company}
                </div>
              )}
              {lead.country && (
                <div className="flex items-center gap-3 text-sm text-neutral-400">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  {lead.country}
                </div>
              )}
              {lead.source && (
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <Tag className="w-3.5 h-3.5" />
                  Source: {lead.source}
                </div>
              )}
            </div>
          </div>

          {/* Project Inquiry */}
          {inquiry && (
            <div className="px-6 py-5 border-b border-white/5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Project Inquiry</p>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Service</p>
                    <p className="text-white font-semibold capitalize">{inquiry.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Package</p>
                    <p className="text-white font-semibold capitalize">{inquiry.package}</p>
                  </div>
                </div>

                {estimatedPrice !== null && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-400/5 border border-emerald-400/10">
                    <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest">Estimated Value</p>
                      <p className="text-emerald-400 font-mono font-bold text-lg">${estimatedPrice.toLocaleString()}</p>
                    </div>
                    {inquiry.timeline && (
                      <div className="ml-auto text-right">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest">Timeline</p>
                        <p className="text-white text-sm font-medium">{inquiry.timeline}</p>
                      </div>
                    )}
                  </div>
                )}

                {inquiry.requirements && (
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Requirements</p>
                    <p className="text-neutral-300 text-sm leading-relaxed bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                      {inquiry.requirements}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes history */}
          {lead.leadNotes?.length > 0 && (
            <div className="px-6 py-5 border-b border-white/5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Notes</p>
              <div className="flex flex-col gap-3">
                {lead.leadNotes.map((n: any) => (
                  <div key={n.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-sm text-neutral-300 leading-relaxed">{n.note}</p>
                    <p className="text-[10px] text-neutral-600 mt-2">
                      {format(new Date(n.createdAt), "MMM dd · HH:mm")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add note */}
          <div className="px-6 py-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3 flex items-center gap-2">
              <StickyNote className="w-3 h-3" /> Add a Note
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write a note about this lead..."
              rows={3}
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer — Save button */}
        <div className="shrink-0 px-6 py-5 border-t border-white/5 bg-[#07070A]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-white text-black font-bold text-sm tracking-tight hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
            ) : saved ? (
              <><Check className="w-4 h-4 text-emerald-600" /> Saved!</>
            ) : (
              <>Save Changes</>
            )}
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
