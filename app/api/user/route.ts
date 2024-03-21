import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/usersmodel";

export async function GET(req: NextRequest) {
  try {
    db.connect();

    const users = await Users.find()
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json("error: " + error, { status: 500 });
  }
}
