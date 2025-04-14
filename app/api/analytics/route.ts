import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import UserCount from "@/models/userCountModel";
import Orders from "@/models/ordermodel";
import Users from "@/models/usersmodel";

export async function GET(req: NextRequest) {
  try {
    await db.connect();
    const usersPopulation = await UserCount.find();
    const users = await Users.find({ status: { $ne: "deleted" } });
    const activeOrdersPopulation = await Orders.find({
      status: { $ne: "Completed" },
    });
    const ordersPopulation = await Orders.find();

    const lastUserCount = usersPopulation[usersPopulation.length - 1];

    const data = {
      userNumber: lastUserCount?.total || 0,
      userNumberPercentage: lastUserCount?.percentage || 0,
      totalOrders: ordersPopulation.length,
      activeOrders: activeOrdersPopulation.length,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
