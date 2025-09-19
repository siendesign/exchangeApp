import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Wallets from "@/models/walletsmodel";

export async function POST(req: NextRequest) {
  try {
    await db.connect();
    const {
      cryptoCurrencyName,
      cryptoCurrencySymbol,
      cryptoCurrencyAddress,
      tranferNetwork,
    } = await req.json();

    // Validate required fields
    if (!cryptoCurrencyName || !cryptoCurrencySymbol || !cryptoCurrencyAddress || !tranferNetwork) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newWallet = new Wallets({
      cryptoCurrencyName: cryptoCurrencyName,
      cryptoCurrencySymbol: cryptoCurrencySymbol,
      cryptoCurrencyAddress: cryptoCurrencyAddress,
      tranferNetwork: tranferNetwork,
    });

    await newWallet.save();
    
    return NextResponse.json(
      {
        message: "Wallet created successfully",
        wallet: {
          cryptoCurrencyName,
          cryptoCurrencySymbol,
          cryptoCurrencyAddress,
          tranferNetwork,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/wallet error:", error);
    return NextResponse.json(
      { error: "Failed to create wallet" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await db.connect();
    const wallets = await Wallets.find({});
    
    return NextResponse.json(wallets, { status: 200 });
  } catch (error) {
    console.error("GET /api/wallet error:", error);
    return NextResponse.json(
      { error: "Failed to fetch wallets" },
      { status: 500 }
    );
  }
}