import React, {useRef} from 'react'
import { CopyIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

const Orderdialogue = () => {
    const walletAddress = useRef<any | null>(null);

    const handleCopyAddress = ()=>{
        const address  = walletAddress.current
        alert(`${address.value}`)

    }
    
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Share</Button> */}
        <Button className="w-full">place an order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <div className="flex justify-center">
            <div className="h-40 w-40 relative">
                <Image src={'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAM0AAADNAQAAAAAzx8nEAAABwUlEQVR4nO2XMa6DQAxEJ6Kg5Ah7k+RiSCBxMXKTPcKWFAj/GW8S8hOlNUVCsT/fj8Kyx94B9ulZ8ENfjwqAU+lhczdloFv5P4Z4NJhdbTJFk206FAtHPdpraazd0HuuicdRCDxsVI2ORDam+sveMoxC6lcZMhW7+psvrYxCVb2J1arHm7BDkD+KzmhsOXevYx6FprxAwlWUaMRy71ckKk3m/EABpFqjI5CtlCsV462SevGQTSSicFsJd7noJXRjwhnxiP1qtWC12aQd7EMUiYo0yygVsyq5/in5SNQnv2mk3ux180kKR43Z5inx4HJpnjxALFI0895lZFbTjkAS7pliqbLhvk20BAcgy9A20VJLuDz2SjSaVKO1rlV5o102ocjMbxp1ictF3ugx5pGI1rBOMIfIB3rZCxWHmJLveb94rMqmxCO6wrpITvKHfCnt/QpE8mTyh+3mHgBukIZwdHNE0HrLHsWTesPQ3R9ykmiZfbPNRyBNcJEj0hgrw1qyaHT7duBSkynRx8z2uHyDkbSjz1sKaE3/M4xEN/VmaVcfEEM88n5RsyqUC3e/lyMR6iLhnybXy3fr4tGH54e+Hf0BMRb05eDsSloAAAAASUVORK5CYII='} fill alt='qr'/>
            </div>
          </div>
          <div className="">
            ughp9uigd
          </div>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              ref={walletAddress}
              id="link"
              defaultValue="mmdFAhC81X5YkwvqNdRy8Gmwd588vYwc4n"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleCopyAddress}>
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className='my-3'>
            <div className="flex items-center space-x-2 justify-center">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept <Link href={"/"} className='underline'>terms and conditions</Link> </Label>
            </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button asChild>
            <Link href={'/exchange/orders'}>Continue</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Orderdialogue