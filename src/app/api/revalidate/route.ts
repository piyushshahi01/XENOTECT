import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  // @ts-expect-error - Next.js 15 beta typings missing optional modifier
  revalidateTag('cms-packages');
  // @ts-expect-error - Next.js 15 beta typings missing optional modifier
  revalidateTag('cms-services');
  // @ts-expect-error - Next.js 15 beta typings missing optional modifier
  revalidateTag('cms-features');
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
