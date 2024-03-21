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

interface Props {
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  setRate: React.Dispatch<React.SetStateAction<number>>;
}

const CurrencyDropdown = ({ setFrom, setRate }: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["from-currency"],
    queryFn: getAllCurrencies,
  });

  const handleValue = (value: string) => {
    setFrom(value);
    queryClient.removeQueries({ queryKey: ["to-currency"], exact: true });
    setRate(0.00);
  };

  console.log(data);
  

  if (isLoading) {
    return <div>Loading...</div>;
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
            {data?.map((currency) => (
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
