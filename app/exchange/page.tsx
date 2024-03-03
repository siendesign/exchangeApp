import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import React from 'react'
import CurrencyCalculator from '../mycomponents/CurrencyCalculator'
import { Chart } from '../mycomponents/Chart'
import { getAllcurrencies, getCurrencyPair } from '@/lib/data'

const page = async() => {

  // const allcurrencies = await getAllcurrencies();
  // const allcurrencies = [];
  // console.log(allcurrencies);
  
  return (
    <>
      <CurrencyCalculator/>
      
      <div className="h-96 border flex justify-center items-center pr-4 pt-5 rounded-md">
        <Chart />
      </div>
    </>
  )
}

export default page