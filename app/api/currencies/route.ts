import db from "@/lib/db";
import Currency from "@/models/currency";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //mongodb connection
  try {
    
    db.connect();
  
    //query to mongodb
    const currencies = await Currency.find({});
  
    return NextResponse.json(currencies, { status: 200 });
  } catch (error) {
    return NextResponse.json("error: " + error, { status: 200 });
  }
}
