import mongoose from "mongoose";

const CurrencySchema = new mongoose.Schema({
    currencyName: {
        type: String,
        required: true
    },
    abbrev:{
        type: String
    },
    symbol:{
        type: String
    }
},{timestamps:true})

export default mongoose?.models?.Currency || mongoose.model('Currency', CurrencySchema);