"use client";
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
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  let firstLetter;
  if (session) {
    firstLetter = Array.from(session?.user?.email!)[0];
  }
  return (
    <main className="max-w-6xl mx-auto p-8 flex flex-col gap-10 h-screen">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">GuyExchange</h1>

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
            <Button className="mx-2" onClick={() => signOut()}>
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
                    {firstLetter}
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
                <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
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
