import Image from "next/image";
// import CurrencyDropdown from "./mycomponents/CurrencyDropdown";
// import { Button } from "@/components/ui/button";
// import { FaCaretUp } from "react-icons/fa6";
import { Chart } from "./mycomponents/Chart";
import CurrencyCalculator from "./mycomponents/CurrencyCalculator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TypewriterEffectSmoothDemo } from "./components/Hero";
import Navbar from "./mycomponents/Navbar";

export default function Home() {
  return (
    <main className="">
      {/*  */}
      {/* home page
      <Link href={'/exchange'} className="p-5 underline">exchange</Link> */}
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">
        <TypewriterEffectSmoothDemo />
      </div>
      
    </main>
  );
}
