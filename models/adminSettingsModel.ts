import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    settingName: { type: String },
    value: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.Settings ||
  mongoose.model("Settings", settingsSchema);
