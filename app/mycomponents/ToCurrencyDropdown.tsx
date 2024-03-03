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

interface Props {
  from: string;
  setRate: React.Dispatch<React.SetStateAction<number>>;
}

const ToCurrencyDropdown = ({ from, setRate }: Props) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["to-currency"],
    queryFn: () => getCurrencyPairs(from),
    enabled: !!from,
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Select onValueChange={(value)=>setRate(Number(value))}>
      <SelectTrigger
        className="w-full border-0 my-3 shadow-none"
        disabled={!data}
      >
        <SelectValue placeholder="Select From currency first" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Currencies</SelectLabel>
          {data?.map((currency) => (
            <SelectItem key={currency._id} value={currency.rate}>
              {currency.to}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ToCurrencyDropdown;
