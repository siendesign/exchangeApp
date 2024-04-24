export const dynamic = "force-dynamic";
import db from "@/lib/db";
import Currency from "@/models/currency";
import ConversionRates from "@/models/currencyConvertion";
import { NextRequest, NextResponse } from "next/server";

type Valuable<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

function filterValues<T extends {}, V = Valuable<T>>(obj: T): V {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        !(
          (typeof v === "string" && !v.length) ||
          v === null ||
          typeof v === "undefined"
        )
    )
  ) as V;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: any } }
) {
  const { id } = params;
  const { currencyName, abbrev, symbol } = await request.json();

  try {
    db.connect();
    console.log(id, "_updated rate to:", currencyName);
    const updateFields = { currencyName, abbrev, symbol };

    const filteredFields = filterValues(updateFields);

    if (abbrev !== undefined) {
      const currency = await Currency.findById(id);
      const fromRates = await ConversionRates.find({ from: currency.abbrev });
      const toRates = await ConversionRates.find({ to: currency.abbrev });
      console.log(fromRates, toRates);

      if (fromRates.length > 0) {
        fromRates.forEach(async (element) => {
          console.log(element);
          await ConversionRates.findByIdAndUpdate(element._id, {
            from: abbrev,
          });
        });
      }
      if (toRates.length > 0) {
        toRates.forEach(async (element) => {
          console.log(element);
          await ConversionRates.findByIdAndUpdate(element._id, { to: abbrev });
        });
      }
    }

    console.log(filteredFields);

    await Currency.findByIdAndUpdate(id, updateFields);

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed: " + error, { status: 500 });
  }
}
