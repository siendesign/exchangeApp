"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CurrecyDataTable from "./components/CurrecyDataTable";
import CurrencyTable from "./components/CurrencyTable";
import OrderTable from "./components/OrderTable";
import { MainNav } from "./components/main-nav";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";
import { UserNav } from "./components/user-nav";
import UserTable from "./components/UserTable";

const page = () => {
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState<string | undefined>("");
  const [userNumber, setUserNumber] = useState<number>(0);
  const [userPercentage, setUserPercentage] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalOrdersPercentage, setTotalOrdersPercentage] = useState<number>(0);
  const [activeOrders, setActiveOrders] = useState<number>(0);
  const [activeOrdersPercentage, setActiveOrdersPercentage] =
    useState<number>(0);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    localStorage.setItem("currentTab", value);
  };

  const fetchAnalyticData = async () => {
    const request = await fetch("api/analytics");
    const data = await request.json();
    setUserNumber(data.userNumber);
    setUserPercentage(data.userNumberPercentage);
    setTotalOrders(data.totalOrders);
    setActiveOrders(data.activeOrders);
  };

  useEffect(() => {
    let tab = localStorage.getItem("currentTab") || "overview";
    setCurrentTab(tab);
    fetchAnalyticData();
  }, []);

  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="md:flex items-center space-x-2 hidden">
              {/* <CalendarDateRangePicker className=""/>
              <Button>Download</Button> */}
            </div>
          </div>
          <Tabs
            value={currentTab}
            onValueChange={handleTabChange}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
              <TabsTrigger value="currency">Currency</TabsTrigger>
              <TabsTrigger value="Users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Order Volume
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{userNumber}</div>
                    <p className="text-xs text-muted-foreground">
                      {userPercentage}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Orders
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      {totalOrdersPercentage}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Orders
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      {activeOrdersPercentage}% of orders
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      You have {totalOrders} orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
              <div className="">
                <OrderTable />
              </div>
            </TabsContent>
            <TabsContent value="rates" className="space-y-4">
              <div className="">
                <div className="w-full flex justify-end py-4"></div>
                <CurrencyTable />
              </div>
            </TabsContent>
            <TabsContent value="currency" className="space-y-4">
              <CurrecyDataTable />
            </TabsContent>
            <TabsContent value="Users" className="space-y-4">
              {/* <AdminSetting/> */}
              <UserTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default page;
