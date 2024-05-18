"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import {
  MonitorPause,
  RefreshCw,
  UserRound,
  UserRoundCheck,
  UserRoundCog,
  UserRoundMinus,
  UserRoundX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { request } from "http";

const people = [
  {
    name: "John Doe",
    title: "Front-end Developer",
    department: "Engineering",
    email: "john@devui.com",
    role: "user",
    // image:
    //   'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
  },
  {
    name: "Jane Doe",
    title: "Back-end Developer",
    department: "Engineering",
    email: "jane@devui.com",
    role: "admin",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];

const UserTable = () => {
  const [users, setUsers] = useState<any[] | undefined>();

  const handleGetUsers = async () => {
    try {
      const request = await fetch(`/api/user`);
      const response = await request.json();
      console.log(response);
      return setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all user. edit or delete existing ones.
            </p>
          </div>
          <div>
            <Button
              // variant={"ghost"}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black flex gap-2 group"
              onClick={() => handleGetUsers()}
            >
              <span className="group-hover:animate-spin">
                <RefreshCw size={18} />
              </span>
              Refresh
            </Button>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>User</span>
                      </th>
                      {/* <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Title
                      </th> */}
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Status
                      </th>

                      <th scope="col" className="relative px-8 py-3.5 ">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users && users.map((person) => {
                      const name = person.email.split("@")[0];
                      return (
                        <tr key={person._id}>
                          <td className="whitespace-nowrap px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <Avatar>
                                  {/* <AvatarImage
                                  src="https://github.com/shadcn.png"
                                  alt="@shadcn"
                                /> */}
                                  <AvatarFallback>
                                    <UserRound size={24} />
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {name}
                                </div>
                                <div className="text-sm text-gray-700">
                                  {person.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm text-gray-900 ">
                            {person.title}
                          </div>
                          <div className="text-sm text-gray-700">
                            {person.department}
                          </div>
                        </td> */}
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {person.role}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4">
                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                              Active
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Ellipsis />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Separator />
                                <DropdownMenuItem className="flex gap-2">
                                  <UserRoundCheck size={16} />
                                  <div className="">Activate</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex gap-2">
                                  <UserRoundMinus size={16} />
                                  <div className="">Suspend</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex gap-2">
                                  <UserRoundX size={16} />
                                  <div className="">Delete</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex gap-2">
                                  <UserRoundCog size={16} />
                                  <div className="">Admin</div>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-center pt-6">
        <a href="#" className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900">
          <span className="hidden lg:block">&larr; Previous</span>
          <span className="block lg:hidden">&larr;</span>
        </a>
        <a
          href="#"
          className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
        >
          1
        </a>
        <a
          href="#"
          className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
        >
          2
        </a>
        <a
          href="#"
          className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
        >
          3
        </a>
        <a
          href="#"
          className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
        >
          4
        </a>
        <a href="#" className="mx-2 text-sm font-semibold text-gray-900">
          <span className="hidden lg:block">Next &rarr;</span>
          <span className="block lg:hidden">&rarr;</span>
        </a>
      </div> */}
      </section>
    </>
  );
};

export default UserTable;
