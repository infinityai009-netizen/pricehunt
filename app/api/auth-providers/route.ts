import { NextResponse } from 'next/server';
import { availableProviders } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(availableProviders());
}
