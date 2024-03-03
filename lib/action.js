"use server";
import db from "./db";
import Currency from "@/models/Currency";
import ConversionRates from "@/models/currencyConvertion";
import Users from "@/models/usersmodel";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export const addCurrency = async (formData) => {
  const { currencyName, abbrev, symbol } = Object.fromEntries(formData);

  try {
    db.connect();
    const newCurrency = new Currency({ currencyName, abbrev, symbol });
    await newCurrency.save();
  } catch (error) {
    throw new Error("failed to add new currency " + error);
  }
  revalidatePath("/dashboard");
};

export const addCurrencyConvertionRate = async (formData) => {
  const { from, to, rate } = Object.fromEntries(formData);

  try {
    db.connect();
    console.log({ from, to, rate });
    const newCurrencyConvertionRate = new ConversionRates({ from, to, rate });
    await newCurrencyConvertionRate.save();
  } catch (error) {
    throw new Error("failed to add new currency convertion rate " + error);
  }

  revalidatePath("/dashboard");
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
};

