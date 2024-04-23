export const dynamic = "force-dynamic";
import db from "@/lib/db";
import ConversionRates from "@/models/currencyConvertion";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: any } }
) {
  const { id } = params;
  const { rate } = await request.json();

  try {
    db.connect();
    console.log(id, "_updated rate to:", rate);
    await ConversionRates.findByIdAndUpdate(id, {rate: rate});
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed: " + error, { status: 500 });
  }
}
