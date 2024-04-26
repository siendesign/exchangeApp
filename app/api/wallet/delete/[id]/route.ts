import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Wallets from "@/models/walletsmodel";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: any } }
) {
    const { id } = params;
    try {
      db.connect();
      await Wallets.findByIdAndDelete(id);
      console.log(id, "_deleted");
      return NextResponse.json("success", { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json("failed: " + error, { status: 500 });
    }
  
}