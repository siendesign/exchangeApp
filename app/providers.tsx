'use client'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react'

const queryClient = new QueryClient();

export const QueryProvider = ({children}:PropsWithChildren) =>{
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}


export const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>
}