import { NextResponse } from 'next/server';
import { ThresholdDiscount } from '@/types/thresholdDiscount';

export function GET() {
  try {
    const thresholdDiscount: ThresholdDiscount = {
      threshold: 10,
      discountRate: 0.2 
    }

    return NextResponse.json(thresholdDiscount);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch thresholdDiscount' }, { status: 500 });
  }
}
