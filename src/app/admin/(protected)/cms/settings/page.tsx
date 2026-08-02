"use client";

import React, { useEffect, useState } from "react";
import { getCmsGlobalSettings, updateCmsGlobalSettings } from "@/app/actions/cms";
import { Save } from "lucide-react";

export default function GlobalSettingsCmsPage() {
  const [settings, setSettings] = useState({
    exchangeRate: 83.5,
    basePriceWeb: 2000,
    basePriceAi: 3000,
    basePriceGr: 2500
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCmsGlobalSettings().then(data => {
      if (data) setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateCmsGlobalSettings({
      exchangeRate: Number(settings.exchangeRate),
      basePriceWeb: Number(settings.basePriceWeb),
      basePriceAi: Number(settings.basePriceAi),
      basePriceGr: Number(settings.basePriceGr)
    });
    setSaving(false);
    alert("Settings updated successfully!");
  };

  if (loading) {
    return <div className="p-12 text-white/50">Loading settings...</div>;
  }

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto pb-32">
      <div className="flex flex-col gap-3">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max mb-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          CMS Module
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">Global Settings</h1>
        <p className="text-neutral-400 max-w-lg text-lg">Manage exchange rates and base prices for the cost estimator.</p>
      </div>

      <div className="p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="rounded-[calc(2.5rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex flex-col gap-8 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

          <div className="grid grid-cols-1 gap-6 relative z-10">
            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Exchange Rate (USD to INR)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">₹</span>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={settings.exchangeRate}
                  onChange={e => setSettings({...settings, exchangeRate: e.target.value as any})}
                  className="w-full bg-[#050508] border border-white/10 rounded-2xl pl-9 pr-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Base Price (Web Solutions)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input 
                  type="number" 
                  required
                  value={settings.basePriceWeb}
                  onChange={e => setSettings({...settings, basePriceWeb: e.target.value as any})}
                  className="w-full bg-[#050508] border border-white/10 rounded-2xl pl-9 pr-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Base Price (AI Solutions)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input 
                  type="number" 
                  required
                  value={settings.basePriceAi}
                  onChange={e => setSettings({...settings, basePriceAi: e.target.value as any})}
                  className="w-full bg-[#050508] border border-white/10 rounded-2xl pl-9 pr-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500">Base Price (Growth Solutions)</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input 
                  type="number" 
                  required
                  value={settings.basePriceGr}
                  onChange={e => setSettings({...settings, basePriceGr: e.target.value as any})}
                  className="w-full bg-[#050508] border border-white/10 rounded-2xl pl-9 pr-5 py-4 text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all font-mono text-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-white/5 flex justify-end relative z-10">
            <button 
              type="submit" 
              disabled={saving}
              className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2 active:scale-95"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
