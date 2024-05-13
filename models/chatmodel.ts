import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    message: { type: String },
    from: {type: String},
    to: {type: String},
    type: {type: String},
  },
  { timestamps: true }
);

export default mongoose?.models?.Chat || mongoose.model("Chat", ChatSchema);
