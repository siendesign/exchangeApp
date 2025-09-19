import db from "@/lib/db";
import Currency from "@/models/currency";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //mongodb connection
  try {
    
    db.connect();

     // Add connection state check
     if (!db.isConnected()) {
      throw new Error('Database connection failed');
    }
  
    //query to mongodb
    const currencies = await Currency.find({})
      .maxTimeMS(8000) // 8 second timeout (less than Railway's 10s)
      .lean() // Returns plain objects for better performance
      .exec();
  
    return NextResponse.json(currencies, { status: 200 });
  } catch (error) {
    console.error('Currency fetch error:', error);
    return NextResponse.json("error: " + error, { status: 200 });
  }
}
