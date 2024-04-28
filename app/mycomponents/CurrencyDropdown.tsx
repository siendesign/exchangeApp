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

interface Props {
  setFrom: React.Dispatch<React.SetStateAction<string | undefined>>;
  setToAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  setFromAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
  setFromSymbol: React.Dispatch<React.SetStateAction<string>>;
  setToSymbol: React.Dispatch<React.SetStateAction<string>>;
  setRate: React.Dispatch<React.SetStateAction<number>>;
}

const CurrencyDropdown = ({
  setFrom,
  setRate,
  setFromSymbol,
  setToSymbol,
  setToAmount,
  setFromAmount,
}: Props) => {
  const [cdata, setCdata] = useState<any[] | undefined>();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["from-currency"],
    queryFn: getAllCurrencies,
  });



  const handleValue = (value: string) => {
    setFrom(value);
    queryClient.removeQueries({ queryKey: ["to-currency"], exact: true });
    setRate(0.0);
    setToSymbol("#");
    setToAmount(undefined);
    setFromAmount(undefined);
    // console.log(value);

    // console.log(data);

    let obj = data?.find((o) => o.abbrev === value);
    setFromSymbol(obj?.symbol!);
    // console.log(obj?.symbol);
  };

  useEffect(() => {
    if (data) {
      setCdata(data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="my-4">Loading...</div>;
  }

  return (
    <div>
      <Select onValueChange={handleValue}>
        <SelectTrigger className="w-full border-0 my-3 shadow-none">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Currencies</SelectLabel>
            {cdata &&
              cdata?.map((currency) => (
                <SelectItem key={currency._id} value={currency.abbrev}>
                  {currency.abbrev}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencyDropdown;
