import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/usersmodel";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    db.connect();
    const users = await Users.find();
    console.log(users.length);

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed: " + error, { status: 500 });
  }
}
