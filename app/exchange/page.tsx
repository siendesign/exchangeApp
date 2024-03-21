'use client'
import { Chart } from "../mycomponents/Chart";
import CurrencyCalculator from "../mycomponents/CurrencyCalculator";
import { useSession } from 'next-auth/react'

const page = () => {
 

  
  return (
    <>
      <CurrencyCalculator />
      <div className="h-96 border flex justify-center items-center pr-4 pt-5 rounded-md">
        <Chart />
      </div>
    </>
  );
};

export default page;
