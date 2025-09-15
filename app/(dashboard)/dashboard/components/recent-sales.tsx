import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function RecentSales() {
  // const { data: session } = useSession();
  const [orders, setOrders] = useState<any | null>();
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {

  //   if (session) {
  //     let i = 0;
  //     setInterval(async () => {
  //       console.log(i++);
  //       const response = await fetch(`/api/order`);
  //       const userorders = await response.json();
  //       const latest = userorders.reverse().slice(0, 5);
  //       setOrders(latest);

  //       console.log(userorders);
  //       setIsLoading(false);
  //     }, 5000);
  //   }
  // }, [session]);
  return (
    <div className="space-y-8">
      {orders &&
        orders.map((order: any) => (
          <div className="flex items-center">
            <Avatar className="h-9 w-9 uppercase font-semibold text-gray-500 text-sm">
              {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
              <AvatarFallback>{order.userEmail[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {order.userEmail.split("@")[0]}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.fromCurrency + "|" + order.toCurrency}
              </p>
            </div>
            <div className="ml-auto font-medium">
              {order.toSymbol + "" + order.toAmount}
            </div>
          </div>
        ))}

      {/*  */}
    </div>
  );
}
