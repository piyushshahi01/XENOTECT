"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import {
  Mail, Phone, Calendar, ArrowRight, CircleDot, User,
  ArrowUpRight, Search, Filter, X, TrendingUp, Zap, BellRing
} from "lucide-react";
import { useAnimeReveal } from "@/hooks/useAnimeReveal";
import { LeadDetailModal } from "@/components/admin/LeadDetailModal";
import { motion, AnimatePresence } from "framer-motion";

const statusColors: Record<string, string> = {
  NEW: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  CONTACTED: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  QUALIFIED: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  PROPOSAL_SENT: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  NEGOTIATION: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  WON: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]",
  LOST: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20",
};

const ALL_STATUSES = ["ALL", "NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"];

// ─── Toast Notification ────────────────────────────────────────────────────────
function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed top-6 right-6 z-[100] flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl bg-[#0f0f14] border border-emerald-400/30 shadow-[0_0_40px_rgba(52,211,153,0.15),0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-sm"
    >
      {/* Pulse dot */}
      <div className="relative shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
      </div>
      <p className="text-sm text-white font-medium flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="w-6 h-6 rounded-full flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLive, setIsLive] = useState(false);
  const esRef = useRef<EventSource | null>(null);

  // Anime.js reveals
  const headerRef = useAnimeReveal<HTMLDivElement>({ direction: "up", distance: "30px", duration: 1000 });
  const metricsRef = useAnimeReveal<HTMLDivElement>({ stagger: 100, direction: "up", distance: "20px" });

  // ── Fetch leads from DB ──────────────────────────────────────────────────────
  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (e) {
      console.error("Failed to fetch leads", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── SSE connection for real-time updates ─────────────────────────────────────
  useEffect(() => {
    fetchLeads();

    const es = new EventSource("/api/admin/stream");
    esRef.current = es;

    es.onopen = () => setIsLive(true);
    es.onerror = () => setIsLive(false);

    es.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data);

        if (event.type === "new_lead") {
          // Re-fetch full leads to get all relations
          fetchLeads();
          const name = event.payload?.fullName || "Unknown";
          const service = event.payload?.service || "project";
          setToast(`🔔 New inquiry from ${name} — ${service}`);
        }

        if (event.type === "lead_updated") {
          // Patch just the changed lead in local state
          const { id, status, priority } = event.payload as any;
          setLeads((prev) =>
            prev.map((l) => (l.id === id ? { ...l, status, priority } : l))
          );
        }
      } catch {
        // SSE comment/ping lines start with ":" and are not JSON — ignore
      }
    };

    return () => {
      es.close();
      setIsLive(false);
    };
  }, [fetchLeads]);

  // ── Handle status/priority update from modal ──────────────────────────────────
  const handleLeadUpdate = (id: string, updates: { status?: string; priority?: string }) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    if (selectedLead?.id === id) {
      setSelectedLead((prev: any) => ({ ...prev, ...updates }));
    }
  };

  // ── Derived stats ─────────────────────────────────────────────────────────────
  const pipelineValue = leads
    .filter((l) => l.status !== "LOST")
    .reduce((sum, l) => {
      const price = l.serviceInquiries?.[0]?.estimatedPrice;
      return sum + (price ? Number(price) : 0);
    }, 0);

  const stats = [
    { label: "Total Leads", value: leads.length, icon: User },
    { label: "New Inquiries", value: leads.filter((l) => l.status === "NEW").length, icon: BellRing },
    { label: "Qualified", value: leads.filter((l) => l.status === "QUALIFIED").length, icon: TrendingUp },
    {
      label: "Pipeline Value",
      value: `$${pipelineValue.toLocaleString()}`,
      icon: ArrowUpRight,
      mono: true,
    },
  ];

  // ── Filtered leads ────────────────────────────────────────────────────────────
  const filteredLeads = leads.filter((l) => {
    const matchStatus = statusFilter === "ALL" || l.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      l.fullName.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <>
      {/* Real-time Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
      </AnimatePresence>

      {/* Lead Detail Slide-over */}
      <AnimatePresence>
        {selectedLead && (
          <LeadDetailModal
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={handleLeadUpdate}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pb-32">

        {/* ── Header ── */}
        <div ref={headerRef} className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              Dashboard Overview
            </div>
            {/* Live indicator */}
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold border transition-colors ${isLive ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-neutral-600 bg-neutral-600/10 border-neutral-600/20"}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" : "bg-neutral-600"}`} />
              {isLive ? "Live" : "Connecting…"}
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">Command Center</h1>
          <p className="text-neutral-400 max-w-lg text-lg">
            Real-time lead management — updates instantly when clients submit a request.
          </p>
        </div>

        {/* ── Metric Cards ── */}
        <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="anime-child p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
              >
                <div className="h-full rounded-[calc(2rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-6 flex flex-col justify-between gap-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] group hover:bg-white/[0.03] transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/[0.05] transition-colors pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500">{stat.label}</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <Icon className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  </div>
                  <span className={`text-4xl font-display font-bold text-white tracking-tighter relative z-10 ${stat.mono ? "font-mono text-emerald-400 text-3xl" : ""}`}>
                    {loading ? "—" : stat.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Search & Filter ── */}
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, company…"
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/20 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <X className="w-3 h-3 text-neutral-400" />
              </button>
            )}
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide border transition-all ${
                  statusFilter === s
                    ? "bg-white text-black border-white"
                    : "text-neutral-500 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* ── Leads List ── */}
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Recent Inquiries
              {!loading && (
                <span className="ml-3 text-sm font-normal text-neutral-500">
                  {filteredLeads.length} {filteredLeads.length === 1 ? "lead" : "leads"}
                  {statusFilter !== "ALL" || searchQuery ? " (filtered)" : ""}
                </span>
              )}
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 rounded-[1.5rem] bg-white/[0.02] border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl text-center flex flex-col items-center justify-center gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <User className="w-8 h-8 text-neutral-500" />
              </div>
              <p className="text-neutral-400 text-lg max-w-md">
                {searchQuery || statusFilter !== "ALL"
                  ? "No leads match your search or filter."
                  : "No leads yet. Once someone completes the wizard, they'll appear here in real-time."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {filteredLeads.map((lead) => {
                  let interest = "General Inquiry";
                  let amount = "";
                  if (lead.serviceInquiries?.length > 0) {
                    interest = `${lead.serviceInquiries[0].service} · ${lead.serviceInquiries[0].package}`;
                    if (lead.serviceInquiries[0].estimatedPrice) {
                      amount = `$${Number(lead.serviceInquiries[0].estimatedPrice).toLocaleString()}`;
                    }
                  }

                  return (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="group relative p-1.5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md hover:border-white/10 transition-colors"
                    >
                      <div className="rounded-[calc(1.5rem-6px)] bg-[#0A0A0F]/80 p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                        {/* Hover glow */}
                        <div className="absolute top-1/2 left-0 w-32 h-32 bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 -translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        {/* Lead name & company */}
                        <div className="flex items-center gap-5 min-w-[180px] relative z-10">
                          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                            <span className="text-base font-display font-bold text-white">{lead.fullName.charAt(0)}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-base font-bold text-white tracking-tight">{lead.fullName}</span>
                            {lead.company ? (
                              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-medium">{lead.company}</span>
                            ) : (
                              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-600 font-medium">Individual</span>
                            )}
                          </div>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-1.5 text-sm text-neutral-400 relative z-10">
                          <div className="flex items-center gap-2.5">
                            <Mail className="w-3.5 h-3.5 text-neutral-500" /> {lead.email}
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2.5">
                              <Phone className="w-3.5 h-3.5 text-neutral-500" /> {lead.phone}
                            </div>
                          )}
                        </div>

                        {/* Interest / Amount */}
                        <div className="flex flex-col lg:items-center relative z-10 min-w-[120px]">
                          <span className="text-sm font-medium text-white capitalize">{interest}</span>
                          {amount && (
                            <span className="text-xs text-emerald-400 mt-1 font-mono font-bold">{amount}</span>
                          )}
                        </div>

                        {/* Status + date + open button */}
                        <div className="flex items-center gap-4 relative z-10 ml-auto">
                          <div className="flex flex-col items-end gap-2">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] border ${statusColors[lead.status] || statusColors.NEW}`}>
                              <CircleDot className="w-3 h-3" />
                              {lead.status.replace("_", " ")}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(lead.createdAt), "MMM dd, yyyy")}
                            </div>
                          </div>

                          {/* Open detail */}
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 hover:scale-105 transition-all duration-300 active:scale-95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                          >
                            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
