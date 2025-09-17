"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { updateOrderStatus } from "@/lib/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import Link from "next/link";
import { useGetAuthUserQuery } from "@/state/api";

const page = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { toast } = useToast();

  const [orders, setOrders] = useState<any | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      // title: "Scheduled: Catch up ",
      description: "copied to clipboard",
    });
  }; 

  const handleUpdateStatus = async (id: any, value: string) => {
    const update = await updateOrderStatus(id, value);

    console.log(update);
  };

  const handleUpload = async (id: any) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("myImage", selectedFile!);
    formData.append("from", authUser?.user?.email!);
    formData.append("to", "admin");
    formData.append("type", "image");
    formData.append("id", id);
    try {
      if (!selectedFile) return;
      // const formData = new FormData();
      // formData.append("myImage", selectedFile!);
      // formData.append("id", id);
      const { data } = await axios.post(
        `/api/order/chat/image/${id}`,
        formData
      );
      console.log(data);
      // const response = await request.json();
      // console.log(response);

      handleUpdateStatus(id, "Receiving...");
    } catch (error: any) {
      console.log(error);
    }

    setUploading(false);
    setOpen(false);
    setOpenDrawer(false);
    setSelectedFile(undefined);
  };

  useEffect(() => {
    console.log(authUser?.user?.email!);

    if (authUser) {
      let i = 0;
      setInterval(async () => {
        console.log(i++);
        const response = await fetch(`/api/order/${authUser?.user?.email!}`);
        const userorders = await response.json();
        const latest = userorders.reverse();
        setOrders(latest);
        setIsLoading(false);
        // console.log(userorders);
      }, 5000);
    }
  }, [authUser]);

  if (isLoading) {
    return (
      <div className={"w-full h-96 flex justify-center items-end "}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recent orders.{authUser?.user?.email!}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            {/* <TableHead>Method</TableHead> */}
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders?.map((order: any) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium text-gray-500">
                  {order._id}
                </TableCell>
                {/* <TableCell>{order.destinationAccountName}</TableCell> */}
                <TableCell>{order.fromCurrency}</TableCell>
                <TableCell>{order.toCurrency}</TableCell>
                <TableCell className=" font-medium">
                  {order.toSymbol + " " + order.toAmount!}
                </TableCell>
                <TableCell
                  className={
                    order.status === "waiting..."
                      ? "text-yellow-600 text-right"
                      : order.status === "Receiving..."
                      ? "text-gray-400 text-right"
                      : order.status === "Received"
                      ? "text-blue-600 text-right"
                      : order.status === "Sending..."
                      ? "text-gray-400 text-right"
                      : order.status === "Sent"
                      ? "text-blue-700 text-right"
                      : order.status === "Completed"
                      ? "text-green-500 text-right"
                      : "text-right"
                  }
                >
                  {order.status}
                </TableCell>
                <TableCell className="text-right">
                  <Drawer>
                    <DrawerTrigger>view</DrawerTrigger>
                    <DrawerContent className="">
                      <div className="max-w-6xl mx-auto w-full ">
                        <div className="w-full p-7">
                          <div className="mb-5 flex justify-between">
                            <div className="">
                              <h2 className="font-bold text-sm uppercase text-gray-500">
                                Order {order._id}
                              </h2>
                              <div className="text-gray-400">
                                Status: <span className="">{order.status}</span>{" "}
                              </div>
                            </div>
                            {order.status !== "Completed" && (
                              <Link href={`/exchange/chat/${order._id}`}>
                                <Button variant={"ghost"}>
                                  <MdOutlineChatBubbleOutline className="h-5 w-5" />
                                </Button>
                              </Link>
                            )}
                          </div>
                          <hr />
                          <div className="flex flex-col sm:flex-row gap-5 py-4">
                            <div className="h-40 w-40 sm:h-76 sm:w-76  relative">
                              <Image
                                src={
                                  "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAM0AAADNAQAAAAAzx8nEAAABwUlEQVR4nO2XMa6DQAxEJ6Kg5Ah7k+RiSCBxMXKTPcKWFAj/GW8S8hOlNUVCsT/fj8Kyx94B9ulZ8ENfjwqAU+lhczdloFv5P4Z4NJhdbTJFk206FAtHPdpraazd0HuuicdRCDxsVI2ORDam+sveMoxC6lcZMhW7+psvrYxCVb2J1arHm7BDkD+KzmhsOXevYx6FprxAwlWUaMRy71ckKk3m/EABpFqjI5CtlCsV462SevGQTSSicFsJd7noJXRjwhnxiP1qtWC12aQd7EMUiYo0yygVsyq5/in5SNQnv2mk3ux180kKR43Z5inx4HJpnjxALFI0895lZFbTjkAS7pliqbLhvk20BAcgy9A20VJLuDz2SjSaVKO1rlV5o102ocjMbxp1ictF3ugx5pGI1rBOMIfIB3rZCxWHmJLveb94rMqmxCO6wrpITvKHfCnt/QpE8mTyh+3mHgBukIZwdHNE0HrLHsWTesPQ3R9ykmiZfbPNRyBNcJEj0hgrw1qyaHT7duBSkynRx8z2uHyDkbSjz1sKaE3/M4xEN/VmaVcfEEM88n5RsyqUC3e/lyMR6iLhnybXy3fr4tGH54e+Hf0BMRb05eDsSloAAAAASUVORK5CYII="
                                }
                                fill
                                alt="qr"
                              />
                            </div>
                            <div className="pt-4 flex flex-col gap-2 flex-grow ">
                              <div className="flex gap-1 items-center">
                                <div className="capitalize font-medium flex-grow  flex flex-col sm:flex-row  justify-between">
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
                              <div className="flex  gap-5 items-center ">
                                <div className="capitalize font-medium flex-grow  flex flex-col sm:flex-row justify-between">
                                  Destination Account Number :{" "}
                                  <span className="lowercase text-gray-500">
                                    {order.destinationAccountNumber}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium flex-grow  flex flex-col sm:flex-row justify-between">
                                  Destination Account Name :{" "}
                                  <span className=" text-gray-500">
                                    {order.destinationAccountName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium flex-grow  flex flex-col sm:flex-row justify-between">
                                  Destination Bank Name :{" "}
                                  <span className=" text-gray-500">
                                    {order.destinationBankName}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium flex-grow  flex justify-between">
                                  From :{" "}
                                  <span className=" text-gray-500">
                                    {order.fromCurrency}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium flex-grow  flex justify-between">
                                  to :{" "}
                                  <span className=" text-gray-500">
                                    {order.toCurrency}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium flex-grow  flex justify-between">
                                  Send:{" "}
                                  <span className=" text-gray-500">
                                    {order.fromSymbol + " " + order.fromAmount}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-5 items-center">
                                <div className="capitalize font-medium flex-grow  flex justify-between">
                                  Receive :{" "}
                                  <span className=" text-gray-500">
                                    {order.toSymbol + " " + order.toAmount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DrawerFooter className="sm:flex-row justify-end">
                          {order.status != "waiting..." ? (
                            <>
                              {order.status !== "Completed" && (
                                <Button
                                  onClick={() =>
                                    handleUpdateStatus(order._id, "Completed")
                                  }
                                  className="order-2"
                                >
                                  Complete
                                </Button>
                              )}
                            </>
                          ) : (
                            <>
                              {/* 
                              <Button
                                onClick={() =>
                                  handleUpdateStatus(order._id, "Receiving...")
                                }
                                className="order-2"
                              >
                                Payment made
                              </Button>
                              */}
                              <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger asChild>
                                  <Button className="order-2">
                                    Payment made
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Payment Validation
                                    </DialogTitle>
                                    <DialogDescription>
                                      Uplaod a screenshot of payment to validate
                                      payment status.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex flex-col gap-4  py-4">
                                    <div className="flex  items-center justify-start gap-4">
                                      <div className="flex flex-col items-start gap-4 w-full">
                                        <Label
                                          htmlFor="from"
                                          className="text-right"
                                        >
                                          Upload Screenshot
                                        </Label>
                                        <label
                                          className="custum-file-upload"
                                          htmlFor="file"
                                        >
                                          <div className="icon">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill=""
                                              viewBox="0 0 24 24"
                                            >
                                              <g
                                                stroke-width="0"
                                                id="SVGRepo_bgCarrier"
                                              ></g>
                                              <g
                                                stroke-linejoin="round"
                                                stroke-linecap="round"
                                                id="SVGRepo_tracerCarrier"
                                              ></g>
                                              <g id="SVGRepo_iconCarrier">
                                                <path
                                                  fill=""
                                                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                                  clip-rule="evenodd"
                                                  fill-rule="evenodd"
                                                ></path>
                                              </g>
                                            </svg>
                                          </div>
                                          <div className="text">
                                            <span>Click to upload image</span>
                                          </div>
                                          <input
                                            type="file"
                                            id="file"
                                            onChange={({ target }) => {
                                              if (target.files) {
                                                const file = target.files[0];
                                                setSelectedImage(
                                                  URL.createObjectURL(file)
                                                );
                                                setSelectedFile(file);
                                              }
                                            }}
                                          />
                                        </label>
                                        {selectedImage ? (
                                          <img
                                            src={selectedImage}
                                            className=""
                                          />
                                        ) : (
                                          <div className="">select image</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      disabled={uploading}
                                      style={{
                                        opacity: uploading ? ".5" : "1",
                                      }}
                                      type="submit"
                                      onClick={() => handleUpload(order._id)}
                                    >
                                      {uploading ? "Uploading..." : "Validate"}
                                      {/* Validate */}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </>
                          )}

                          {/* <Button
                            onClick={()=>handleUpdateStatus(order._id, "Receiving...")}
                            className="order-2"
                          >
                            Payment made
                          </Button> */}
                          <DrawerClose>
                            <Button className="w-full" variant="outline">
                              Cancel
                            </Button>
                          </DrawerClose>
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
