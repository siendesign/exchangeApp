"use client";
import { useRouter } from "next/navigation";
import { Chart } from "../../mycomponents/Chart";
import CurrencyCalculator from "../../mycomponents/CurrencyCalculator";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";

const page = () => {
  

  return (
    <>
      <CurrencyCalculator />
      <div className="h-96  border flex justify-center items-cente  rounded-md overflow-hidden">
        {/* <Chart /> */}
      </div>
    </>
  );
};

export default page;
