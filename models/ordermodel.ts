import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId:{type: String, required: true},
    status: {type: String, required: true},
    destinationAccountNumber:{type: String, required: true},
    destinationAccountName:{type: String, required: true}
    
});

export default mongoose?.models?.Orders || mongoose.model("Orders", OrderSchema);