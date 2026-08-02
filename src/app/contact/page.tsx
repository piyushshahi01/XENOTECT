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


export default async function ContactPage() {
  const services = await getCmsServices();
  const packages = await getCmsPackages();
  const features = await getCmsFeatures();

  return (
    <main className="w-full min-h-[100dvh] bg-[#020203] text-white flex flex-col md:flex-row relative">
      <XenotectNav />
      
      {/* Left Column: Client Project Wizard */}
      <div className="w-full md:w-1/2 h-[100dvh] pt-24 pb-12 px-6 sm:px-12 md:px-16 lg:px-24 flex flex-col justify-start relative z-10 bg-[#020203] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 w-max text-[10px] uppercase tracking-[0.2em] font-bold mt-8 md:mt-0">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <ProjectWizard 
          initialServices={services} 
          initialPackages={packages} 
          initialFeatures={features} 
        />

        {/* Alternative Contact Methods */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-8">
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

      {/* Right Column: 3D Robot */}
      <div className="hidden md:block w-1/2 min-h-screen relative overflow-hidden bg-[#020203] border-l border-white/5 fixed right-0 top-0 bottom-0">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[150%] xl:w-[120%] flex items-center justify-center">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full scale-75 origin-center" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#020203_100%)] pointer-events-none"></div>
      </div>
    </main>
  );
}
