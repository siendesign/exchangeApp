export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/usersmodel";
import bcrypt from "bcrypt";

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: any } }
) {
    const { email  } = params;
    const { oldPassword, newPassword } = await request.json();
    console.log(email);

    try {
        db.connect();
        const user = await Users.findOne({email});
        const validPassword = bcrypt.compareSync(oldPassword, user.password);
        console.log(user, validPassword);

        if (validPassword) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            await Users.findByIdAndUpdate(user._id, { password: hash });
            return NextResponse.json("success", { status: 200 });
        }
        
        return NextResponse.json("wrong old password", { status: 200 });
    } catch (error) {
        
    }

    
}
