import mongoose from "mongoose";

const CryptoWalletSchema = new mongoose.Schema({
    cryptoCurrencyName:{ type: String, required: true },
    cryptoCurrencySymbol:{ type: String, required: true },
    cryptoCurrencyAddress:{ type: String, required: true },
    tranferNetwork:{ type: String, required: true },
})

export default mongoose?.models?.Wallets || mongoose.model("Wallets", CryptoWalletSchema);