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
import { getCurrencyPairs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  from: string | undefined;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  setToSymbol: React.Dispatch<React.SetStateAction<string>>;
  setTo: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface CurrencyPair {
  _id: string;
  to: string;
  rate: string;
  from?: string;
}

interface Currency {
  _id: string;
  abbrev: string;
  symbol: string;
  name?: string;
  flag?: string;
  country?: string;
}

const ToCurrencyDropdown = ({ from, setRate, setToSymbol, setTo }: Props) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>([]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["to-currency"],
    queryFn: () => getCurrencyPairs(from!),
    enabled: !!from,
  });

  // Filter currencies based on search term
  const filteredCurrencies = availableCurrencies.filter((currency) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      currency.abbrev.toLowerCase().includes(searchLower) ||
      currency.name?.toLowerCase().includes(searchLower) ||
      currency.country?.toLowerCase().includes(searchLower)
    );
  });

  const handleChangeToValue = async (value: string) => {
    let obj = data?.find((o) => o.to === value);

    try {
      const currencyData = await fetch(`/api/currencies/${value}`);
      const currency = await currencyData.json();

      if (currency) {
        setSelectedCurrency(currency);
        setToSymbol(currency.symbol || "#");
        setTo(value);
        setRate(Number(obj?.rate || 0));
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
      setToSymbol("#");
      setTo(value);
      setRate(Number(obj?.rate || 0));
    }
  };

  const resetSelection = () => {
    setTo(undefined);
    setSelectedCurrency(undefined);
    setToSymbol("#");
    setRate(0);
  };

  // Fetch detailed currency information when pairs are loaded
  useEffect(() => {
    const fetchCurrencyDetails = async () => {
      if (!data || data.length === 0) {
        setAvailableCurrencies([]);
        return;
      }

      try {
        const currencyPromises = data.map(async (pair) => {
          try {
            const response = await fetch(`/api/currencies/${pair.to}`);
            const currencyDetail = await response.json();
            return currencyDetail;
          } catch (error) {
            console.error(`Error fetching ${pair.to}:`, error);
            return {
              _id: pair._id,
              abbrev: pair.to,
              symbol: "#",
              name: pair.to,
            };
          }
        });

        const currencies = await Promise.all(currencyPromises);
        setAvailableCurrencies(currencies.filter(Boolean));
      } catch (error) {
        console.error("Error fetching currency details:", error);
        // Fallback to basic currency objects
        const basicCurrencies = data.map(pair => ({
          _id: pair._id,
          abbrev: pair.to,
          symbol: "#",
          name: pair.to,
        }));
        setAvailableCurrencies(basicCurrencies);
      }
    };

    fetchCurrencyDetails();
  }, [data]);

  // Reset selection when 'from' currency changes
  useEffect(() => {
    if (!from) {
      resetSelection();
      setAvailableCurrencies([]);
    }
  }, [from]);

  if (!from) {
    return (
      <div className="my-4 p-4 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 h-full">
        <div className="text-gray-500 text-sm">
          <div className="mb-2">🔄</div>
          <p className="font-medium">Select a "From" currency first</p>
          <p className="text-xs mt-1">Choose the currency you want to convert from</p>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="my-4 flex items-center justify-center">
        {/* <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div> */}
        <span className="ml-2 text-gray-500">Loading available pairs...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="my-4 p-4 text-center bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="text-yellow-700 text-sm">
          <div className="mb-2">⚠️</div>
          <p className="font-medium">No conversion pairs available</p>
          <p className="text-xs mt-1">No currencies available to convert {from} to</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Select 
        onValueChange={(value) => handleChangeToValue(value)}
        value={selectedCurrency?.abbrev || ""}
      >
        <SelectTrigger className="w-full border-0 my-3 shadow-none hover:bg-gray-50 transition-colors">
          <SelectValue placeholder="Select destination currency">
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
              <span>Available Conversions from {from}</span>
              {selectedCurrency && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    resetSelection();
                  }}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  Clear
                </button>
              )}
            </SelectLabel>
            
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency, index) => {
                const pair = data.find(p => p.to === currency.abbrev);
                const rate = pair ? Number(pair.rate) : 0;
                
                return (
                  <SelectItem 
                    key={`${currency._id}-${index}`} 
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
                        {rate > 0 && (
                          <span className="text-xs text-green-600 font-medium">
                            Rate: {rate.toFixed(4)}
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                );
              })
            ) : (
              <div className="px-2 py-4 text-center text-gray-500 text-sm">
                {searchTerm 
                  ? `No currencies found matching "${searchTerm}"` 
                  : "No currencies available"
                }
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Display current selection and rate info */}
      {selectedCurrency && data && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700 font-medium">
                {from} → {selectedCurrency.abbrev}
              </span>
            </div>
            {(() => {
              const pair = data.find(p => p.to === selectedCurrency.abbrev);
              const rate = pair ? Number(pair.rate) : 0;
              return rate > 0 && (
                <span className="text-sm text-green-700 font-bold">
                  1 {from} = {rate.toFixed(4)} {selectedCurrency.abbrev}
                </span>
              );
            })()}
          </div>
          {selectedCurrency.name && (
            <p className="text-xs text-green-600 mt-1">
              {selectedCurrency.name}
              {selectedCurrency.country && ` - ${selectedCurrency.country}`}
            </p>
          )}
        </div>
      )}

      {/* Show total available pairs */}
      {data && data.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          {data.length} conversion pair{data.length !== 1 ? 's' : ''} available from {from}
        </div>
      )}
    </div>
  );
};

export default ToCurrencyDropdown;