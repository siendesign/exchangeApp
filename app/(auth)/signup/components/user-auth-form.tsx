"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { addnewUser } from "@/lib/action";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
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


  const handleSubmit = (e: any) => {
    setIsLoading(true);

    const { email, password, confirmPassword } = Object.fromEntries(e);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    if (!email || !password || !confirmPassword)
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request. All credentials must be provided!",
      });
    if (password !== confirmPassword)
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Pasword fields don't match",
      });

    console.log({ email, password, confirmPassword });

    addnewUser(e);
  };

  // console.log(info);
  // info.password === info.confirmPassword
  //   ? console.log("valid")
  //   : console.log("invalid");

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={handleSubmit}>
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
              <div className="">Login</div>
            )}
          </Button>
        </div>
      </form>
      {error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
        //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
        //   <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
};

export default UserAuthForm;
