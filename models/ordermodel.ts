import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: { type: String },
    status: { type: String },
    destinationAccountNumber: { type: String },
    destinationAccountName: { type: String },
    destinationAccountCountry: { type: String },
    destinationBankName: { type: String },
    paymentWalletAddress: { type: String },
    fromCurrency: { type: String },
    toCurrency: { type: String },
    fromAmount: { type: Number },
    toAmount: { type: Number },
    rate: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.Orders ||
  mongoose.model("Orders", OrderSchema);
