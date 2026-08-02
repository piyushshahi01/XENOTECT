import { NotchNavbar } from "@/components/ui/notch-navbar";
import { GlobalSplineBackground } from "@/components/ui/GlobalSplineBackground";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySection } from "@/components/sections/WhySection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";
import { StatsSection } from "@/components/sections/StatsSection";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { getBlogPosts } from "@/app/actions/blog";

function SectionDivider() {
  return <div className="section-divider-glow" aria-hidden="true" />;
}

export default async function Home() {
  const posts = await getBlogPosts(true);
  const latestPosts = posts.slice(0, 3);

  return (
    <main className="w-full relative z-0 bg-transparent overflow-x-hidden">
      <OrganizationSchema />

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
        <PortfolioSection />
        <SectionDivider />
        <WhySection />
        <SectionDivider />
        <IndustriesSection />
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
