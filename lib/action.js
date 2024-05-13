"use server";
import db from "./db";
import Currency from "@/models/currency";
import ConversionRates from "@/models/currencyConvertion";
import Users from "@/models/usersmodel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import Orders from "@/models/ordermodel";
import Chat from "@/models/chatmodel";
import currency from "@/models/currency";
import { readFile, unlink } from "fs/promises";

export const addCurrency = async (formData) => {
  const { currencyName, abbrev, symbol } = Object.fromEntries(formData);

  try {
    db.connect();

    const exists = await Currency.find({
      currencyName: currencyName,
      abbrev: abbrev,
      symbol: symbol,
    });

    if (exists.length > 0) {
      return false;
    }

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
  if (status == "Completed") {
    console.log("server storage optimization...");
    console.log("filtering chat images... ");
    const orderChats = await Chat.find(
      { orderId: id, type: "image" },
      { message: 1, _id: 0 }
    );
    console.log(orderChats);

    const orderDetails = await Orders.findById(id);

    console.log("Order validation image fetching...");
    console.log(orderDetails);

    if (orderChats.length > 0) {
      let fileCount = 1;
      let totalFileCount = orderChats.length;
      orderChats.forEach(async (element) => {
        const checkImage = await readFile(`./public${element.message}`, {
          encoding: "base64url",
        }).catch((error) => {
          console.log(error);
          console.log("image not found");
        });
        // console.log(checkImage);
        if (checkImage) {
          console.log("deleting image...");
          await unlink(`./public${element.message}`).then(async (res) => {
            const deleletImageFromChat = await Chat.deleteMany({
              message: element.message,
            });

            console.log(
              `${fileCount}/${totalFileCount} images Delete. Space optimized.`
            );
          });
        } else {
          console.log("image not found");
        }
        fileCount++;
      });
      //clear all chats
      const deleletImageFromChat = await Chat.deleteMany({
        orderId: id,
      });
    }
  }
  const updateStatus = await Orders.findByIdAndUpdate(id, { status: status });
  return "orderStatus";
};
