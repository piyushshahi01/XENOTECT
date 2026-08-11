import { NotchNavbar } from "@/components/ui/notch-navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { Footer } from "@/components/sections/Footer";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { getBlogPosts } from "@/app/actions/blog";
import dynamic from "next/dynamic";
import { Metadata } from "next";

// Heavy visual backgrounds dynamically loaded on client only
const ChromaBackground = dynamic(() => import("@/components/ui/ChromaBackground"));
const GlobalSplineBackground = dynamic(() => import("@/components/ui/GlobalSplineBackground").then(mod => mod.GlobalSplineBackground));

// Below-the-fold sections dynamically imported to reduce initial TTFB and JS payload
const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(mod => mod.StatsSection));
const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then(mod => mod.AboutSection));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then(mod => mod.ServicesSection));
const WhySection = dynamic(() => import("@/components/sections/WhySection").then(mod => mod.WhySection));
const PortfolioSection = dynamic(() => import("@/components/sections/PortfolioSection").then(mod => mod.PortfolioSection));
const PricingSection = dynamic(() => import("@/components/sections/PricingSection").then(mod => mod.PricingSection));
const BlogSection = dynamic(() => import("@/components/sections/BlogSection").then(mod => mod.BlogSection));
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(mod => mod.FAQSection));
const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => mod.CTASection));

function SectionDivider() {
  return <div className="section-divider-glow" aria-hidden="true" />;
}

export const metadata: Metadata = {
  title: "Web Development, AI & SEO Agency | XENOTECT",
  description: "XENOTECT is a digital engineering and growth agency. We build custom websites, AI automation agents, and technical SEO strategies for modern businesses.",
  keywords: ["digital engineering agency", "web development agency", "AI automation agency", "SEO growth agency"],
  alternates: {
    canonical: "https://www.xenotectsolution.com",
  }
};

export default async function Home() {
  const posts = await getBlogPosts(true);
  const latestPosts = posts.slice(0, 3);

  return (
    <main className="w-full relative z-0 bg-transparent overflow-x-hidden">
      <OrganizationSchema />

      <ChromaBackground />
      <GlobalSplineBackground />

      <div className="relative z-10 w-full h-full bg-transparent pointer-events-none">
        <NotchNavbar />
        <HeroSection />
        <StatsSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ServicesSection />
        <SectionDivider />
        <WhySection />
        <SectionDivider />
        <PortfolioSection />
        <SectionDivider />
        <PricingSection />
        <SectionDivider />
        <BlogSection posts={latestPosts} />
        <SectionDivider />
        <FAQSection />
        <SectionDivider />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
