import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="px-7 py-4 border-b">
      <div className="flex justify-between items-center ">
        <div className="">
          <div className="relative z-20 flex items-center text-sm font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="">GuyExchange</span>
          </div>
        </div>
        <div className="">
          <Button
            asChild
            className="w-32 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-xs"
          >
            <Link href="/signup">
              <span className="text-sm font-medium leading-none"> Try now</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
