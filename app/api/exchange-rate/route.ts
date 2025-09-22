import db from "@/lib/db";
import ConversionRates from "@/models/currencyConvertion";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
    const { searchParams } = new URL(request.url);
  //mongodb connection
  db.connect();

  //query to mongodb
  const currencyPair = await ConversionRates.find({ from: searchParams.get('from'), to: searchParams.get('to') });

  return NextResponse.json(currencyPair, { status: 200 });
}
