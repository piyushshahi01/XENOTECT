import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for rate limiting (Note: in Vercel Edge, this map may reset across different isolates, 
// but it is highly effective at stopping single-source rapid flooding without external DB dependencies like Redis).
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Rate limit configuration
const RATE_LIMIT_MAX = 30; // Max requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 60 seconds

export function middleware(request: NextRequest) {
  // Only apply rate limiting to /api/ routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Get client IP address (handles Vercel and standard proxy headers)
    const ip = 
               request.headers.get('x-real-ip') || 
               request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               'unknown_ip';

    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    // Get current rate limit info for this IP
    const rateLimitInfo = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    // Reset window if it has passed
    if (rateLimitInfo.lastReset < windowStart) {
      rateLimitInfo.count = 0;
      rateLimitInfo.lastReset = now;
    }

    // Increment request count
    rateLimitInfo.count += 1;
    rateLimitMap.set(ip, rateLimitInfo);

    // Check if limit exceeded
    if (rateLimitInfo.count > RATE_LIMIT_MAX) {
      return new NextResponse(
        JSON.stringify({ error: 'Too Many Requests', message: 'Rate limit exceeded. Please try again later.' }),
        { 
          status: 429, 
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': Math.ceil((rateLimitInfo.lastReset + RATE_LIMIT_WINDOW - now) / 1000).toString(),
          }
        }
      );
    }

    // Pass the remaining limit in headers
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX.toString());
    response.headers.set('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX - rateLimitInfo.count).toString());
    
    return response;
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
