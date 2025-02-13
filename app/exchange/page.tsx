"use client";
import { useRouter } from "next/navigation";
import { Chart } from "../mycomponents/Chart";
import CurrencyCalculator from "../mycomponents/CurrencyCalculator";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Carousel from "./components/Carousel";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();
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

  const images = [
    "https://images.pexels.com/photos/259165/pexels-photo-259165.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=800",
    // Add more image URLs as needed
  ];

  // console.log(session?.user?.email!);

  useEffect(() => {
    if (session) {
      getUserRole(session?.user?.email!);
    }
  }, [session]);

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
        <Carousel images={images} />
      </div>
    </>
  );
};

export default page;
