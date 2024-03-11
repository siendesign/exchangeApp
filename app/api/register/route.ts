import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/usersmodel";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  db.connect();

  const { email, password } = await req.json();
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const hashedPassword = bcrypt.hashSync(password, salt);

  const exists = await Users.find({ email: email });

  console.log(exists.length);

  if (exists.length > 0) {
    return NextResponse.json(
      {
        error: "User already exists. Try another email",
        email: email,
      },
      { status: 200 }
    );
  }

  console.log({ email, password, hashedPassword });
  return NextResponse.json({email}, { status: 200 });
}
