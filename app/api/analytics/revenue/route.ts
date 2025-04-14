import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/usersmodel";
import Orders from "@/models/ordermodel";

export async function GET(req: NextRequest) {
  try {
    await db.connect();
    const orders = await Orders.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );

    return NextResponse.json({ totalRevenue }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
