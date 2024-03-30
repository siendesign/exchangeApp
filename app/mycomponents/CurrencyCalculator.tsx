"use client";
import { useRef, useState } from "react";
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

const CurrencyCalculator = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [from, setFrom] = useState("");
  const [rate, setRate] = useState(0.0);
  const [fromAmount, setFromAmount] = useState(0.0);
  const [focus, setFocus] = useState("from");
  const [toAmount, setToAmount] = useState(0.0);
  const [fromSymbol, setFromSymbol] = useState("#");
  const [toSymbol, setToSymbol] = useState("#");

  const handleChangeToValue = (e: any) => {
    const num = e.target.value;
    // const options = {  maximumFractionDigits: 2   } ;
    // const formattedNumber = Intl.NumberFormat("en-US",options).format(num);

    // console.log(focus);
    if (rate === 0) return;

    if (focus === "from") {
      setFromAmount(num);
      setToAmount(parseFloat(((1 / rate) * num).toFixed(2)));
    }
    if (focus === "to") {
      setToAmount(num);
      setFromAmount(parseFloat((rate * num).toFixed(2)));
    }
  };

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
    alert(`${address.value}`);
  };

  if (session) {
    // alert(session?.user?.email)
    const userRole = getUserRole(session?.user?.email!);

    return (
      <>
        {/* <div className="">{session?.user?.email}</div> */}
        <div className="flex flex-col sm:flex-row gap-10 w-full">
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="capitalize text-sm text-gray-500 font-semibold">
              from
            </h3>
            <div className="border-b">
              <CurrencyDropdown
                setFrom={setFrom}
                setRate={setRate}
                setFromSymbol={setFromSymbol}
                setToSymbol={setToSymbol}
                setToAmount={setToAmount}
                setFromAmount={setFromAmount}
              />
            </div>
            <div className="text-4xl sm:text-7xl grid grid-cols-12 gap-6">
              <span className="col-span-2 flex items-center font-semibold text-3xl text-gray-500 text-center justify-center">
                {fromSymbol}
              </span>
              <div className="col-span-10">
                <input
                  type="number"
                  className="w-full h-full"
                  placeholder="0.00"
                  value={fromAmount}
                  step="0.01"
                  onFocus={() => {
                    setFocus("from");
                  }}
                  onChange={handleChangeToValue}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <h3 className="capitalize text-sm text-gray-500 font-semibold">
              to
            </h3>
            <div className="border-b">
              <ToCurrencyDropdown
                from={from}
                setRate={setRate}
                setToSymbol={setToSymbol}
              />
            </div>
            <div className="text-4xl sm:text-7xl grid grid-cols-12 gap-6">
              <span className="col-span-2 flex items-center font-semibold text-3xl text-gray-500 text-center justify-center">
                {toSymbol}
              </span>
              <div className="col-span-10">
                <input
                  type="number"
                  className="w-full"
                  placeholder="0.00"
                  value={toAmount}
                  step="0.01"
                  onFocus={() => {
                    setFocus("to");
                  }}
                  // onChange={(e) => setToAmount(+e.currentTarget.value)}
                  onChange={handleChangeToValue}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 w-full">
          <div className="flex-1">
            {/* <Button className="w-full">place an order</Button> */}
            {/* <Orderdialogue /> */}
            <Drawer>
              <DrawerTrigger
                className="border w-full h-full rounded-lg bg-black hover:bg-black/90 text-white"
                disabled={false}
              >
                Place an order
              </DrawerTrigger>
              <DrawerContent className="h-[90vh]">
                <DrawerHeader>
                  <DrawerTitle>Create Order</DrawerTitle>
                  <DrawerDescription>
                    You will receive {toAmount}
                  </DrawerDescription>
                </DrawerHeader>

                <div className="flex justify-center">
                  <div className="h-40 w-40 relative">
                    <Image
                      src={
                        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAM0AAADNAQAAAAAzx8nEAAABwUlEQVR4nO2XMa6DQAxEJ6Kg5Ah7k+RiSCBxMXKTPcKWFAj/GW8S8hOlNUVCsT/fj8Kyx94B9ulZ8ENfjwqAU+lhczdloFv5P4Z4NJhdbTJFk206FAtHPdpraazd0HuuicdRCDxsVI2ORDam+sveMoxC6lcZMhW7+psvrYxCVb2J1arHm7BDkD+KzmhsOXevYx6FprxAwlWUaMRy71ckKk3m/EABpFqjI5CtlCsV462SevGQTSSicFsJd7noJXRjwhnxiP1qtWC12aQd7EMUiYo0yygVsyq5/in5SNQnv2mk3ux180kKR43Z5inx4HJpnjxALFI0895lZFbTjkAS7pliqbLhvk20BAcgy9A20VJLuDz2SjSaVKO1rlV5o102ocjMbxp1ictF3ugx5pGI1rBOMIfIB3rZCxWHmJLveb94rMqmxCO6wrpITvKHfCnt/QpE8mTyh+3mHgBukIZwdHNE0HrLHsWTesPQ3R9ykmiZfbPNRyBNcJEj0hgrw1qyaHT7duBSkynRx8z2uHyDkbSjz1sKaE3/M4xEN/VmaVcfEEM88n5RsyqUC3e/lyMR6iLhnybXy3fr4tGH54e+Hf0BMRb05eDsSloAAAAASUVORK5CYII="
                      }
                      fill
                      alt="qr"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 px-5 mt-5">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      ref={walletAddress}
                      id="link"
                      defaultValue="mmdFAhC81X5YkwvqNdRy8Gmwd588vYwc4n"
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

                <div className="flex flex-col gap-5 justify-center items-center space-x-2 px-5 mt-5">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Destination Account Number</Label>
                    <Input type="text" id="email" placeholder="Enter Destination account number" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Destination Bank name</Label>
                    <Input type="text" id="email" placeholder="Enter Destirnation bank name" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Destination Country</Label>
                    <Input type="text" id="email" placeholder="Enter Destirnation bank country" />
                  </div>
                  
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
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
  }
};

export default CurrencyCalculator;
