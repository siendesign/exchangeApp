"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { MainNav } from "../../components/main-nav";
import { UserNav } from "../../components/user-nav";

const page = ({ params }: { params: { orderID: string } }) => {
  const chatRef = useRef<any>(null);
  const { orderID } = params;
  const { data: session } = useSession();

  const [paymentImage, setPaymentImage] = useState<string | undefined>();
  const [message, setMessage] = useState<string | undefined>();
  const [from, setFrom] = useState<string | undefined>();
  const [to, setTo] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>("text");
  const [chats, setChats] = useState<any[] | undefined>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [sessionUser, setSessionUser] = useState<string | undefined>();
  const [scrollToLast, setScrollToLast] = useState<Boolean>(true);

  const handleScrollToLastElement = () => {
    if (scrollToLast) {
      chatRef.current?.lastElementChild?.scrollIntoView();
      setScrollToLast(false);
    }
  };

  const handleFetchOrder = async () => {
    try {
      const request = await fetch(`/api/order/single/${orderID}`);
      const singleOrder = await request.json();
      // console.log(singleOrder.valdationImagePath);
      setPaymentImage(singleOrder.valdationImagePath);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChat = async () => {
    try {
      const request = await fetch(`/api/order/chat/${orderID}`);
      const chat = await request.json();
      setChats(chat);
      // chatRef.current?.lastElementChild?.scrollIntoView();
      const lastChat = chat[chat.length - 1];
      console.log(lastChat.from, session?.user?.email);

      if (lastChat.from == session?.user?.email!) {
        console.log("first child");
      } else {
        console.log("last child");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendChat = async () => {
    try {
      const request = await fetch(`/api/order/chat/${orderID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderID,
          message: message,
          from: "admin",
          to: "user",
          type: type,
        }),
      });
      const response = await request.json();
      setMessage("");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("myImage", selectedFile!);
    formData.append("from", session?.user?.email!);
    formData.append("to", "admin");
    formData.append("type", type!);
    formData.append("id", orderID);

    if (selectedImage) {
      try {
        const { data } = await axios.post(
          `/api/order/chat/image/${orderID}`,
          formData
        );
        console.log("image uploaded");
        setSelectedImage(undefined);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(orderID);
  // console.log(session?.user?.email!);

  useEffect(() => {
    handleFetchOrder();
    if (session) {
      setInterval(async () => {
        fetchChat();
      }, 1000);
    }
  }, [session]);

  return (
    <div className="h-dvh  flex flex-col gap-1">
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
      {/* {orderID} */}
      <div className="flex-grow  max-w-7xl w-full mx-auto p-5 flex flex-col gap-1">
        <div className="mb-5 flex justify-between">
          <div className="">
            <h2 className="font-bold text-sm uppercase text-gray-500">
              Order {orderID}
            </h2>
            <div className="text-gray-400">
              Status: <span className="">{"processing..."}</span>{" "}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex-grow flex flex-col">
          <div className="flex-grow p-5 overflow-y-auto overflow-hidden max-h-[70dvh]">
            <div ref={chatRef} className="flex flex-col gap-3 no-scrollbar ">
              {paymentImage && (
                <div className="w-full flex justify-end">
                  <div className="relative w-72 h-80 rounded overflow-hidden">
                    <Image
                      src={paymentImage}
                      fill
                      alt=""
                      className="object-contain"
                      sizes=""
                    />
                  </div>
                </div>
              )}

              {chats &&
                chats.map((chat) =>
                  chat.type != "image" && chat.from == "admin" ? (
                    <div key={chat._id} className="w-full flex justify-end ">
                      <div className="relative  rounded overflow-hidden bg-slate-100 p-5">
                        {chat.message}
                      </div>
                    </div>
                  ) : chat.type == "image" &&
                    chat.from == "admin" ? (
                    <div className="w-full flex justify-end">
                      <div className="relative w-72 h-80 rounded overflow-hidden">
                        <Image
                          src={chat.message}
                          fill
                          alt=""
                          className="object-contain"
                          sizes=""
                        />
                      </div>
                    </div>
                  ) : chat.type == "image" ? (
                    <div className="w-full flex justify-start">
                      <div className="relative w-72 h-80 rounded overflow-hidden">
                        <Image
                          src={chat.message}
                          fill
                          alt=""
                          className="object-contain"
                          sizes=""
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      key={chat._id}
                      className="w-full flex justify-start text-white"
                    >
                      <div className="relative  rounded overflow-hidden bg-slate-600 p-5">
                        {chat.message}
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
          <div className="p-1">
            {selectedImage ? (
              // <img src={selectedImage} className="h-40 w-40" />
              <div className="text-sm text-gray-500 mb-1">Image selected</div>
            ) : (
              <div className="text-sm text-gray-500 mb-1">
                No image selected
              </div>
            )}
            <div className="messageBox">
              <div className="fileUploadWrapper">
                <label htmlFor="file">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 337 337"
                  >
                    <circle
                      strokeWidth="20"
                      stroke="#6c6c6c"
                      fill="none"
                      r="158.5"
                      cy="168.5"
                      cx="168.5"
                    ></circle>
                    <path
                      stroke-linecap="round"
                      strokeWidth="25"
                      stroke="#6c6c6c"
                      d="M167.759 79V259"
                    ></path>
                    <path
                      stroke-linecap="round"
                      strokeWidth="25"
                      stroke="#6c6c6c"
                      d="M79 167.138H259"
                    ></path>
                  </svg>
                  <span className="tooltip">Add an image</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={({ target }) => {
                    if (target.files) {
                      const file = target.files[0];
                      setSelectedImage(URL.createObjectURL(file));
                      setSelectedFile(file);
                      setType("image");
                    }
                  }}
                />
              </div>
              <input
                className="flex-grow"
                // required=""
                placeholder="Message..."
                type="text"
                id="messageInput"
                value={message}
                onChange={(e) => {
                  setMessage(e.currentTarget.value);
                  setType("text");
                  setSelectedImage("");
                  chatRef.current?.lastElementChild?.scrollIntoView();
                }}
              />
              {type != "image" ? (
                <Button variant={"ghost"} onClick={() => handleSendChat()}>
                  <LuSendHorizonal className="w-5 h-5" />
                </Button>
              ) : (
                <Button variant={"ghost"} onClick={() => handleUploadImage()}>
                  <LuSendHorizonal className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;


