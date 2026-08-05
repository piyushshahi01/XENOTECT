"use client";

import React from "react";
import { useRouter } from "next/navigation";
import JackPortfolio from "@/components/sections/portfolio/JackPortfolio";

export default function PortfolioClient() {
  const router = useRouter();
  return <JackPortfolio onBackToToonhub={() => router.push("/")} />;
}
