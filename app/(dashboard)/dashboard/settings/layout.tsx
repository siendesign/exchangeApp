import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Sidenav } from "./Sidenav";
import { MainNav } from "../components/main-nav";
import { UserNav } from "../components/user-nav";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Account",
    href: "/dashboard/settings/account",
  },
//   {
//     title: "Appearance",
//     href: "/examples/forms/appearance",
//   },
//   {
//     title: "Notifications",
//     href: "/examples/forms/notifications",
//   },
//   {
//     title: "Display",
//     href: "/examples/forms/display",
//   },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="">
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
      </div>
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <Sidenav items={sidebarNavItems} />
            {/* <SidebarNav  /> */}
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
