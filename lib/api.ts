import axios from "axios";

interface CurrencyPairType {
  _id: string;
  from: string;
  to: string;
  rate: string;
}

export interface CurrencyType {
  currencyName: string;
  abbrev: string;
  symbol: string;
  _id: string;
}

export const getAllCurrencies = async () => {
  return await axios
    .get<CurrencyType[]>("/api/currencies")
    .then((res) => res.data);
};

export const getCurrencyPairs = async (from: string) => {
  return await axios
    .get<CurrencyPairType[]>(`/api/currency-pairs/${from}`)
    .then((res) => res.data);
};

export const fetctAllCurrencyPairs = async () => {
  return await axios
   .get<CurrencyPairType[]>("/api/currency-pairs")
   .then((res) => res.data);
};
