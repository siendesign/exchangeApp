"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addCurrencyConvertionRate } from "@/lib/action";
import { getAllcurrencies } from "@/lib/data";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const CurrencyTable = () => {
  const { toast } = useToast();

  const [loader, setLoader] = useState(true);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [data, setData] = useState<any[] | undefined>();
  const [allcurrencies, setAllcurrencies] = useState<any[] | undefined>();
  const [newFormValue, setNewFormValue] = useState<string>();
  const [newToValue, setNewToValue] = useState<string>();
  const [newRateValue, setNewRateValue] = useState<number | undefined>();
  const [updatedRate, setUpdatedRate] = useState<number | undefined>();

  const allCurrencies = async () => {

    const currencies = await getAllcurrencies();
    setAllcurrencies(currencies);
    // console.log(currencies);
    return currencies;
  };

  const handleChangeNewFromValue = (value: string) => {
    // console.log(value);
    setNewFormValue(value);
  };

  const handleChangeNewToValue = (value: string) => {
    // console.log(value);
    setNewToValue(value);
  };

  const handleFetchCurrencyPairs = async () => {
    const response = await fetch(`/api/currency-pairs`);
    const currencyPairs = await response.json();
    setData(currencyPairs.data);
    setLoader(false);
  };

  const handleAddNewCurrencyPairs = async (
    from: string,
    to: string,
    rate: any
  ) => {
    const formData = new FormData();
    formData.append("from", from);
    formData.append("to", to);
    formData.append("rate", rate);

    console.log(formData);

    const addRate = addCurrencyConvertionRate(formData);

    addRate.then((res) => {
      console.log(res);

      handleFetchCurrencyPairs();
      setDialogOpened(!dialogOpened);
      setNewFormValue("");
      setNewToValue("");
      setNewRateValue(undefined);

      if (res == false) {
        return toast({
          variant: "destructive",
          // title: "Uh oh! Something went wrong.",
          description: "Currency Pair already exists.",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      toast({
        description: "Currency pair added successfully.",
      });
    });
  };

  const handleDeletePair = async (id: any) => {
    console.log(id, " deleted");
    const request = await fetch(`/api/currency-pairs/delete/${id}`, {
      method: "DELETE",
    });
    const response = await request.json();
    console.log(response);
    handleFetchCurrencyPairs();
    toast({
      description: "Currency pair deleted successfully.",
    });
  };

  const handleUpdatePair = async (id: any) => {
    console.log(id, " updated");

    let data = {rate: updatedRate}
    const request = await fetch(`/api/currency-pairs/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const response = await request.json();
    console.log(response);
    handleFetchCurrencyPairs();
    toast({
      description: "Currency pair updated successfully.",
    });
    setUpdatedRate(undefined);
  };

  // console.log(data);

  useEffect(() => {
    handleFetchCurrencyPairs();
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
        {/* <DialogTrigger asChild>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Currency Pair</DialogTitle>
            <DialogDescription>
              Add new currency pairs here or create a currency. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                From
              </Label>
              <Select
                value={newFormValue}
                onValueChange={handleChangeNewFromValue}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currencies</SelectLabel>
                    {allcurrencies &&
                      allcurrencies.map((currency) => (
                        <SelectItem key={currency._id} value={currency.abbrev}>
                          {currency.abbrev}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                To
              </Label>
              <Select value={newToValue} onValueChange={handleChangeNewToValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currencies</SelectLabel>
                    {allcurrencies &&
                      allcurrencies.map((currency) => (
                        <SelectItem key={currency._id} value={currency.abbrev}>
                          {currency.abbrev}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Rate
              </Label>
              <Input
                className="w-[180px]"
                placeholder="0.00"
                type="number"
                value={newRateValue || ""}
                onChange={(e: any) => setNewRateValue(e.currentTarget.value)}
              />
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
                onClick={() =>
                  handleAddNewCurrencyPairs(
                    newFormValue!,
                    newToValue!,
                    newRateValue!
                  )
                }
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
                              placeholder={data.rate}
                              value={updatedRate}
                              onChange={(e:any)=>setUpdatedRate(e.currentTarget.value)}
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
                                  onClick={() => handleDeletePair(data._id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Button onClick={()=>handleUpdatePair(data._id)}>Update</Button>
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
