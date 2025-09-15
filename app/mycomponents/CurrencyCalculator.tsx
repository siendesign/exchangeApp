"use client";
import { useEffect, useRef, useState } from "react";
import { FaCaretUp } from "react-icons/fa6";
import CurrencyDropdown from "./CurrencyDropdown";
import Orderdialogue from "./Orderdialogue";
import ToCurrencyDropdown from "./ToCurrencyDropdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { IoIosWallet } from "react-icons/io";
import { useGetAuthUserQuery } from "@/state/api";

type Valuable<T> = {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

function filterValues<T extends {}, V = Valuable<T>>(obj: T): V {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        !(
          (typeof v === "string" && !v.length) ||
          v === null ||
          typeof v === "undefined"
        )
    )
  ) as V;
}

// Number formatting utilities
const formatNumberWithCommas = (value: number | string): string => {
  if (value === "" || value === undefined || value === null) return "";
  
  const numStr = value.toString();
  const parts = numStr.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts[1] !== undefined ? `${integerPart}.${parts[1]}` : integerPart;
};

const parseFormattedNumber = (formattedValue: string): number => {
  if (!formattedValue) return 0;
  return parseFloat(formattedValue.replace(/,/g, '')) || 0;
};

const CurrencyCalculator = () => {

  const {data:authUser, isLoading:authLoading} = useGetAuthUserQuery()
  
  const router = useRouter();
  const { toast } = useToast();

  // const { data: session } = useSession();
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const [rate, setRate] = useState(0.0);
  const [fromAmount, setFromAmount] = useState<number | 0>();
  const [toAmount, setToAmount] = useState<number | 0>();
  
  // Display values for formatted inputs
  const [fromAmountDisplay, setFromAmountDisplay] = useState<string>("");
  const [toAmountDisplay, setToAmountDisplay] = useState<string>("");
  
  const [focus, setFocus] = useState("from");
  const [fromSymbol, setFromSymbol] = useState("#");
  const [toSymbol, setToSymbol] = useState("#");
  const [cryptowalletAddress, setCryptowalletAddress] = useState<
    string | undefined
  >();

  //orderdata
  const [destinationAccountNumber, setDestinationAccountNumber] = useState("");
  const [destinationAccountName, setDestinationAccountName] = useState("");
  const [destinationBankName, setDestinationBankName] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [cryptoCurrencyName, setCryptoCurrencyName] = useState<
    string | undefined
  >();
  const [cryptoCurrencySymbol, setcryptoCurrencySymbol] = useState<
    string | undefined
  >();
  const [tranferNetwork, setTranferNetworkl] = useState<string | undefined>();

  //inputStates
  const [disabled, setDisabled] = useState<boolean>(true);

  //
  const [wallets, setWalltes] = useState<any[] | undefined>();

  const handleSelectMethod = (
    address: string,
    name: string,
    symbol: string,
    network: string
  ) => {
    console.log(address, name, symbol, network);
    setCryptoCurrencyName(name);
    setCryptowalletAddress(address);
    setcryptoCurrencySymbol(symbol);
    setTranferNetworkl(network);
  };

  const fetchWallets = async () => {
    const request = await fetch(`/api/wallet`);
    const response = await request.json();
    console.log(response);
    if (response.length > 0) {
      setWalltes(response);
    }
  };

  const handleChangeToValue = (e: any) => {
    const inputValue = e.target.value;
    
    // Remove commas and parse the number
    const numericValue = parseFormattedNumber(inputValue);
    
    if (rate === 0) return;

    if (focus === "from") {
      setFromAmount(numericValue);
      setFromAmountDisplay(formatNumberWithCommas(inputValue));
      
      const calculatedToAmount = parseFloat(((1 / rate) * numericValue).toFixed(2));
      setToAmount(calculatedToAmount);
      setToAmountDisplay(formatNumberWithCommas(calculatedToAmount));
    }
    
    if (focus === "to") {
      setToAmount(numericValue);
      setToAmountDisplay(formatNumberWithCommas(inputValue));
      
      const calculatedFromAmount = parseFloat((rate * numericValue).toFixed(2));
      setFromAmount(calculatedFromAmount);
      setFromAmountDisplay(formatNumberWithCommas(calculatedFromAmount));
    }

    if (numericValue > 0) {
      setDisabled(false);
    }
  };

  // Update display values when amounts change programmatically
  useEffect(() => {
    if (fromAmount !== undefined) {
      setFromAmountDisplay(formatNumberWithCommas(fromAmount));
    }
  }, [fromAmount]);

  useEffect(() => {
    if (toAmount !== undefined) {
      setToAmountDisplay(formatNumberWithCommas(toAmount));
    }
  }, [toAmount]);

  const getUserRole = async (email: string) => {
    const data = await fetch(`/api/user/${email}`);
    const json = await data.json();
    if (json.role === "admin") {
      router.push("/dashboard");
    }
    return json.role;
  };

  const walletAddress = useRef<any | null>(null);

  const handleCopyAddress = () => {
    const address = walletAddress.current;
    navigator.clipboard.writeText(address.value);
    alert(`${address.value}`);
  };

  const handlePlaceOrder = async () => {
    // console.log("order placed by " + session?.user?.email!);

    let data = {
      // userEmail: session?.user?.email!,
      destinationAccountNumber,
      destinationAccountName,
      walletAddress: walletAddress.current.value,
      from,
      to,
      destinationCountry,
      destinationBankName,
      rate,
      fromAmount,
      toAmount,
      toSymbol,
      fromSymbol,
    };

    // console.log(data);
    console.log(Object.keys(data).length);

    const dataValidation = filterValues(data);

    console.log("valid:", Object.keys(dataValidation).length);

    if (Object.keys(data).length != Object.keys(dataValidation).length) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Inlavid order. Enter all fields",
      });
    }

    if (fromAmount! > 0 || toAmount! > 0) {
      await fetch("api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          router.push("/exchange/orders");
        });
    } else {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Inlavid order.",
      });
    }
  };

  // Enhanced prop setters for child components
  const enhancedSetFromAmount = (amount: number | undefined) => {
    setFromAmount(amount);
    if (amount !== undefined) {
      setFromAmountDisplay(formatNumberWithCommas(amount));
    } else {
      setFromAmountDisplay("");
    }
  };

  const enhancedSetToAmount = (amount: number | undefined) => {
    setToAmount(amount);
    if (amount !== undefined) {
      setToAmountDisplay(formatNumberWithCommas(amount));
    } else {
      setToAmountDisplay("");
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  // if (session) {
  //   // alert(session?.user?.email)
  //   const userRole = getUserRole(session?.user?.email!);

    return (
      <>
        {/* <div className="">{session?.user?.email}</div> */}
        <div className="flex flex-col sm:flex-row gap-10 w-full">
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="uppercase text-md text-gray-500 font-semibold">
              from
            </h3>
            <div className="border-b">
              <CurrencyDropdown
                setFrom={setFrom}
                setRate={setRate}
                setFromSymbol={setFromSymbol}
                setToSymbol={setToSymbol}
                setToAmount={enhancedSetToAmount}
                setFromAmount={enhancedSetFromAmount}
              />
            </div>
            <div className="text-4xl sm:text-7xl grid grid-cols-12 gap-6">
              <span className="col-span-2 flex items-center font-semibold text-3xl text-gray-500 text-center justify-center">
                {fromSymbol}
              </span>
              <div className="col-span-10">
                <input
                  type="text"
                  className="w-full h-full px-4 rounded-md"
                  placeholder="0.00"
                  value={fromAmountDisplay}
                  onFocus={() => {
                    setFocus("from");
                  }}
                  onChange={handleChangeToValue}
                  disabled={
                    from === undefined || to === undefined ? true : false
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <h3 className="uppercase text-md text-gray-500 font-semibold">
              to
            </h3>
            <div className="border-b">
              <ToCurrencyDropdown
                from={from}
                setTo={setTo}
                setRate={setRate}
                setToSymbol={setToSymbol}
              />
            </div>
            {to && (

            <div className="text-4xl sm:text-7xl grid grid-cols-12 gap-6">
              <span className="col-span-2 flex items-center font-semibold text-3xl text-gray-500 text-center justify-center">
                {toSymbol}
              </span>
              <div className="col-span-10">
                <input
                  type="text"
                  className="w-full px-4 rounded-md"
                  placeholder="0.00"
                  value={toAmountDisplay}
                  onFocus={() => {
                    setFocus("to");
                  }}
                  onChange={handleChangeToValue}
                  disabled={
                    fromAmount === undefined || to === undefined ? true : false
                  }
                />
              </div>
            </div>
            )}
          </div>
        </div>

        <div className="flex gap-10 w-full">
          <div className="flex-1">
            {/* <Button className="w-full">place an order</Button> */}
            {/* <Orderdialogue /> */}
            <Drawer>
              <DrawerTrigger
                className="border w-full h-full rounded-lg bg-black hover:bg-black/90 text-white"
                // disabled={disabled}  
              >
                Place an order
              </DrawerTrigger>
              <DrawerContent className="h-fit">
                <DrawerHeader>
                  <DrawerTitle>Create Order</DrawerTitle>
                  <DrawerDescription>
                  {toSymbol}{" "}{toAmountDisplay} will be received.
                  </DrawerDescription>
                </DrawerHeader>
                <div className=" p-8">
                  <div className="sm:flex w-full gap-5">
                    <div className="flex flex-col justify-center items-center">
                      <div className="h-40 w-40 sm:h-80 sm:w-80 border relative">
                        <Image
                          src={
                            "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAM0AAADNAQAAAAAzx8nEAAABwUlEQVR4nO2XMa6DQAxEJ6Kg5Ah7k+RiSCBxMXKTPcKWFAj/GW8S8hOlNUVCsT/fj8Kyx94B9ulZ8ENfjwqAU+lhczdloFv5P4Z4NJhdbTJFk206FAtHPdpraazd0HuuicdRCDxsVI2ORDam+sveMoxC6lcZMhW7+psvrYxCVb2J1arHm7BDkD+KzmhsOXevYx6FprxAwlWUaMRy71ckKk3m/EABpFqjI5CtlCsV462SevGQTSSicFsJd7noJXRjwhnxiP1qtWC12aQd7EMUiYo0yygVsyq5/in5SNQnv2mk3ux180kKR43Z5inx4HJpnjxALFI0895lZFbTjkAS7pliqbLhvk20BAcgy9A20VJLuDz2SjSaVKO1rlV5o102ocjMbxp1ictF3ugx5pGI1rBOMIfIB3rZCxWHmJLveb94rMqmxCO6wrpITvKHfCnt/QpE8mTyh+3mHgBukIZwdHNE0HrLHsWTesPQ3R9ykmiZfbPNRyBNcJEj0hgrw1qyaHT7duBSkynRx8z2uHyDkbSjz1sKaE3/M4xEN/VmaVcfEEM88n5RsyqUC3e/lyMR6iLhnybXy3fr4tGH54e+Hf0BMRb05eDsSloAAAAASUVORK5CYII="
                          }
                          fill
                          alt="qr"
                        />
                      </div>
                      <div className="flex items-center space-x-2 px-5 sm:px-0 mt-5 sm:w-80">
                        <div className="grid flex-1 gap-2">
                          <Label htmlFor="link" className="sr-only">
                            Link
                          </Label>
                          <Input
                            ref={walletAddress}
                            id="link"
                            defaultValue={cryptowalletAddress}
                            placeholder="cyptowallet address"
                            readOnly
                          />
                        </div>
                        <Button
                          type="submit"
                          size="sm"
                          className="px-3"
                          onClick={handleCopyAddress}
                        >
                          <span className="sr-only">Copy</span>
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex-grow flex items-start ">
                      <div className="flex w-full flex-col gap-5 justify-center items-center sm:items-start space-x-2 px-5 mt-5">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">Payment Method</Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className=" flex justify-between text-gray-500"
                              >
                                {" "}
                                <div className="">
                                  {cryptoCurrencyName
                                    ? cryptoCurrencyName
                                    : "Choose payment method"}
                                </div>{" "}
                                <IoIosWallet />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[400px]">
                              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                              <DropdownMenuSeparator />
                              {wallets &&
                                wallets.map((wallet: any) => (
                                  <DropdownMenuItem
                                    key={wallet._id}
                                    className="flex flex-col items-start gap-1"
                                    onClick={() =>
                                      handleSelectMethod(
                                        wallet.cryptoCurrencyAddress,
                                        wallet.cryptoCurrencyName,
                                        wallet.cryptoCurrencySymbol,
                                        wallet.tranferNetwork
                                      )
                                    }
                                  >
                                    <div className="font-bold">
                                      {wallet.cryptoCurrencyName} ({wallet.tranferNetwork})
                                    </div>
                                    <div className="text-sm text-gray-400">
                                      {wallet.cryptoCurrencyAddress}
                                    </div>
                                  </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">
                            Destination Account Number
                          </Label>
                          <Input
                            type="text"
                            placeholder="Enter Destination account number"
                            value={destinationAccountNumber}
                            onChange={(e) =>
                              setDestinationAccountNumber(e.target.value)
                            }
                          />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">
                            Destination Account Name
                          </Label>
                          <Input
                            type="text"
                            placeholder="Enter Destination account number"
                            value={destinationAccountName}
                            onChange={(e) =>
                              setDestinationAccountName(e.target.value)
                            }
                          />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">Destination Bank name</Label>
                          <Input
                            type="text"
                            placeholder="Enter Destirnation bank name"
                            value={destinationBankName}
                            onChange={(e) =>
                              setDestinationBankName(e.target.value)
                            }
                          />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">Destination Country</Label>
                          <Input
                            type="text"
                            placeholder="Enter Destirnation bank country"
                            value={destinationCountry}
                            onChange={(e) =>
                              setDestinationCountry(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <DrawerFooter className="sm:flex-row">
                  <Button className=" sm:order-2" onClick={handlePlaceOrder}>
                    place Order
                  </Button>
                  <DrawerClose>
                    <Button variant="outline" className="w-full ">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="flex-1 flex items-center gap-10">
            <div className="">
              <h3 className="text-sm text-gray-500 capitalize">
                Exchange Rate
              </h3>
              <div className="text-xl font-semibold">{rate}</div>
            </div>
            <div className="">
              {/* <h3 className="text-sm text-gray-500 capitalize">precentage</h3>
              <div className="text-xl font-semibold text-green-500 flex items-end gap-2">
                <span className="">
                  <FaCaretUp />
                </span>{" "}
                0.00058 (0.74%)
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  // }
};

export default CurrencyCalculator;