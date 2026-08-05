import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { broadcast } from "@/lib/sse-broadcaster";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  const adminEmails = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.split(',').map(e => e.trim()) : [];
  const userEmail = (session?.user as any)?.email;

  if (!session || !userEmail || !adminEmails.includes(userEmail)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { status, priority, note } = body;

  // Build update payload (only include provided fields)
  const updateData: Record<string, unknown> = {};
  if (status) updateData.status = status;
  if (priority) updateData.priority = priority;

  const lead = await prisma.lead.update({
    where: { id },
    data: updateData,
    include: { serviceInquiries: true },
  });

  // Optionally add a note
  if (note && typeof note === "string" && note.trim()) {
    await prisma.leadNote.create({
      data: {
        leadId: id,
        note: note.trim(),
        createdBy: session.user?.email || "admin",
      },
    });
  }

  // Broadcast status update to all connected admin tabs
  broadcast({
    type: "lead_updated",
    payload: { id: lead.id, status: lead.status, priority: lead.priority },
  });

  return NextResponse.json(lead);
}
