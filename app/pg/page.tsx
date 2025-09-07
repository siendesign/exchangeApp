"use client"
import { Button } from '@/components/ui/button'
import { sendMailTestAction } from '@/lib/action'
import { createClient } from '@/lib/supabase/client'
import { useGetAuthUserQuery } from '@/state/api'
import React, { useEffect, useState } from 'react'

const page = () => {

  return (
    <div className='w-full h-screen' >
      <div className="max-w-lg mx-auto p-5 space-y-3">
        <h1 className="text-xl text-gray-600">Playground</h1>
        <hr />
        <TestMailSender></TestMailSender>
        {/* <hr /> */}
        {/* <SupabaseComponent/> */}
        <hr />
        <ReduxComponent/>
      </div>
    </div>
  )
}

const ReduxComponent = () =>{

  const {data, isLoading} = useGetAuthUserQuery();

  
  if(isLoading) return (
    <div className="">loading...</div>
  )
  
  console.log(data);
  return(
    <div className="">
      <h2 className="">Redux Data</h2>
      <pre>

      {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

const SupabaseComponent =  () =>{
 
  const supabase = createClient();
  const [data, setData] = useState<any>(null)
  const getsessesion=async () =>{
    const { data:userSession, error } =  await supabase.auth.getSession();
    console.log(userSession)
    setData(userSession);
  }

  useEffect(()=>{
    getsessesion()
  },[])

  if (!data) return <div className=''>No Session</div>

  return(
    <div className="w-full">
      <pre className='w-full'>{JSON.stringify(data, null, 1)}</pre>
    </div>
  )
}

const TestMailSender = () =>{

  const [isloading, setIsloading] = useState(false)

  const sendMail = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setIsloading(true)
    try {
      const send = await sendMailTestAction();
      console.log(send);

      if(send){ setIsloading(false);}
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Test send mail</h3>
      <p className="text-sm text-gray-500">Click to send test mail</p>
      <form  className="" onSubmit={(e)=>sendMail(e)}>
        <Button type='submit' disabled = {isloading}>{isloading? "Sending mail..." : "Test mail"}</Button>
      </form>
    </div>
  )
}

export default page
