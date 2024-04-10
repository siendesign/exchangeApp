"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CopyIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [orders, setOrders] = useState<any | null>();

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      // title: "Scheduled: Catch up ",
      description: "copied to clipboard",
    });
  };

  useEffect(() => {
    console.log(session?.user?.email!);

    if (session) {
      let i = 0;
      setInterval(async () => {
        console.log(i++);
        // const response = await fetch(`/api/order/itoro@gmail.com`)
        const response = await fetch(`/api/order/${session?.user?.email!}`);
        const userorders = await response.json();
        setOrders(userorders);

        console.log(userorders);
      }, 5000);
    }
  }, [session]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recent orders.{session?.user?.email!}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders?.map((order: any) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">{order._id}</TableCell>
                <TableCell className="text-yellow-600">
                  {order.status}
                </TableCell>
                <TableCell>{order.destinationAccountName}</TableCell>
                <TableCell>{order.toCurrency}</TableCell>
                <TableCell className="text-right">{order.toAmount!}</TableCell>
                <TableCell className="text-right">
                  <Drawer>
                    <DrawerTrigger>view</DrawerTrigger>
                    <DrawerContent className="">
                      <div className="max-w-6xl mx-auto w-full ">
                        <div className="w-full p-7">
                          <div className="mb-5">
                            <h2 className="font-bold text-sm uppercase text-gray-500">
                              Order {order._id}
                            </h2>
                            <div className="text-gray-400">
                              Status: <span className="">{order.status}</span>{" "}
                            </div>
                          </div>
                          <hr />
                          <div className="flex gap-5 py-4">
                            <div className="h-40 w-40 sm:h-76 sm:w-76  relative">
                              <Image
                                src={
                                  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAM0AAADNAQAAAAAzx8nEAAABwUlEQVR4nO2XMa6DQAxEJ6Kg5Ah7k+RiSCBxMXKTPcKWFAj/GW8S8hOlNUVCsT/fj8Kyx94B9ulZ8ENfjwqAU+lhczdloFv5P4Z4NJhdbTJFk206FAtHPdpraazd0HuuicdRCDxsVI2ORDam+sveMoxC6lcZMhW7+psvrYxCVb2J1arHm7BDkD+KzmhsOXevYx6FprxAwlWUaMRy71ckKk3m/EABpFqjI5CtlCsV462SevGQTSSicFsJd7noJXRjwhnxiP1qtWC12aQd7EMUiYo0yygVsyq5/in5SNQnv2mk3ux180kKR43Z5inx4HJpnjxALFI0895lZFbTjkAS7pliqbLhvk20BAcgy9A20VJLuDz2SjSaVKO1rlV5o102ocjMbxp1ictF3ugx5pGI1rBOMIfIB3rZCxWHmJLveb94rMqmxCO6wrpITvKHfCnt/QpE8mTyh+3mHgBukIZwdHNE0HrLHsWTesPQ3R9ykmiZfbPNRyBNcJEj0hgrw1qyaHT7duBSkynRx8z2uHyDkbSjz1sKaE3/M4xEN/VmaVcfEEM88n5RsyqUC3e/lyMR6iLhnybXy3fr4tGH54e+Hf0BMRb05eDsSloAAAAASUVORK5CYII="
                                }
                                fill
                                alt="qr"
                              />
                            </div>
                            <div className="pt-4 flex flex-col gap-2">
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium ">
                                  wallet :{" "}
                                  <span className="lowercase text-gray-500">
                                    {order.paymentWalletAddress}
                                  </span>
                                </div>
                                <Button
                                  variant={"ghost"}
                                  onClick={() =>
                                    handleCopyToClipboard(
                                      order.paymentWalletAddress
                                    )
                                  }
                                >
                                  <CopyIcon className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium ">
                                  Destination Account Number :{" "}
                                  <span className="lowercase text-gray-500">
                                    {order.destinationAccountNumber}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium ">
                                  Destination Account Name :{" "}
                                  <span className=" text-gray-500">
                                    {order.destinationAccountName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium ">
                                  Destination Bank Name :{" "}
                                  <span className=" text-gray-500">
                                    {order.destinationBankName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DrawerFooter className="flex-row justify-end">
                          <Button>Payment made</Button>
                          {/* <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose> */}
                        </DrawerFooter>
                        {/* <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter> */}
                      </div>
                    </DrawerContent>
                  </Drawer>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
};

export default page;
