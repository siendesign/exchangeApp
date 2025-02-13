import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  { 
    month: { type: String, required: true },
    year: { type: String, required: true },
    total: { type: String, required: true },
    percentage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose?.models?.UserCount || mongoose.model("UserCount", UsersSchema);