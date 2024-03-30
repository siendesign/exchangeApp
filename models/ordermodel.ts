import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userEmail:{type: String},
    status: {type: String},
    destinationAccountNumber:{type: String},
    destinationAccountName:{type: String},
    paymentWalletAddress:{type: String},
    fromCurrency:{type: String},
    toCurrency:{type: String},
    rate: {type: String},
});

export default mongoose?.models?.Orders || mongoose.model("Orders", OrderSchema); 