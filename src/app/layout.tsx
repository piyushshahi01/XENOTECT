import type { Metadata } from "next";
import { Inter, Kanit, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroller } from "@/components/ui/SmoothScroller";
import { PageTransitionProvider } from "@/components/ui/PageTransition";
import { WizardProvider } from "@/context/WizardContext";
import { WizardModalClient } from "@/components/sections/wizard/WizardModalClient";
import { getCmsServices, getCmsPackages, getCmsFeatures } from "@/app/actions/cms";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { StringTuneProvider } from "@/components/providers/StringTuneProvider";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kanit-custom",
});

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

const BASE_URL = "https://xenotect.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "XENOTECT — Web Development, AI Solutions & Digital Marketing Agency",
    template: "%s | XENOTECT",
  },
  description:
    "Premium web development and AI solutions agency. We build custom SaaS platforms, voice AI agents, and provide expert SEO to scale your business.",
  keywords: [
    "web development agency",
    "custom website development",
    "AI solutions agency",
    "AI automation",
    "voice AI agents",
    "chatbot development",
    "UI UX design agency",
    "digital marketing agency",
    "SEO agency",
    "performance marketing",
    "Next.js development",
    "React development",
    "SaaS development company",
    "business automation",
    "n8n automation",
    "OpenAI integration",
    "LangChain development",
    "web design agency India",
    "digital engineering studio",
    "Xenotect",
    "hire web developer",
    "startup web development",
    "enterprise software development",
    "ecommerce website development",
    "mobile app development agency",
  ],
  authors: [{ name: "XENOTECT", url: BASE_URL }],
  creator: "XENOTECT",
  publisher: "XENOTECT",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "XENOTECT",
    title: "XENOTECT — Web Development, AI Solutions & Digital Marketing Agency",
    description:
      "Premium web development and AI solutions agency. We build custom SaaS platforms, voice AI agents, and provide expert SEO to scale your business.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XENOTECT — Digital Engineering Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XENOTECT — Web Development, AI Solutions & Digital Marketing Agency",
    description:
      "Premium web development and AI solutions agency. We build custom SaaS platforms, voice AI agents, and provide expert SEO to scale your business.",
    images: ["/og-image.png"],
    creator: "@xenotect",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "technology",
  other: {
    "google-site-verification": "", // Add your Google Search Console verification token here
  },
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const services = await getCmsServices();
  const packages = await getCmsPackages();
  const features = await getCmsFeatures();
  return (
    <html lang="en" className={`bg-black`}>
      <body className={`antialiased bg-black text-[#e5e5e5] ${inter.className} overflow-x-hidden w-full max-w-full`}>
        <AuthProvider>
        <StringTuneProvider>
          <SmoothScroller>
            <WizardProvider>
              <PageTransitionProvider>
                {children}
                <WizardModalClient 
                  initialServices={services} 
                  initialPackages={packages} 
                  initialFeatures={features} 
                />
              </PageTransitionProvider>
            </WizardProvider>
          </SmoothScroller>
        </StringTuneProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
