"use client";
import { Button } from "@/components/ui/button";
import { sendMailTestAction } from "@/lib/action";
import { createClient } from "@/lib/supabase/client";
import { useGetAuthUserQuery } from "@/state/api";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  fetchCurrenciesAsync,
  fetchExchangeRateAsync,
  setFromCurrency,
  setToCurrency,
  setAmount,
  clearError,
} from "./store/redux";
import { Provider } from "react-redux";
import store from "./store";

const page = () => {
  return (
    <Provider store={store}>
      <div className="w-full h-screen">
        <div className="max-w-lg mx-auto p-5 space-y-3">
          <h1 className="text-xl text-gray-600">Playground</h1>
          <hr />
          <TestMailSender></TestMailSender>
          {/* <hr /> */}
          {/* <SupabaseComponent/> */}
          <hr />
          {/* <ReduxComponent /> */}

          <hr />
          <CurrencyConverter />
        </div>
      </div>
    </Provider>
  );
};

const CurrencyConverter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    currencies,
    fromCurrency,
    toCurrency,
    exchangeRate,
    amount,
    convertedAmount,
    loading,
    error
  } = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrenciesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      dispatch(fetchExchangeRateAsync({ fromCurrency, toCurrency }));
    }
  }, [dispatch, fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFromCurrency(e.target.value));
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setToCurrency(e.target.value));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch(setAmount(value));
  };

  const swapCurrencies = () => {
    dispatch(setFromCurrency(toCurrency));
    dispatch(setToCurrency(fromCurrency));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <div className="flex justify-between items-center">
            <span>Error: {error}</span>
            <button 
              onClick={handleClearError}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Currency Converter
        </h1>

        <div className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          {/* From Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Currency
            </label>
            <select
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              {currencies.map((currency) => (
                <option key={currency._id} value={currency.abbrev}>
                  {currency.abbrev}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200 disabled:opacity-50"
              disabled={loading}
              title="Swap currencies"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Currency
            </label>
            <select
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              {currencies.map((currency) => (
                <option key={currency._id} value={currency.abbrev}>
                  {currency.abbrev}
                </option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                {amount} {fromCurrency} equals
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {loading ? (
                  <div className="animate-pulse">Loading...</div>
                ) : (
                  `${convertedAmount} ${toCurrency}`
                )}
              </div>
              {!loading && (
                <div className="text-sm text-gray-500 mt-2">
                  Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ReduxComponent = () => {
  const { data, isLoading } = useGetAuthUserQuery();

  if (isLoading) return <div className="">loading...</div>;

  console.log(data);
  return (
    <div className="">
      <h2 className="">Redux Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const SupabaseComponent = () => {
  const supabase = createClient();
  const [data, setData] = useState<any>(null);
  const getsessesion = async () => {
    const { data: userSession, error } = await supabase.auth.getSession();
    console.log(userSession);
    setData(userSession);
  };

  useEffect(() => {
    getsessesion();
  }, []);

  if (!data) return <div className="">No Session</div>;

  return (
    <div className="w-full">
      <pre className="w-full">{JSON.stringify(data, null, 1)}</pre>
    </div>
  );
};

const TestMailSender = () => {
  const [isloading, setIsloading] = useState(false);

  const sendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const send = await sendMailTestAction();
      console.log(send);

      if (send) {
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Test send mail</h3>
      <p className="text-sm text-gray-500">Click to send test mail</p>
      <form className="" onSubmit={(e) => sendMail(e)}>
        <Button type="submit" disabled={isloading}>
          {isloading ? "Sending mail..." : "Test mail"}
        </Button>
      </form>
    </div>
  );
};

export default page;
