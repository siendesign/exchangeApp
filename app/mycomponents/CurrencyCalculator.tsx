"use client";
import { useState } from "react";
import { FaCaretUp } from "react-icons/fa6";
import CurrencyDropdown from "./CurrencyDropdown";
import Orderdialogue from "./Orderdialogue";
import ToCurrencyDropdown from "./ToCurrencyDropdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CurrencyCalculator = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [from, setFrom] = useState("");
  const [rate, setRate] = useState(0.0);
  const [fromAmount, setFromAmount] = useState(0.0);
  const [focus, setFocus] = useState("from");
  const [toAmount, setToAmount] = useState(0.0);


  const handleChangeToValue = (e: any) => {
    const num = e.target.value;
    // const options = {  maximumFractionDigits: 2   } ;
    // const formattedNumber = Intl.NumberFormat("en-US",options).format(num);
    setFromAmount(num);
    setToAmount(parseFloat(((1 / rate) * num).toFixed(2)));
  };

  const getUserRole = async (email:string) => {
    const data = await fetch(`/api/user/${email}`);
    const json = await data.json();
    if(json.role === "admin") {
      router.push("/dashboard");
    }
    return json.role;
  };

  if (session) {
    // alert(session?.user?.email)
    const userRole = getUserRole(session?.user?.email!);
    
    console.log(userRole);
    
    return (
      <>
        <div className="">{session?.user?.email}</div>
        <div className="flex flex-col sm:flex-row gap-10 w-full">
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="capitalize text-sm text-gray-500 font-semibold">
              from
            </h3>
            <div className="border-b">
              <CurrencyDropdown setFrom={setFrom} setRate={setRate} />
            </div>
            <div className="text-4xl sm:text-7xl grid grid-cols-12 gap-6">
              <span className="col-span-2 flex items-center font-thin">£</span>
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
              <ToCurrencyDropdown from={from} setRate={setRate} />
            </div>
            <div className="text-4xl sm:text-7xl grid grid-cols-12 gap-6">
              <span className="col-span-2 flex items-center font-thin">$</span>
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
                  onChange={(e) => setToAmount(+e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-10 w-full">
          <div className="flex-1">
            {/* <Button className="w-full">place an order</Button> */}
            <Orderdialogue />
          </div>
          <div className="flex-1 flex items-center gap-10">
            <div className="">
              <h3 className="text-sm text-gray-500 capitalize">
                Exchange Rate
              </h3>
              <div className="text-xl font-semibold">{rate}</div>
            </div>
            <div className="">
              <h3 className="text-sm text-gray-500 capitalize">precentage</h3>
              <div className="text-xl font-semibold text-green-500 flex items-end gap-2">
                <span className="">
                  <FaCaretUp />
                </span>{" "}
                0.00058 (0.74%)
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CurrencyCalculator;
