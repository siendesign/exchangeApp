"use server";
import db from "./db";
import Currency from "@/models/currency";
import ConversionRates from "@/models/currencyConvertion";
import Users from "@/models/usersmodel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import Orders from "@/models/ordermodel";
import currency from "@/models/currency";

export const addCurrency = async (formData) => {
  const { currencyName, abbrev, symbol } = Object.fromEntries(formData);

  try {
    db.connect();

    const exists = await Currency.find({ currencyName: currencyName, abbrev: abbrev, symbol: symbol});

    if (exists.length > 0) {
      return false;
    };

    const newCurrency = new Currency({ currencyName, abbrev, symbol });
    await newCurrency.save();

    return true;
  } catch (error) {
    throw new Error("failed to add new currency " + error);
  }
};

export const addCurrencyConvertionRate = async (formData) => {
  const { from, to, rate } = Object.fromEntries(formData);

  // console.log(from, to, rate);
  try {
    db.connect();
    // console.log({ from, to, rate });

    const exist = await ConversionRates.find({ from: from, to: to });

    // console.log(exist);

    if (exist.length > 0) {
      return false;
    }
    const newCurrencyConvertionRate = new ConversionRates({ from, to, rate });
    await newCurrencyConvertionRate.save();
    
    return true;

  } catch (error) {
    throw new Error("failed to add new currency convertion rate " + error);
  }
};

export const addnewUser = async (formData) => {
  db.connect();
  const { email, password, role } = Object.fromEntries(formData);
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log({ hashedPassword, email, role });

  const newUser = new Users({
    email: email,
    password: hashedPassword,
    role: role,
  });

  await newUser.save();
  revalidatePath("/login");
  redirect("/login");
};

export const updateOrderStatus = async (id, status) => {
  console.log(id, status);
  const updateStatus = await Orders.findByIdAndUpdate(id, { status: status });
  return "orderStatus";
};
