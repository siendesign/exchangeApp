import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import UserCount from "@/models/userCountModel";
import Orders from "@/models/ordermodel";
import Users from "@/models/usersmodel";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    db.connect();
    const usersPopulation = await UserCount.find();
    const users = Users.find({status: {$ne:"deleted"}})
    const activeOrdersPopulation = await Orders.find({status: {$ne:"Completed"}});
    const ordersPopulation = await Orders.find();
    
    const data = {
        userNumber: usersPopulation[usersPopulation.length-1].total,
        userNumberPercentage: usersPopulation[usersPopulation.length-1].percentage,
        totalOrders:ordersPopulation.length,
        activeOrders:activeOrdersPopulation.length,
    }


    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed: " + error, { status: 500 });
  }
}