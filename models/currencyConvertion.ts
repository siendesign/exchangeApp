import mongoose from "mongoose";

const ConvertionRateSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose?.models?.ConversionRates ||
  mongoose.model("ConversionRates", ConvertionRateSchema);
