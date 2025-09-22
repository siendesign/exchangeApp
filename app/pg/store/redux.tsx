// File: store/redux.tsx
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Currency, fetchCurrencies, fetchExchangeRate } from './api';

// Types
interface CurrencyState {
  currencies: Currency[];
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  amount: number;
  convertedAmount: number;
  loading: boolean;
  error: string | null;
}

interface ExchangeRatePayload {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

interface FetchExchangeRateParams {
  fromCurrency: string;
  toCurrency: string;
}

// Initial state
const initialState: CurrencyState = {
  currencies: [],
  fromCurrency: '🇳🇬 NGN',
  toCurrency: '🇺🇸 USD',
  exchangeRate: 1,
  amount: 1,
  convertedAmount: 1,
  loading: false,
  error: null
};

// Async thunks
export const fetchCurrenciesAsync = createAsyncThunk(
  'currency/fetchCurrencies',
  async (): Promise<Currency[]> => {
    const currencies = await fetchCurrencies();
    return currencies;
  }
);

export const fetchExchangeRateAsync = createAsyncThunk(
  'currency/fetchExchangeRate',
  async ({ fromCurrency, toCurrency }: FetchExchangeRateParams): Promise<ExchangeRatePayload> => {
    const rate = await fetchExchangeRate(fromCurrency, toCurrency);
    return { fromCurrency, toCurrency, rate };
  }
);

// Currency slice
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
      state.convertedAmount = parseFloat((action.payload * state.exchangeRate).toFixed(2));
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch currencies
      .addCase(fetchCurrenciesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrenciesAsync.fulfilled, (state, action: PayloadAction<Currency[]>) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCurrenciesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch currencies';
      })
      // Fetch exchange rate
      .addCase(fetchExchangeRateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRateAsync.fulfilled, (state, action: PayloadAction<ExchangeRatePayload>) => {
        state.loading = false;
        state.exchangeRate = action.payload.rate;
        state.convertedAmount = parseFloat((state.amount * action.payload.rate).toFixed(2));
      })
      .addCase(fetchExchangeRateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch exchange rate';
      });
  }
});

// Export actions
export const { 
  setFromCurrency, 
  setToCurrency, 
  setAmount, 
  clearError 
} = currencySlice.actions;

// Export reducer
export default currencySlice.reducer;

// Export types for use in components
export type { CurrencyState, FetchExchangeRateParams };
