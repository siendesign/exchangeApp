import db from "@/lib/db";
import Users from "@/models/usersmodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = params.email;
  console.log(email);
  
  try {
    db.connect();

    const user = await Users.findOne({email});
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json("error: " + error, { status: 500 });
  }
}
