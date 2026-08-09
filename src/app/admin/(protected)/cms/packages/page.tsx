"use client";

import React, { useEffect, useState } from "react";
import { getCmsPackages, getCmsServices, getCmsFeatures } from "@/app/actions/cms";
import { PackageForm } from "./PackageForm";

export default function PackagesCmsPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    Promise.all([getCmsPackages(), getCmsServices(), getCmsFeatures()]).then(([pkgData, srvData, featData]) => {
      setPackages(pkgData);
      setServices(srvData);
      setFeatures(featData);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Pass all features so the user can include core configuration steps in packages if they want
  const addonFeatures = features;

  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col gap-3 relative z-10">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-neutral-400 w-max mb-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          CMS Module
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">Pricing Packages</h1>
        <p className="text-neutral-400 max-w-lg text-lg">Manage the project packages available in the wizard and on the services pages.</p>
        
        <div className="mt-4">
          <PackageForm services={services} allFeatures={addonFeatures} onSuccess={loadData} />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => <div key={i} className="h-72 rounded-[2.5rem] bg-white/[0.02] border border-white/5 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          {packages.map((pkg) => (
            <div key={pkg.id} className="anime-child p-1.5 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl hover:border-white/10 transition-colors group">
              <div className="h-full rounded-[calc(2.5rem-6px)] bg-[#0A0A0F]/90 border border-white/5 p-8 flex flex-col gap-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/[0.05] transition-colors pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold">{pkg.serviceId}</span>
                    <h3 className="text-3xl font-display font-bold text-white tracking-tight">{pkg.title}</h3>
                  </div>
                  <div className="text-right flex flex-col gap-1 items-end">
                    <div className="text-2xl font-sans font-medium text-white mb-4">
                      ${pkg.priceUsd.toLocaleString()}
                      <span className="text-sm text-neutral-500 font-mono ml-2">/ ₹{pkg.priceInr.toLocaleString()}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 rounded border border-white/10 bg-white/5">
                      <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono">TIMELINE: {pkg.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 flex-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Included Features</p>
                  <div className="flex flex-wrap gap-2.5">
                    {pkg.features.map((f: string, i: number) => (
                      <span key={i} className="text-xs font-medium bg-white/5 border border-white/10 text-neutral-300 px-3 py-1.5 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-end">
                    <PackageForm pkg={pkg} services={services} allFeatures={addonFeatures} onSuccess={loadData} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
