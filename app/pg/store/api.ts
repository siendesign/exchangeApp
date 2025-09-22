// File: store/api.ts
// Types based on your actual API structure
interface Currency {
  _id: string;
  currencyName: string;
  abbrev: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CurrencyPair {
  _id: string;
  from: string;
  to: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Fetch available currencies from api/currencies
export const fetchCurrencies = async (): Promise<Currency[]> => {
  try {
    const response = await fetch(`api/currencies`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error("Failed to fetch currencies");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching currencies:", error);
    throw new Error("Failed to fetch currencies. Please try again.");
  }
};

// Fetch currency pairs from api/currency-pairs/[abbrev]
export const fetchCurrencyPairs = async (
  fromCurrencyAbbrev: string
): Promise<CurrencyPair[]> => {
  try {
    const response = await fetch(`api/currency-pairs/${fromCurrencyAbbrev}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data)) {
      throw new Error("Failed to fetch currency pairs");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching currency pairs:", error);
    throw new Error("Failed to fetch currency pairs. Please try again.");
  }
};

export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
) => {
  try {
    const response = await fetch(`api/exchange-rate?from=${fromCurrency}&to=${toCurrency}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data)) {
      throw new Error("Failed to fetch exchange rate");
    }

    return data[0]?.rate || 0;
  } catch (error: any) {
    console.log(error);
  }
};

// Export types
export type { Currency, CurrencyPair };
