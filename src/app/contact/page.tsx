import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { XenotectNav } from "@/components/ui/XenotectNav";
import { SplineScene } from "@/components/ui/splite";
import { ProjectWizard } from "@/components/sections/wizard/ProjectWizard";
import { getCmsServices, getCmsPackages, getCmsFeatures } from "@/app/actions/cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project — Get a Free Quote & Consultation",
  description:
    "Ready to build something great? Tell us about your project and get a custom quote in minutes. Our team specialises in web development, AI solutions, and digital marketing for startups and enterprises.",
  keywords: [
    "hire web developer", "get website quote", "start a project",
    "web development consultation", "free project quote",
    "hire AI developer", "digital agency contact",
    "custom software quote", "project inquiry",
  ],
  openGraph: {
    title: "Start a Project | XENOTECT",
    description: "Tell us about your project and get a custom quote in minutes.",
    url: "https://xenotect.com/contact",
  },
  alternates: { canonical: "https://xenotect.com/contact" },
};


export default async function ContactPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const serviceId = typeof searchParams?.serviceId === 'string' ? searchParams.serviceId : undefined;
  const packageId = typeof searchParams?.packageId === 'string' ? searchParams.packageId : undefined;
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  const services = await getCmsServices();
  const packages = await getCmsPackages();
  const features = await getCmsFeatures();

  return (
    <main className="w-full min-h-[100dvh] bg-[#020203] text-white flex flex-col md:flex-row relative">
      <XenotectNav />
      
      {/* Left Column: scrollable wizard */}
      <div className="w-full md:w-1/2 min-h-[100dvh] pt-28 pb-24 px-6 md:px-12 xl:px-16 flex flex-col relative z-20 bg-[#020203] overflow-y-auto">
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white/[0.025] to-transparent pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />

        <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-10 w-max text-[10px] uppercase tracking-[0.2em] font-bold relative z-10">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="relative z-10 flex-1">
          <ProjectWizard 
            initialServices={services} 
            initialPackages={packages} 
            initialFeatures={features} 
            preSelectedServiceId={serviceId}
            preSelectedPackageId={packageId}
            preSelectedCategory={category}
          />
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-8 relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Or reach out directly:</span>
          <div className="flex items-center gap-6">
            <a href="mailto:hello@xenotect.com" className="text-neutral-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
        
      </div>

      {/* Right Column: 3D Robot — sticky, no pointer events on canvas */}
      <div className="hidden md:block md:w-1/2 h-[100dvh] sticky top-0 bg-[#020203] border-l border-white/5 overflow-hidden">
        {/* Robot scene — pointer-events-none so it NEVER captures mouse scroll */}
        <div className="absolute inset-0 pointer-events-none">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
        </div>
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#020203_85%)] pointer-events-none" />
        {/* Left edge fade so robot doesn't bleed into wizard */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020203] to-transparent pointer-events-none" />
      </div>
    </main>
  );
}
