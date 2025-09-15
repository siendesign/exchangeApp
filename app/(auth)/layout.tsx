"use client";
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
    const {data:authUser, isLoading:loadingAuth} = useGetAuthUserQuery();

    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        console.log(authUser);
        
        if(authUser){
            const userRole = authUser.userRole?.toLowerCase();
            if (userRole==="user"){
                router.push('/exchange'),{scroll:false}
            }
        }
    },[authUser, router, pathname])

    if (loadingAuth) {
        return (
        <div className={"w-full h-96 flex justify-center items-end "}>
            <div className="flex gap-3 items-center">
            <div className="loader"></div>
            </div>
        </div>
        );
    }

  return (
    <>
     {children} 
    </>
  )
}

export default AuthLayout
