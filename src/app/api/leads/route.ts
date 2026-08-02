import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      serviceInquiries: true,
      costEstimators: true,
      leadNotes: { orderBy: { createdAt: "desc" } },
    },
  });

  return NextResponse.json(leads);
}
