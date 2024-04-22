'use server';
import db from './db';
import Currency from '@/models/currency';
import ConversionRates from '@/models/currencyConvertion'
import Users from "@/models/usersmodel";

interface CurrencyType {
    currencyName: string;
    abbrev: string;
    symbol: string;
}

export const getAllcurrencies = async () =>{
   
    db.connect();
    const currencies = await Currency.find({});
    return JSON.parse(JSON.stringify(currencies));
}

export const getCurrencyPair = async (fromCurrency:string) => {
    try {
        db.connect();
        const currencyPair = await ConversionRates.find({from: fromCurrency});
        // console.log(currencyPair);
        return currencyPair;
    } catch (error) {
        throw new Error("couldn't fetch currency pair " + error);
    }
}

export const fetchAllCurrencyPairs = async () =>{
    try {
        db.connect();
        const currencyPair = await ConversionRates.find({});
        // console.log(currencyPair);
        return currencyPair;
    } catch (error) {
        throw new Error("couldn't fetch currency pair " + error);
    }
}

