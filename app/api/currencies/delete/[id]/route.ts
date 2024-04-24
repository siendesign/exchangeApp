export const dynamic = "force-dynamic";
import db from "@/lib/db";
import Currency from "@/models/currency";
import ConversionRates from "@/models/currencyConvertion";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: any } }
) {
  const { id } = params;
  try {
    db.connect();
    const currency = await Currency.findById(id);
    console.log(currency.abbrev);

    const fromRates = await ConversionRates.find({ from: currency.abbrev });
    const toRates = await ConversionRates.find({ to: currency.abbrev });

    console.log(fromRates, toRates);

    if (fromRates.length > 0)
      await ConversionRates.deleteMany({ from: currency.abbrev });

    if (toRates.length > 0)
      await ConversionRates.deleteMany({ to: currency.abbrev });

    await Currency.findByIdAndDelete(id);
    
    console.log(id, "_deleted");
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed: " + error, { status: 500 });
  }
}
