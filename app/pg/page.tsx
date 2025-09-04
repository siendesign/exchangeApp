"use client"
import { Button } from '@/components/ui/button'
import { sendMailTestAction } from '@/lib/action'
import React, { useState } from 'react'

const page = () => {
  return (
    <div className='w-full h-screen' >
      <div className="max-w-lg mx-auto p-5 space-y-3">
        <h1 className="text-xl text-gray-600">Playground</h1>
        <hr />
        <TestMailSender></TestMailSender>
      </div>
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
