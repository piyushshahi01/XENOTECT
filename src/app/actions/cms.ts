"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }
}

// -----------------------------------------------------------------------------
// SERVICES
// -----------------------------------------------------------------------------

export async function getCmsServices() {
  return await prisma.cmsService.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createCmsService(data: { id: string; title: string; description: string; icon?: string; order: number }) {
  await checkAdmin();
  await prisma.cmsService.create({ data });
  revalidatePath("/", "layout");
}

export async function updateCmsService(id: string, data: { title: string; description: string; icon?: string; order: number }) {
  await checkAdmin();
  await prisma.cmsService.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteCmsService(id: string) {
  await checkAdmin();
  await prisma.cmsService.delete({ where: { id } });
  revalidatePath("/", "layout");
}

// -----------------------------------------------------------------------------
// PACKAGES
// -----------------------------------------------------------------------------

export async function getCmsPackages() {
  return await prisma.cmsPackage.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createCmsPackage(data: { id: string; serviceId: string; title: string; priceUsd: number; priceInr: number; time: string; features: string[]; detailedContent?: string | null; order: number }) {
  await checkAdmin();
  await prisma.cmsPackage.create({ data });
  revalidatePath("/", "layout");
}

export async function updateCmsPackage(id: string, data: { title: string; priceUsd: number; priceInr: number; time: string; features: string[]; detailedContent?: string | null; order: number }) {
  await checkAdmin();
  await prisma.cmsPackage.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteCmsPackage(id: string) {
  await checkAdmin();
  await prisma.cmsPackage.delete({ where: { id } });
  revalidatePath("/", "layout");
}

// -----------------------------------------------------------------------------
// FEATURES
// -----------------------------------------------------------------------------

export async function getCmsFeatures() {
  return await prisma.cmsFeature.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getCmsFeaturesByCategory(category: string) {
  return await prisma.cmsFeature.findMany({
    where: { category },
    orderBy: { order: "asc" },
  });
}

export async function createCmsFeature(data: { id: string; category: string; stepGroup: string; title: string; priceUsd: number; priceInr: number; isMultiplier: boolean; multiplier: number; order: number }) {
  await checkAdmin();
  await prisma.cmsFeature.create({ data });
  revalidatePath("/", "layout");
}

export async function updateCmsFeature(id: string, data: { category: string; stepGroup: string; title: string; priceUsd: number; priceInr: number; isMultiplier: boolean; multiplier: number; order: number }) {
  await checkAdmin();
  await prisma.cmsFeature.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteCmsFeature(id: string) {
  await checkAdmin();
  await prisma.cmsFeature.delete({ where: { id } });
  revalidatePath("/", "layout");
}

// -----------------------------------------------------------------------------
// COMPARISON MATRIX
// -----------------------------------------------------------------------------

export async function getCmsComparisonFeaturesByCategory(serviceId: string) {
  return await prisma.cmsComparisonFeature.findMany({
    where: { serviceId },
    orderBy: { order: "asc" },
  });
}

export async function createCmsComparisonFeature(data: { serviceId: string; name: string; starter: string; business: string; enterprise: string; order: number }) {
  await checkAdmin();
  await prisma.cmsComparisonFeature.create({ data });
  revalidatePath("/", "layout");
}

export async function updateCmsComparisonFeature(id: string, data: { name: string; starter: string; business: string; enterprise: string; order: number }) {
  await checkAdmin();
  await prisma.cmsComparisonFeature.update({ where: { id }, data });
  revalidatePath("/", "layout");
}

export async function deleteCmsComparisonFeature(id: string) {
  await checkAdmin();
  await prisma.cmsComparisonFeature.delete({ where: { id } });
  revalidatePath("/", "layout");
}

// -----------------------------------------------------------------------------
// GLOBAL SETTINGS
// -----------------------------------------------------------------------------

export async function getCmsGlobalSettings() {
  const settings = await prisma.cmsGlobalSetting.findUnique({
    where: { id: "global" }
  });
  
  if (!settings) {
    return await prisma.cmsGlobalSetting.create({
      data: { id: "global" }
    });
  }
  
  return settings;
}

export async function updateCmsGlobalSettings(data: { exchangeRate?: number; basePriceWeb?: number; basePriceAi?: number; basePriceGr?: number; }) {
  await checkAdmin();
  await prisma.cmsGlobalSetting.upsert({
    where: { id: "global" },
    update: data,
    create: { id: "global", ...data }
  });
  revalidatePath("/", "layout");
}
