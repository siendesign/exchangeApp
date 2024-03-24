import db from "@/lib/db";
import Currency from "@/models/currency";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { currency: string } }
) {
    const currency = params.currency;
    console.log(currency);
    try {
        db.connect();
    
        const data = await Currency.findOne({abbrev: currency});
        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        return NextResponse.json("error: " + error, { status: 500 });
      }
}
