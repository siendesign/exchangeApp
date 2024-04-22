'use client'
import { useRouter } from "next/navigation";
import { Chart } from "../mycomponents/Chart";
import CurrencyCalculator from "../mycomponents/CurrencyCalculator";
import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const getUserRole = async (email: string) => {
    const data = await fetch(`/api/user/${email}`);
    const json = await data.json();
    
    if (json.role === "admin") {
      router.push("/dashboard");
    }else{
      setLoading(false);
    }
    return json.role;
  };


  console.log(session?.user?.email!);

  useEffect(()=>{    
    if(session){
      getUserRole(session?.user?.email!)
        
    }
  },[session])
  
  if(loading){
    return(
      <div className={"w-full h-96 flex justify-center items-end "}>
        <div className="flex gap-3 items-center">
          <div className="loader"></div>
        </div>
      </div>
    )
  }
  
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
