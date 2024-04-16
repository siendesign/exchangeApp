"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CopyIcon } from "@radix-ui/react-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetctAllCurrencyPairs } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CurrencyTable = () => {
  const [loader, setLoader] = useState(true);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["currency-pairs"],
    queryFn: fetctAllCurrencyPairs,
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      setLoader(false);
    }
  }, [data]);

  if(isLoading){
    return <div
    className={"w-full h-96 flex justify-center items-end "}
  >
    <div className="loader"></div>
  </div>
  }
  return (
    <div>
      <Table>
        {/* <TableCaption>
  A list of your recent orders.{session?.user?.email!}
</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>rate</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data?.map((data: any) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium text-gray-500">
                  {data.from}
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  {data.to}
                </TableCell>

                <TableCell>{data.rate}</TableCell>

                <TableCell className="text-right">
                  <Drawer>
                    <DrawerTrigger>view</DrawerTrigger>
                    <DrawerContent className="">
                      <div className="max-w-6xl mx-auto w-full p-4">
                        <div className="mb-4">
                          <h3 className="font-bold text-lg ">Update Rate</h3>
                        </div>
                        <hr />
                        <div className="grid grid-cols-3 py-4">
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label className="">From</Label>
                            <p className="">{data.from}</p>
                          </div>

                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label className="">To</Label>
                            <p className="">{data.to}</p>
                          </div>

                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Rate</Label>
                            <Input
                              type="text"
                              id="rate"
                              placeholder="Rate"
                              value={data.rate}
                            />
                          </div>
                        </div>
                        <DrawerFooter className="sm:flex-row justify-end">
                          <DrawerClose>
                            <Button className="w-full" variant="outline">
                              Cancel
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
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

export default CurrencyTable;
