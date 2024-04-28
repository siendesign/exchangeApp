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
  from: string | undefined;
  setRate: React.Dispatch<React.SetStateAction<number>>;
  setToSymbol: React.Dispatch<React.SetStateAction<string>>;
  setTo: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ToCurrencyDropdown = ({ from, setRate, setToSymbol, setTo }: Props) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["to-currency"],
    queryFn: () => getCurrencyPairs(from!),
    enabled: !!from,
  });

  const handleChangeToValue = async (value: string) => {
    let obj = data?.find((o) => o.to === value);
    // console.log(obj);

    const currencyData = await fetch(`/api/currencies/${value}`);
    const currency = await currencyData.json();

    // console.log(currency);
    setToSymbol(currency?.symbol!);
    setTo(value);
    setRate(Number(obj?.rate!));
  };

  if (isFetching) {
    return <div  className="my-4">Loading...</div>;
  }

  return (
    <Select onValueChange={(value) => handleChangeToValue(value)}>
      <SelectTrigger
        className="w-full border-0 my-3 shadow-none"
        disabled={!data}
      >
        <SelectValue placeholder="Select From currency first" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Currencies</SelectLabel>
          {data && data?.map((currency) => (
            <SelectItem key={currency._id} value={currency.to}>
              {currency.to}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ToCurrencyDropdown;
