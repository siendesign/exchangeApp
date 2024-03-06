"use client";

import { cn } from "@/lib/utils";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Change",
    },
    {
      text: "your",
    },
    {
      text: "cash",
    },
    {
      text: "with",
    },
    {
      text: "Rio Exchange.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-cente justify-center py-40">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} className="h-20 hidden md:flex" />
      <div className="">
        <div
          className={cn(
            "text-5xl text-left my-10 font-bold md:hidden leading-relaxed",
            font.className
          )}
        >
          Change your cash with{" "}
          <span className="text-blue-500">GuyExchange</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-5">
        <button className="h-12 md:w-40 md:h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Login
        </button>
        <button className="h-12 md:w-40 md:h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
        {/* <button className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
  Sketch
</button> */}
      </div>
    </div>
  );
}
