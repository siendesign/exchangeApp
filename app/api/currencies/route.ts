import db from "@/lib/db";
import Currency from "@/models/currency";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Ensure MongoDB connection
    await db.connect();
    
    // Query to MongoDB
    const currencies = await Currency.find({});
    
    return NextResponse.json(currencies, { status: 200 });
  } catch (error) {
    console.error("Error fetching currencies:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch currencies" },
      { status: 500 }
    );
  }
}
