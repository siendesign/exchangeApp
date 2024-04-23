export const dynamic = "force-dynamic";
import db from "@/lib/db";
import ConversionRates from "@/models/currencyConvertion";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: any } }
) {
  const { id } = params;
  try {
    db.connect();
    await ConversionRates.findByIdAndDelete(id);
    console.log(id, "_deleted");
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed: " + error, { status: 500 });
  }
}
