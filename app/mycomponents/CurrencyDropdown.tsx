"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCurrencies } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  setFrom: React.Dispatch<React.SetStateAction<string | undefined>>;
  setToAmount: React.Dispatch<React.SetStateAction<any>>;
  setFromAmount: React.Dispatch<React.SetStateAction<any>>;
  setFromSymbol: React.Dispatch<React.SetStateAction<string>>;
  setToSymbol: React.Dispatch<React.SetStateAction<string>>;
  setRate: React.Dispatch<React.SetStateAction<number>>;
}

interface Currency {
  _id: string;
  abbrev: string;
  symbol: string;
  name?: string;
  flag?: string;
  country?: string;
}

const CurrencyDropdown = ({
  setFrom,
  setRate,
  setFromSymbol,
  setToSymbol,
  setToAmount,
  setFromAmount,
}: Props) => {
  const [cdata, setCdata] = useState<Currency[] | undefined>();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["from-currency"],
    queryFn: getAllCurrencies,
  });

  // Filter currencies based on search term
  const filteredCurrencies = (cdata || []).filter((currency) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      currency.abbrev.toLowerCase().includes(searchLower) ||
      currency.name?.toLowerCase().includes(searchLower) ||
      currency.country?.toLowerCase().includes(searchLower)
    );
  });

  const handleValue = (value: string) => {
    setFrom(value);
    queryClient.removeQueries({ queryKey: ["to-currency"], exact: true });
    setRate(0.0);
    setToSymbol("#");
    setToAmount(undefined);
    setFromAmount(undefined);

    // Find and set the selected currency
    let obj = data?.find((o) => o.abbrev === value);
    if (obj) {
      setSelectedCurrency(obj);
      setFromSymbol(obj.symbol);
    }
  };

  const resetSelection = () => {
    setFrom(undefined);
    setSelectedCurrency(undefined);
    setFromSymbol("#");
    setRate(0.0);
    setToSymbol("#");
    setToAmount(undefined);
    setFromAmount(undefined);
    queryClient.removeQueries({ queryKey: ["to-currency"], exact: true });
  };

  useEffect(() => {
    if (data) {
      setCdata(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="my-4 flex items-center justify-center">
        {/* <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div> */}
        <span className="ml-2 text-gray-500">Loading currencies...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <Select onValueChange={handleValue} value={selectedCurrency?.abbrev || ""}>
        <SelectTrigger className="w-full border-0 my-3 shadow-none hover:bg-gray-50 transition-colors">
          <SelectValue placeholder="Select a currency">
            {selectedCurrency && (
              <div className="flex items-center gap-3">
                {selectedCurrency.flag && (
                  <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedCurrency.flag}
                      alt={`${selectedCurrency.country} flag`}
                      width={24}
                      height={16}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-900">
                    {selectedCurrency.abbrev}
                  </span>
                  {selectedCurrency.name && (
                    <span className="text-xs text-gray-500 truncate max-w-[150px]">
                      {selectedCurrency.name}
                    </span>
                  )}
                </div>
                <span className="ml-auto text-lg font-bold text-gray-600">
                  {selectedCurrency.symbol}
                </span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <SelectGroup>
            <SelectLabel className="flex items-center justify-between px-2">
              <span>Currencies</span>
              {selectedCurrency && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    resetSelection();
                  }}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  Clear selection
                </button>
              )}
            </SelectLabel>
            
            {filteredCurrencies && filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <SelectItem 
                  key={currency._id} 
                  value={currency.abbrev}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    {currency.flag && (
                      <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
                        <Image
                          src={currency.flag}
                          alt={`${currency.country} flag`}
                          width={24}
                          height={16}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col items-start flex-grow">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {currency.abbrev}
                        </span>
                        <span className="text-lg font-bold text-gray-600">
                          {currency.symbol}
                        </span>
                      </div>
                      {currency.name && (
                        <span className="text-xs text-gray-500 truncate max-w-[200px]">
                          {currency.name}
                        </span>
                      )}
                      {currency.country && (
                        <span className="text-xs text-gray-400 truncate max-w-[200px]">
                          {currency.country}
                        </span>
                      )}
                    </div>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-4 text-center text-gray-500 text-sm">
                {searchTerm ? `No currencies found matching "${searchTerm}"` : "No currencies available"}
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Quick access buttons for popular currencies */}
      <div className="flex gap-2 mt-2 flex-wrap">
        {["USD", "EUR", "GBP", "JPY", "CAD"].map((popular) => {
          const popularCurrency = cdata?.find(c => c.abbrev === popular);
          if (!popularCurrency) return null;
          
          return (
            <button
              key={popular}
              onClick={() => handleValue(popular)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                selectedCurrency?.abbrev === popular
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {popular}
            </button>
          );
        })}
      </div>

      {/* Display current selection info */}
      {selectedCurrency && (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-700 font-medium">
              Selected: {selectedCurrency.abbrev} ({selectedCurrency.symbol})
            </span>
          </div>
          {selectedCurrency.name && (
            <p className="text-xs text-blue-600 mt-1">
              {selectedCurrency.name}
              {selectedCurrency.country && ` - ${selectedCurrency.country}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;