"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useSession } from "next-auth/react";



const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    currency: "USDEUR",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    currency: "USDEUR",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    currency: "USDEUR",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    currency: "USDEUR",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    currency: "USDEUR",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    currency: "USDEUR",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    currency: "USDEUR",
    paymentMethod: "Credit Card",
  },
]
const page =  () => {
  const { data: session } = useSession();

  const [orders, setOrders] = useState<any | null>()
  
  useEffect(() => {
    console.log(session?.user?.email!);
    
    if (session) {
      
      let i = 0
      setInterval(async()=>{
        console.log(i++);
        // const response = await fetch(`/api/order/itoro@gmail.com`)
        const response = await fetch(`/api/order/${session?.user?.email!}`)
        const userorders = await response.json()
        setOrders(userorders)
  
        console.log(userorders);
        
      },5000)
    }
  }, [session])
  
  return (
    <div>
      <Table>
      <TableCaption>A list of your recent orders.{session?.user?.email!}</TableCaption>
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
        {orders && orders?.map((order:any) => (
          <TableRow key={order._id}>
            <TableCell className="font-medium">{order._id}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.destinationAccountName}</TableCell>
            <TableCell>{order.toAmount!}</TableCell>
            <TableCell className="text-right"></TableCell>
            <TableCell className="text-right">
            <Drawer>
              <DrawerTrigger>view</DrawerTrigger>
              <DrawerContent className=''>

                <div className="max-w-6xl mx-auto">
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
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
  )
}

export default page
