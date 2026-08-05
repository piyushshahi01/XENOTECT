import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sseClients } from "@/lib/sse-broadcaster";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const adminEmails = process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL.split(',').map(e => e.trim()) : [];
  const userEmail = (session?.user as any)?.email;

  if (!session || !userEmail || !adminEmails.includes(userEmail)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send an initial heartbeat so the browser knows the connection is open
      controller.enqueue(encoder.encode(": connected\n\n"));

      // Register this client
      sseClients.add(controller);

      // Keep-alive ping every 25 seconds (prevents proxy timeouts)
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {
          clearInterval(keepAlive);
          sseClients.delete(controller);
        }
      }, 25_000);

      // Clean up when the client disconnects
      req.signal.addEventListener("abort", () => {
        clearInterval(keepAlive);
        sseClients.delete(controller);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // Disable Nginx buffering for Vercel
    },
  });
}
