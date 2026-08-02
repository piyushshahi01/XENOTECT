"use server";

import prisma from "@/lib/prisma";
import { randomBytes } from "crypto";
import { broadcast } from "@/lib/sse-broadcaster";

export async function submitProjectWizard(data: any) {
  try {
    // Generate a unique inquiry ID like XENO-2026-0042
    const randomHex = randomBytes(2).toString("hex").toUpperCase();
    const year = new Date().getFullYear();
    const inquiryId = `XENO-${year}-${randomHex}`;

    // Create the Lead and associated records in a transaction
    const lead = await prisma.lead.create({
      data: {
        inquiryId,
        fullName: data.contact.fullName,
        email: data.contact.email,
        phone: data.contact.phone || null,
        company: data.contact.company || null,
        source: "Client Project Wizard",
        // Associate the Service Inquiry
        serviceInquiries: {
          create: {
            service: data.service,
            package: data.package,
            estimatedPrice: data.estimatedPrice,
            timeline: data.estimatedTimeline,
            requirements: data.contact.requirements || null,
          }
        },
        // Associate the Cost Estimator (Feature selection)
        costEstimators: {
          create: {
            features: data.features || {},
            estimatedPrice: data.estimatedPrice,
            estimatedTimeline: data.estimatedTimeline,
          }
        }
      },
    });

    // 🔔 Broadcast real-time notification to all connected admin tabs
    broadcast({
      type: "new_lead",
      payload: {
        id: lead.id,
        inquiryId: lead.inquiryId,
        fullName: lead.fullName,
        email: lead.email,
        company: lead.company,
        service: data.service,
        estimatedPrice: data.estimatedPrice,
        createdAt: lead.createdAt.toISOString(),
      },
    });

    return { success: true, inquiryId: lead.inquiryId };
  } catch (error: any) {
    console.error("Wizard submission error:", error);
    return { success: false, error: error.message || "Failed to submit request" };
  }
}
