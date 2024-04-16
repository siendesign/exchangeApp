import db from "@/lib/db";
import ConversionRates from "@/models/currencyConvertion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    db.connect();
    const currencyPairs = await ConversionRates.find();
    return NextResponse.json(currencyPairs, { status: 200 });
}