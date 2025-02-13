"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>("");

  const [info, setInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { toast } = useToast();

  function handleInput(e: any) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSignUp = async (e: any) => {
    setIsLoading(true);
    const { email, password, confirmPassword } = Object.fromEntries(e);

    if (!email || !password || !confirmPassword) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request. All credentials must be provided!",
      });
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request. Pasword fields don't match",
      });
    }

    await fetch("api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        role:"user"
      }),
    })
      .then((response) => response!.json())
      .then((data) => {
        if ("error" in data) {
          setIsLoading(false);
          return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: data.error,
          });
        }
        setTimeout(() => {
          router.push("/login");
        }, 500);
      });
  };

  

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={handleSignUp}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="Password"
              autoCapitalize="none"
              autoComplete="confirmPassword"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <Input
            name="role"
            className="hidden"
            value={"user"}
            onChange={() => {}}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <div className="">Loading...</div>
            ) : (
              //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              <div className="">Sign up</div>
            )}
          </Button>
        </div>
      </form>
     
     
    </div>
  );
};

export default UserAuthForm;
