import db from "@/lib/db";
import Users from "@/models/usersmodel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  db.connect();
  const { email, password } = await req.json();

  const user = await Users.find({ email: email });

  console.log(user);

  if (user.length > 0) {
    const validPassword = bcrypt.compareSync(password, user[0].password);

    if (validPassword) return NextResponse.json(user[0], { status: 200 });
  }

  return NextResponse.json(
    { error: "Invalid username or password" },
    { status: 401 }
  );
}
