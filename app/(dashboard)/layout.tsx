"use client";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: loadingAuth } = useGetAuthUserQuery();

  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  if (loadingAuth) return; // Still checking auth, wait

  if (!authUser) {
    // No authenticated user - redirect to login
    router.push("/login");
    setIsLoading(false);
    return;
  }

  // User is authenticated
  const userRole = authUser.user?.role?.toLowerCase();
  console.log(userRole);

  // Define target paths for each role
  const targetPath = userRole === "admin" ? "/dashboard" : "/exchange";
  const currentPrefix = userRole === "admin" ? "/dashboard" : "/exchange";

  // Redirect if user is not on their correct path
  if (!pathname.startsWith(currentPrefix)) {
    router.push(targetPath, { scroll: false });
  } else {
    // User is on correct path
    setIsLoading(false);
  }
}, [authUser, loadingAuth, router, pathname]);

  if (loadingAuth || isLoading) {
    return (
      <div className={"w-full h-96 flex justify-center items-end "}>
        <div className="flex gap-3 items-center">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default DashboardLayout;
