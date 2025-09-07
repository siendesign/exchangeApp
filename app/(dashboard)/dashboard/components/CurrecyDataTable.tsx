import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import React, { useEffect, useState } from "react";
import { getAllcurrencies } from "@/lib/data";
import { addCurrency } from "@/lib/action";

const CurrecyDataTable = () => {
  const { toast } = useToast();

  const [loader, setLoader] = useState(true);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [allcurrencies, setAllcurrencies] = useState<any[] | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [abbrev, setAbbrev] = useState<string | undefined>();
  const [symbol, setSymbol] = useState<string | undefined>();

  const allCurrencies = async () => {
    const currencies = await getAllcurrencies();
    setAllcurrencies(currencies);
    setLoader(false);
    console.log(currencies);
    return currencies;
  };

  const handleAddNewCurrency = async (
    name: string | undefined,
    abbrev: string | undefined,
    symbol: any
  ) => {
    const formData = new FormData();

    if (name == undefined || abbrev == undefined || symbol == undefined) {
      return toast({
        variant: "destructive",
        description: "Invalid input.",
      });
    }

    formData.append("currencyName", name);
    formData.append("abbrev", abbrev);
    formData.append("symbol", symbol);

    const addcurrency = addCurrency(formData);

    addcurrency.then((response) => {
      console.log(response);

      if (response == false)
        return toast({
          variant: "destructive",
          description: "Currency already exists.",
        });

      setDialogOpened(!dialogOpened);
      allCurrencies();
      setName(undefined);
      setAbbrev(undefined);
      setSymbol(undefined);
      return toast({
        description: "Currency added successfully.",
      });
    });
  };
 
  const handleDeleteCurrency = async (id: any) => {
    console.log(id, " deleted");
    const request = await fetch(`/api/currencies/delete/${id}`, {
      method: "DELETE",
    });
    const response = await request.json();
    console.log(response);
    allCurrencies();
    toast({
      description: "Currency pair deleted successfully.",
    });
  };

  const handleUpdateCurrency = async (id: any) => {
    console.log(id, " updated");

    let data = { currencyName: name, abbrev: abbrev, symbol: symbol };
    const request = await fetch(`/api/currencies/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log(response);
    allCurrencies();
    toast({
      description: "Currency pair updated successfully.",
    });
    // setUpdatedRate(undefined);
  };

  useEffect(() => {
    allCurrencies();
  }, []);

  if (loader) {
    return (
      <div className={"w-full h-96 flex justify-center items-end "}>
        <div className="flex gap-3 items-center">
          <div className="loader"></div> Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-end pb-4">
        <Button onClick={() => setDialogOpened(!dialogOpened)}>New Pair</Button>
      </div>
      <Dialog open={dialogOpened}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Currency </DialogTitle>
            <DialogDescription>
              Add new currency here or create a currency. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4  py-4">
            <div className="flex  items-center justify-center gap-4">
              <div className="flex flex-col items-start gap-4 ">
                <Label htmlFor="from" className="text-right">
                  Name
                </Label>
                <Input
                  className="w-[200px]"
                  placeholder="e.g: US Dollar"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="flex  items-center justify-center gap-4">
              <div className="flex flex-col items-start gap-4 ">
                <Label htmlFor="from" className="text-right">
                  Currency
                </Label>
                <Input
                  className="w-[200px]"
                  placeholder="e.g: 🇺🇸 USD"
                  value={abbrev}
                  onChange={(e) => setAbbrev(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="flex  items-center justify-center gap-4">
              <div className="flex flex-col items-start gap-4 ">
                <Label htmlFor="from" className="text-right">
                  Symbol
                </Label>
                <Input
                  className="w-[200px]"
                  placeholder="e.g: $"
                  value={symbol}
                  onChange={(e) => setSymbol(e.currentTarget.value)}
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
              <Button
                type="submit"
                onClick={() => handleAddNewCurrency(name, abbrev, symbol)}
              >
                Add
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Table>
        {/* <TableCaption>
  A list of your recent orders.{session?.user?.email!}
</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Currency</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>symbol</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allcurrencies &&
            allcurrencies?.map((data: any) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium text-gray-500">
                  {data.abbrev}
                </TableCell>
                <TableCell className="font-medium text-gray-500">
                  {data.currencyName}
                </TableCell>

                <TableCell className="font-bold text-gray-400">
                  {data.symbol}
                </TableCell>

                <TableCell className="text-right">
                  <Drawer>
                    <DrawerTrigger>view</DrawerTrigger>
                    <DrawerContent className="">
                      <div className="max-w-6xl mx-auto w-full p-4">
                        <div className="mb-4">
                          <h3 className="font-bold text-lg ">Update Rate</h3>
                        </div>
                        <hr />
                        <div className="grid grid-cols-3 py-4 gap-5 mt-4">
                          <div className="grid w-full max-w-sm items-center gap-2">
                            <Label className="">Name</Label>
                            <Input
                              type="text"
                              placeholder={data.currencyName}
                              value={name}
                              onChange={(e) => setName(e.currentTarget.value)}
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Currency</Label>
                            <Input
                              type="text"
                              placeholder={data.abbrev}
                              value={abbrev}
                              onChange={(e) => setAbbrev(e.currentTarget.value)}
                            />
                          </div>
                          <div className="grid w-full max-w-sm items-center gap-2">
                            <Label className="">Symbol</Label>
                            <Input
                              type="text"
                              id="rate"
                              placeholder={data.symbol}
                              value={symbol}
                              onChange={(e) => setSymbol(e.currentTarget.value)}
                            />
                          </div>
                        </div>
                        <DrawerFooter className="sm:flex-row justify-end">
                          <DrawerClose>
                            <Button className="w-full" variant="outline">
                              Cancel
                            </Button>
                          </DrawerClose>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This data will
                                  be removed permanently from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-black text-white px-3 rounded-md"
                                  onClick={() => handleDeleteCurrency(data._id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Button
                            onClick={() => handleUpdateCurrency(data._id)}
                          >
                            Update
                          </Button>
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

export default CurrecyDataTable;
