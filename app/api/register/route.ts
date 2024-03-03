import db from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    db.connect();
    const {email, password} = await req.json();

    console.log({email, password});
    
}
