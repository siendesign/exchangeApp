import db from "@/lib/db";
import ConversionRates from "@/models/currencyConvertion";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { from: string } }
) {
  const { from } = params;
  //mongodb connection
  db.connect();

  //query to mongodb
  const currencyPair = await ConversionRates.find({ from });

  return NextResponse.json(currencyPair, { status: 200 });
}
