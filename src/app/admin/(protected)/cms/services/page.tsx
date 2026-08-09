"use client";

import React, { useEffect, useState } from "react";
import { getCmsServices } from "@/app/actions/cms";
import { ServiceForm } from "./ServiceForm";

export default function ServicesCmsPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    getCmsServices().then(data => {
      setServices(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col gap-3 relative z-10">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max mb-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          CMS Module
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">Core Services</h1>
        <p className="text-neutral-400 max-w-lg text-lg">Manage the primary services that clients can select.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => <div key={i} className="h-64 rounded-[2.5rem] bg-white/[0.02] border border-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {services.map((service) => (
            <div key={service.id} className="anime-child p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:border-white/10 transition-colors group">
              <div className="h-full rounded-[calc(2.5rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-8 flex flex-col gap-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/[0.05] transition-colors pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{service.id}</span>
                    <h3 className="text-3xl font-display font-bold text-white tracking-tight">{service.title}</h3>
                  </div>
                  {service.icon && (
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-white">
                      {/* Note: since icon is a string in DB, this might need dynamic mapping, but preserving original logic */}
                      {typeof service.icon === 'string' ? <span className="font-mono text-xs">{service.icon}</span> : service.icon}
                    </div>
                  )}
                </div>
                
                <div className="relative z-10 flex-1">
                  <p className="text-base text-neutral-400 leading-relaxed max-w-md">{service.description}</p>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end relative z-10">
                  <ServiceForm service={service} onSuccess={loadData} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
