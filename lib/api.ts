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

// export const getAllCurrencies = async () => {
//   try {
//     const response = await fetch('/api/currency', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Add timeout for client-side requests
//       signal: AbortSignal.timeout(10000), // 10 second timeout
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
    
//     // Validate response structure
//     if (!Array.isArray(data)) {
//       console.error('Invalid response format:', data);
//       throw new Error('Invalid response format from server');
//     }

//     return data;
    
//   } catch (error) {
//     console.error('Failed to fetch currencies:', error);
    
//     // Return empty array as fallback instead of throwing
//     // This prevents the entire UI from breaking
//     return [];
//   }
// };

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
