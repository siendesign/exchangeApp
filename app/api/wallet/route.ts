import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Wallets from "@/models/walletsmodel";

export async function POST(req: NextRequest) {
  try {
    db.connect();
    const {
      cryptoCurrencyName,
      cryptoCurrencySymbol,
      cryptoCurrencyAddress,
      tranferNetwork,
    } = await req.json();
    const newWallet = new Wallets({
      cryptoCurrencyName: cryptoCurrencyName,
      cryptoCurrencySymbol: cryptoCurrencySymbol,
      cryptoCurrencyAddress: cryptoCurrencyAddress,
      tranferNetwork: tranferNetwork,
    });
    await newWallet.save();
    return NextResponse.json(
      {
        cryptoCurrencyName,
        cryptoCurrencySymbol,
        cryptoCurrencyAddress,
        tranferNetwork,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: Request, res: NextResponse) {
  try {
    db.connect();
    const wallets = await Wallets.find({});
    return NextResponse.json(wallets, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
