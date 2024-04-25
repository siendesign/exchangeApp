"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

const profileFormSchema = z.object({
  notificationEmail: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
});

const passwordFormSchema = z.object({
  oldPassword: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  newPassword: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  confirmNewPassword: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  //   notificationEmail: "siens@gmail.com",
  //   bio: "I own a computer.",
  //   urls: [
  //     { value: "https://shadcn.com" },
  //     { value: "http://twitter.com/shadcn" },
  //   ],
};

export function ProfileForm() {
  const { data: session } = useSession();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    // defaultValues,
    mode: "onChange",
  });

  //   const { fields, append } = useFieldArray({
  //     name: "urls",
  //     control: form.control,
  //   });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  async function UpdatePassword(data: PasswordFormValues) {
    console.log(data);

    if (data.newPassword !== data.confirmNewPassword) {
      return toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "New passwords don't match",
      });
    }

    const request = await fetch(
      `/api/password/update/${session?.user?.email!}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const response = await request.json();

    console.log(response);
    if (response !== "success") {
      return toast({
        variant:"destructive",
        title: "Error",
        description: "Password confirmation failed",
      });
    }
    return toast({
      title: "success",
      description: "Password updated successfully",
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="notificationEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Email</FormLabel>
                <FormControl>
                  <Input placeholder="siens@gmail.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is the email to which all admin notifications will be
                  sent to.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save</Button>
        </form>
      </Form>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          This is how you will change the Administrative user password.{" "}
          {session?.user?.email!}
        </p>
      </div>
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(UpdatePassword)}
          className="space-y-8"
        >
          <FormField
            control={passwordForm.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter old password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Be sure to enter your old password in order to able to change
                  to a new password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter the new Password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password again"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the new password again to ensure to typed the intended
                  password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update password</Button>
        </form>
      </Form>
    </>
  );
}
