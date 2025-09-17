"use client";
import { logout } from "@/app/(auth)/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const signOut = async () =>{
    console.log("logging out...");
    
    await logout();

   window.location.reload()
  }
  return (
    <main className="max-w-7xl mx-auto p-8 flex flex-col gap-10 h-screen">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">RayEx</h1>
        {/* <div className="relaltive h-auto w-30">
          <img  src={"/image1.png"} alt="logo" className="w-40"/>
        </div> */}

        <div className="flex gap-6 items-center">
          <div className="capitalize font-semibold text-gray-500 hidden sm:block">
            <Link
              href={"/exchange"}
              className="py-2 px-4 hover:bg-gray-100 rounded hover:text-gray-950"
            >
              exchange
            </Link>
            <Link
              href={"/exchange/orders"}
              className="py-2 px-4 hover:bg-gray-100 rounded hover:text-gray-950"
            >
              orders
            </Link>
            <Button className="mx-2" onClick={signOut}>
              {" "}
              signout
            </Button>
          </div>
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    // src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback className="uppercase">
                    {/* {firstLetter} */}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={"/exchange"}
                    className=" hover:bg-gray-100  w-full"
                  >
                    exchange
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/exchange/orders"}
                    className=" hover:bg-gray-100  w-full"
                  >
                    orders
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="uppercase">ve</AvatarFallback>
                </Avatar> */}
        </div>
      </div>
      {children}
    </main>
  );
}
