import db from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import Orders from "@/models/ordermodel";

export async function POST(req: NextRequest) {
  const {
    userEmail,
    destinationAccountNumber,
    destinationAccountName,
    walletAddress,
    destinationCountry,
    destinationBankName,
    from,
    to,
    rate,
    fromAmount,
    toAmount,
    toSymbol,
    fromSymbol,
  } = await req.json();

  const newOrder = new Orders({
    userEmail: userEmail,
    status: "waiting...",
    destinationAccountNumber: destinationAccountNumber,
    destinationAccountName: destinationAccountName,
    destinationAccountCountry: destinationCountry,
    destinationBankName: destinationBankName,
    paymentWalletAddress: walletAddress,
    fromCurrency: from,
    toCurrency: to,
    fromAmount: +fromAmount,
    toAmount: +toAmount,
    rate: rate,
    toSymbol: toSymbol,
    fromSymbol: fromSymbol,
  });

  console.log(newOrder);

  await newOrder.save();

  return NextResponse.json(
    { message: "hello world", data: +toAmount },
    { status: 200 }
  );
}

export async function GET(req: NextRequest) {}
