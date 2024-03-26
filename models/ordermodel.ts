import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userEmail:{type: String},
    status: {type: String},
    destinationAccountNumber:{type: String},
    destinationAccountName:{type: String},
    paymentWalletAddress:{type: String}
});

export default mongoose?.models?.Orders || mongoose.model("Orders", OrderSchema);