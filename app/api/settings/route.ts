export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Settings from "@/models/adminSettingsModel";
import { sendMail } from "@/lib/mail";

interface SettingsType {
  settingName: string;
  value: string;
}
export async function POST(request: NextRequest) {
  const { settingName, value }: SettingsType = await request.json();

  try {
    db.connect();
    //if table is empty check and create the field else update existing field with value
    const exist = await Settings.find({ settingName: settingName });
    if (exist.length > 0) {
      console.log("edit");
      const updateSettings = await Settings.findOneAndUpdate(
        { settingName: settingName },
        { value: value }
      );

      const email = await Settings.findOne({
        settingName: "notificationEmail",
      });
      console.log(JSON.parse(JSON.stringify(email)));
      console.log(email.value);

      
    } else {
      console.log("create");
      const newSetting = new Settings({ settingName, value });
      await newSetting.save();
    }

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed: " + error, { status: 500 });
  }
}
