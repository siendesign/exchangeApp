"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LoginAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginAuthForm = ({ className, ...props }: LoginAuthFormProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [credntials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // if (session) router.push("/exchange");

  function handleInput(e: any) {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: any) {
    setIsLoading(true);

    const { email, password } = Object.fromEntries(e);

    console.log(email, password);

    if (!email || !password) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request. All credentials must be provided!",
      });
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      // console.log(res);

      if (res?.error) {
        setIsLoading(false);
        return toast({
          variant: "destructive",
          title: "Uh oh! Invalid Credentials.",
          description:
            "There was a problem with your request. All credentials must be provided!",
        });
      }
      setIsLoading(true);
      // redirect("/exchange");
      router.push("/exchange");
    } catch (error) {
      console.log(error);
    }
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={onSubmit}>
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
    </div>
  );
};

export default LoginAuthForm;
