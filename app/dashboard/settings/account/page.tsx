"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MdOutlineDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { IoIosWallet } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const accounts = [
  {
    cryptoCurrencyName: "USDT",
    cryptoCurrencySymbol: "USDT",
    cryptoCurrencyAddress: "0x0000000000000000000000000000000000000000",
    tranferNetwork: "bnb",
  },
  {
    cryptoCurrencyName: "Bitcoin",
    cryptoCurrencySymbol: "BTC",
    cryptoCurrencyAddress: "0x00000000000000000000000000000000000000007",
    tranferNetwork: "BTC",
  },
  {
    cryptoCurrencyName: "Ethereum",
    cryptoCurrencySymbol: "ETH",
    cryptoCurrencyAddress: "0x0000000000000000000000000000000000000000",
    tranferNetwork: "ETH",
  },
];

const page = () => {
  const { toast } = useToast();

  const [dialogOpened, setDialogOpened] = useState(false);
  const [nowallets, setNowallets] = useState(false);
  const [cryptoCurrencyName, setCryptoCurrencyName] = useState<
    string | undefined
  >();
  const [cryptoCurrencySymbol, setCryptoCurrencySymbol] = useState<
    string | undefined
  >();
  const [cryptoCurrencyAddress, setCryptoCurrencyAddress] = useState<
    string | undefined
  >();
  const [tranferNetwork, setTranferNetwork] = useState<string | undefined>();
  const [wallets, setWalltes] = useState<any[] | undefined>();

  const fetchWallets = async () => {
    const request = await fetch(`/api/wallet`);
    const response = await request.json();
    console.log(response);
    if (response.length > 0) {
      setWalltes(response);
    } else {
      setNowallets(true);
    }
  };

  const handleAddNewWallet = async () => {
    const data = {
      cryptoCurrencyName: cryptoCurrencyName,
      cryptoCurrencySymbol: cryptoCurrencySymbol,
      cryptoCurrencyAddress: cryptoCurrencyAddress,
      tranferNetwork: tranferNetwork,
    };

    if (
      cryptoCurrencyName === undefined ||
      cryptoCurrencySymbol === undefined ||
      cryptoCurrencyAddress === undefined ||
      tranferNetwork === undefined
    ) {
      return toast({
        variant: "destructive",
        description: "Invalid input.",
      });
    }

    const request = await fetch(`/api/wallet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await request.json();

    console.log(response);

    setDialogOpened(!dialogOpened);
    setCryptoCurrencyName(undefined);
    setCryptoCurrencySymbol(undefined);
    setCryptoCurrencyAddress(undefined);
    setTranferNetwork(undefined);
    fetchWallets();
    return toast({
      title: "success",
      description: "Wallet was successfully added.",
    });
  };

  const handleDeleteWallet = async (id: any) => {
    console.log(id, " deleted");
    const request = await fetch(`/api/wallet/delete/${id}`, {
      method: "DELETE",
    });
    const response = await request.json();
    console.log(response);
    fetchWallets();
    toast({
      description: "Wallet deleted successfully.",
    });
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <>
      <Dialog open={dialogOpened}>
        {/* <DialogTrigger asChild>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New wallet account</DialogTitle>
            <DialogDescription>
              Add new crypto wallets here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4  py-4">
            <div className="flex  items-center justify-start gap-4">
              <div className="flex flex-col items-start gap-4 w-full">
                <Label htmlFor="from" className="text-right">
                  Crypto currency name
                </Label>
                <Input
                  className="w-full"
                  placeholder="e.g: Bitcoin"
                  value={cryptoCurrencyName}
                  onChange={(e) => setCryptoCurrencyName(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="flex  items-center justify-start gap-4">
              <div className="flex flex-col items-start gap-4 w-full">
                <Label htmlFor="from" className="text-right">
                  Crypto currency symbol
                </Label>
                <Input
                  className="w-full"
                  placeholder="e.g: BTC"
                  value={cryptoCurrencySymbol}
                  onChange={(e) =>
                    setCryptoCurrencySymbol(e.currentTarget.value)
                  }
                />
              </div>
            </div>
            <div className="flex  items-center justify-start gap-4">
              <div className="flex flex-col items-start gap-4 w-full">
                <Label htmlFor="from" className="text-right">
                  Wallet address
                </Label>
                <Input
                  className="w-full"
                  placeholder="e.g:0x00000000000000000000000000000000000000007r"
                  value={cryptoCurrencyAddress}
                  onChange={(e) =>
                    setCryptoCurrencyAddress(e.currentTarget.value)
                  }
                />
              </div>
            </div>
            <div className="flex  items-center justify-start gap-4">
              <div className="flex flex-col items-start gap-4 w-full">
                <Label htmlFor="from" className="text-right">
                  Transfer network
                </Label>
                <Input
                  className="w-full"
                  placeholder="Enter transfer network"
                  value={tranferNetwork}
                  onChange={(e) => setTranferNetwork(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex ">
            <div className="w-full flex justify-between">
              <Button
                variant={"ghost"}
                type="submit"
                onClick={() => setDialogOpened(!dialogOpened)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={() => handleAddNewWallet()}>
                Add
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="">
            <h3 className="text-lg font-medium">Account</h3>
            <p className="text-sm text-muted-foreground">
              This is how you will edit and add crypto account data.
            </p>
          </div>
          <Button
            className="flex gap-1"
            onClick={() => setDialogOpened(!dialogOpened)}
          >
            {" "}
            <IoIosWallet /> Add
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          {wallets ? (
            wallets?.map((account) => (
              <div
                key={account._id}
                className="p-4 border rounded-md flex justify-between items-center gap-2"
              >
                <div className="flex-grow truncate">
                  <p className="font-medium">{account.cryptoCurrencyName}</p>
                  <p className="text-sm text-gray-500 ">
                    {account.cryptoCurrencyAddress}
                  </p>
                  <p className="text-xs text-gray-500">
                    {account.tranferNetwork}
                  </p>
                </div>

                <div className="">
                  {/* <Button
                    variant={"ghost"}
                    onClick={() => handleDeleteWallet(account._id)}
                  >
                    <MdOutlineDelete className="w-5 h-5 text-red-600" />
                  </Button> */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={"ghost"}>
                        <MdOutlineDelete className="w-5 h-5 text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This data will be
                          removed permanently from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 text-white px-3 rounded-md"
                          onClick={() => handleDeleteWallet(account._id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : nowallets == false ? (
            <div className="text-center text-gray-400">fetching wallets...</div>
          ) : (
            <div className="text-center text-gray-400">No wallets, add a wallet</div>
          )}
          
        </div>
      </div>
    </>
  );
};

export default page;
