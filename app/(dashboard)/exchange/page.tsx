"use client";
import { useRouter } from "next/navigation";
import { Chart } from "../../mycomponents/Chart";
import CurrencyCalculator from "../../mycomponents/CurrencyCalculator";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";

const page = () => {
  const router = useRouter();
 
  const [loading, setLoading] = useState(true);

  const getUserRole = async (email: string) => {
    const data = await fetch(`/api/user/${email}`);
    const json = await data.json();

    if (json.role === "admin") {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
    return json.role;
  };



  // console.log(session?.user?.email!);


  if (loading) {
    return (
      <div className={"w-full h-96 flex justify-center items-end "}>
        <div className="flex gap-3 items-center">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

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
