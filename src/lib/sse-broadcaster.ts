/**
 * SSE Broadcaster — Singleton for real-time admin push notifications.
 * Holds a Set of ReadableStreamDefaultController instances (one per connected admin).
 * Call `broadcast(event)` from any server action to push an event to all admin tabs.
 */

// Use a global to survive Next.js hot-reloads in development
const g = globalThis as typeof globalThis & {
  _sseClients?: Set<ReadableStreamDefaultController>;
};

if (!g._sseClients) {
  g._sseClients = new Set();
}

export const sseClients = g._sseClients;

export type SSEEvent = {
  type: "new_lead" | "lead_updated";
  payload: Record<string, unknown>;
};

export function broadcast(event: SSEEvent): void {
  const data = `data: ${JSON.stringify(event)}\n\n`;
  const encoder = new TextEncoder();
  const chunk = encoder.encode(data);

  for (const controller of sseClients) {
    try {
      controller.enqueue(chunk);
    } catch {
      // Client disconnected — remove it
      sseClients.delete(controller);
    }
  }
}
