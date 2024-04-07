import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import Orders from "@/models/ordermodel";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = params.email;

  try {
    db.connect();

    const userOrders = await Orders.find({ userEmail: email });
    return NextResponse.json(userOrders, { status: 200 });
  } catch (error) {
    return NextResponse.json("error: " + error, { status: 500 });
  }
}

